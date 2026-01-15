package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.Trainer;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.TrainerRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    FeedbackRepo feedbackRepo;
    UserRepo userRepo;
    TrainerRepo trainerRepo;

    @Autowired
    public FeedbackServiceImpl(FeedbackRepo feedbackRepo, UserRepo userRepo, TrainerRepo trainerRepo) {
        this.feedbackRepo = feedbackRepo;
        this.userRepo = userRepo;
        this.trainerRepo = trainerRepo;
    }

    @Override
    public Feedback createFeedback(Long userID,Long trainerId,Feedback feedback) {
        Optional<Trainer> t = trainerRepo.findById(trainerId);
        Optional<User> u = userRepo.findById(userID);
        if (t.isEmpty() || u.isEmpty()) {
            return null;
        }
        User user = u.get();
        Trainer trainer = t.get();
        feedback.setTrainer(trainer);
        feedback.setUser(user);

        return feedbackRepo.save(feedback);

    }

    @Override
    public Feedback deleteFeedback(Long feedbackId) {
        Optional<Feedback> optfeedback = feedbackRepo.findById(feedbackId);
        if (optfeedback.isPresent()) {
            Feedback fb = optfeedback.get();
            feedbackRepo.deleteById(feedbackId);
            return fb;
        }
        return null;

    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepo.findAll();
    }

    @Override
    public Feedback getFeedbackById(Long feedbackId) {
        Optional<Feedback> optfeedback = feedbackRepo.findById(feedbackId);
        if (optfeedback.isPresent()) {
            return optfeedback.get();
        }
        return null;
    }

    @Override
    public List<Feedback> getFeedbacksByUserId(Long userId) {
        List<Feedback> feedbacks = feedbackRepo.findByUser_UserId(userId);
         return feedbacks;
    }

    @Override
    public List<Feedback> getFeedbacksByTrainerId(Long trainerId) {
        
        return feedbackRepo.findByTrainer_TrainerId(trainerId);
    }
    

}