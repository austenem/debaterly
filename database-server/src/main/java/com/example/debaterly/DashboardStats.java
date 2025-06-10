package com.example.debaterly.dto;

import com.example.debaterly.model.Submission;

import java.util.List;
import java.util.Map;

public class DashboardStats {
    private double averageScore;
    private long totalSubmissions;
    private List<Map.Entry<String, Double>> topTopics;
    private List<Submission> recentSubmissions;
    private Map<String, Long> submissionsPerDay;

    // Getters and setters

    public double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(double averageScore) {
        this.averageScore = averageScore;
    }

    public long getTotalSubmissions() {
        return totalSubmissions;
    }

    public void setTotalSubmissions(long totalSubmissions) {
        this.totalSubmissions = totalSubmissions;
    }

    public List<Map.Entry<String, Double>> getTopTopics() {
        return topTopics;
    }

    public void setTopTopics(List<Map.Entry<String, Double>> topTopics) {
        this.topTopics = topTopics;
    }

    public List<Submission> getRecentSubmissions() {
        return recentSubmissions;
    }

    public void setRecentSubmissions(List<Submission> recentSubmissions) {
        this.recentSubmissions = recentSubmissions;
    }

    public Map<String, Long> getSubmissionsPerDay() {
        return submissionsPerDay;
    }

    public void setSubmissionsPerDay(Map<String, Long> submissionsPerDay) {
        this.submissionsPerDay = submissionsPerDay;
    }
}
