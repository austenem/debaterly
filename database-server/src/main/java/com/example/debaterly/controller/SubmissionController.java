package com.example.debaterly.controller;

import com.example.debaterly.model.Submission;
import com.example.debaterly.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "http://localhost:3000")
public class SubmissionController {

    @Autowired
    private SubmissionRepository repository;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping
    public Submission create(@RequestBody Submission submission) {
        System.out.println("\nargument  " + submission.getArgument());
        System.out.println("\ntopic  " + submission.getTopic());

        if (submission.getArgument() == null || submission.getTopic() == null) {
            throw new IllegalArgumentException("Argument and topic are required fields.");
        }

        submission.getArgument().replaceAll(s -> s.trim().replace("\n", " "));

        String flaskUrl = "http://localhost:8000/evaluate";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> payload = Map.of(
                "arg", submission.getArgument(),
                "topic", submission.getTopic()
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        ResponseEntity<FlaskResponse> response = restTemplate.postForEntity(flaskUrl, request, FlaskResponse.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            FlaskResponse body = response.getBody();
            submission.setAverageScore(body.getAverage_score());
            submission.setScores(body.getScores());
        }

        return repository.save(submission);
    }

    @GetMapping
    public List<Submission> all() {
        return repository.findAll();
    }

    private static class FlaskResponse {
        private double average_score;
        private List<Integer> scores;

        public double getAverage_score() { return average_score; }
        public void setAverage_score(double s) { this.average_score = s; }

        public List<Integer> getScores() { return scores; }
        public void setScores(List<Integer> scores) { this.scores = scores; }
    }
}
