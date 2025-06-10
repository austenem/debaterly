package com.example.debaterly.controller;

import com.example.debaterly.model.Submission;
import com.example.debaterly.repository.SubmissionRepository;
import com.example.debaterly.dto.DashboardStats;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;
import java.time.LocalDateTime;


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

    @GetMapping("/dashboard")
    public DashboardStats getDashboardStats() {
        List<Submission> submissions = repository.findAll();
        DashboardStats stats = new DashboardStats();

        // Average score
        double avg = submissions.stream()
                .mapToDouble(Submission::getAverageScore)
                .average()
                .orElse(0.0);
        stats.setAverageScore(avg);

        // Total submissions
        stats.setTotalSubmissions(submissions.size());

        // Top 5 topics by highest average score
        Map<String, Double> topicAverages = submissions.stream()
                .collect(Collectors.groupingBy(
                        Submission::getTopic,
                        Collectors.averagingDouble(Submission::getAverageScore)
                ));

        List<Map.Entry<String, Double>> topTopics = topicAverages.entrySet().stream()
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .limit(5)
                .collect(Collectors.toList());
        stats.setTopTopics(topTopics);

        // 5 Most recent submissions
        List<Submission> recent = submissions.stream()
                .sorted(Comparator.comparing(Submission::getSubmittedAt).reversed())
                .limit(5)
                .collect(Collectors.toList());
        stats.setRecentSubmissions(recent);

        // Submissions per day for the last 7 days
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(6);
        Map<String, Long> submissionsPerDay = submissions.stream()
                .filter(s -> s.getSubmittedAt().isAfter(sevenDaysAgo))
                .collect(Collectors.groupingBy(
                        s -> s.getSubmittedAt().toLocalDate().toString(),
                        Collectors.counting()
                ));

        // Fill in missing days with 0
        for (int i = 0; i < 7; i++) {
            String date = LocalDateTime.now().minusDays(i).toLocalDate().toString();
            submissionsPerDay.putIfAbsent(date, 0L);
        }

        stats.setSubmissionsPerDay(submissionsPerDay);

        return stats;
    }
}
