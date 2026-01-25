package com.examly.springapp.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.service.OtpService;

@RestController
@RequestMapping("/api/otp")
public class OtpController {
   
    private OtpService otpService;
 
    @Autowired
    public OtpController(OtpService otpService) {
        this.otpService = otpService;
    }
 
 
   @PostMapping("/send")
public ResponseEntity<Map<String, String>> sendOtp(
        @RequestBody Map<String, String> request) {

    String email = request.get("email");

    Map<String, String> response = otpService.sendOtp(email);
    response.put("message", "OTP sent successfully");

    return ResponseEntity.ok(response);
}

 
 
    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        boolean isValid = otpService.verifyOtp(request.get("email"), request.get("otp"));
        return isValid ? ResponseEntity.ok("Verified") : ResponseEntity.status(400).body("Invalid OTP");
    }
}
