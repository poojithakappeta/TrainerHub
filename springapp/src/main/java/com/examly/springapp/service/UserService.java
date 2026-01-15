package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.User;

public interface UserService {
    User register(User user);

    String login(String email, String password);

    List<User> getAllUser();
    User getUserById(Long userId);
} 