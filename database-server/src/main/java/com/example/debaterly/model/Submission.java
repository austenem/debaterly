package com.example.debaterly.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String topic;

    @Lob
    private String scoresJson;

    @ElementCollection
    @CollectionTable(name = "submission_arguments", joinColumns = @JoinColumn(name = "submission_id"))
    @Column(name = "sentence", length = 1000)
    private List<String> argument = new ArrayList<>();

    private double averageScore;

    private LocalDateTime submittedAt = LocalDateTime.now();

    // Getters and setters

    public Long getId() {
        return id;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public List<String> getArgument() {
        return argument;
    }

    public void setArgument(List<String> argument) {
        this.argument = argument;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(double averageScore) {
        this.averageScore = averageScore;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public List<Integer> getScores() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(scoresJson, new TypeReference<List<Integer>>() {});
        } catch (IOException e) {
            return new ArrayList<>();
        }
    }

    public void setScores(List<Integer> scores) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            this.scoresJson = mapper.writeValueAsString(scores);
        } catch (JsonProcessingException e) {
            this.scoresJson = "[]";
        }
    }
}
