package com.example.debaterly.controller;

import com.example.debaterly.model.Submission;
import com.example.debaterly.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    @Autowired
    private SubmissionRepository repository;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping
    public Submission create(@RequestBody Submission submission) {
        // Forward to Python Flask model
        String flaskUrl = "http://localhost:8000/evaluate";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Build request to Flask
        String jsonPayload = """
            {
              "arg": "%s",
              "topic": "%s"
            }
            """.formatted(submission.getArgument(), submission.getTopic());

        HttpEntity<String> request = new HttpEntity<>(jsonPayload, headers);

        ResponseEntity<FlaskResponse> response = restTemplate.postForEntity(flaskUrl, request, FlaskResponse.class);

        // Store score
        if (response.getStatusCode().is2xxSuccessful()) {
            submission.setAverageScore(response.getBody().getAverage_score());
        }

        return repository.save(submission);
    }

    @GetMapping
    public List<Submission> all() {
        return repository.findAll();
    }

    // Define FlaskResponse inner class or DTO
    private static class FlaskResponse {
        private double average_score;
        public double getAverage_score() { return average_score; }
        public void setAverage_score(double s) { this.average_score = s; }
    }
}
