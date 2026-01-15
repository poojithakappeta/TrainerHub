package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Feedback {
    @Id
    @GeneratedValue
    private Long feedbackId;
    private String feedbackText;
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name="userId",nullable=false)
    private User user; 
    @ManyToOne
    @JoinColumn(name="trainerId",nullable=true)
    private Trainer trainer;
    String category;
    public Feedback(){}
    public Feedback(Long feedbackId, String feedbackText, LocalDate date, User user, Trainer trainer, String category) {
        this.feedbackId = feedbackId;
        this.feedbackText = feedbackText;
        this.date = date;
        this.user = user;
        this.trainer = trainer;
        this.category = category;
    }
    public long getFeedbackId() {
        return feedbackId;
    }
    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
    }
    public String getFeedbackText() {
        return feedbackText;
    }
    public void setFeedbackText(String feedbackText) {
        this.feedbackText = feedbackText;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public Trainer getTrainer() {
        return trainer;
    }
    public void setTrainer(Trainer trainer) {
        this.trainer = trainer;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    
    
}
