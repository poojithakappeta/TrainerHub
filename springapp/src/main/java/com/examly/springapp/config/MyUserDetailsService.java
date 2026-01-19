package com.examly.springapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class MyUserDetailsService implements UserDetailsService {

    UserRepo userRepo;

    @Autowired
    public MyUserDetailsService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
public UserDetails loadUserByUsername(String email)
        throws UsernameNotFoundException {

    User user = userRepo.findByEmail(email);

    System.out.println("LOGIN EMAIL RECEIVED: " + email);
    System.out.println("USER FROM DB: " + user);

    if (user == null) {
        throw new UsernameNotFoundException("User not found");
    }

    return new UserPrinciple(user);
}


}
