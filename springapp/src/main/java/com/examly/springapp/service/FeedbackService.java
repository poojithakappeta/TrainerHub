package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Feedback;

public interface FeedbackService {
    Feedback createFeedback(Long userId,Long trainerId,Feedback feedback);

    Feedback getFeedbackById(Long feedbackId);

    List<Feedback> getAllFeedbacks();

    Feedback deleteFeedback(Long feedbackId);

    List<Feedback> getFeedbacksByUserId(Long userId);

    List<Feedback> getFeedbacksByTrainerId(Long trainerId);
}