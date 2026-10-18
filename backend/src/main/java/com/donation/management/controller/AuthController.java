package com.donation.management.controller;

import com.donation.management.entity.User;
import com.donation.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * MODULE 6.1 & 6.2: Spring Boot REST Controller for Authentication
 * 
 * 1. @RestController: Combines @Controller and @ResponseBody. All return values are automatically serialized into JSON.
 * 2. @RequestMapping: Maps base URI '/api/auth' to this controller.
 * 3. @CrossOrigin: Enables Cross-Origin Resource Sharing (CORS) with the React frontend running on port 5173.
 * 4. @Autowired: Dependency Injection (DI) - Spring injects UserRepository instance automatically.
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    // Spring Inversion of Control (IoC) injects the repository bean here
    @Autowired
    private UserRepository userRepository;

    /**
     * POST /api/auth/register
     * Handles user registration for DONOR or ADMIN roles.
     * Demonstrates @PostMapping and @RequestBody.
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // Validation: Check if email already exists in MySQL
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Email is already registered. Please login.");
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }

        // Default role to DONOR if not specified
        if (user.getRole() == null || user.getRole().trim().isEmpty()) {
            user.setRole("DONOR");
        }

        // Save new user in database via JPA
        User savedUser = userRepository.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    /**
     * POST /api/auth/login
     * Handles simple plain-text credential verification without complex security overhead.
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Email and password are required.");
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }

        // Find user by email
        Optional<User> userOptional = userRepository.findByEmail(email);

        // Check if user exists and password matches
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(password)) {
                return ResponseEntity.ok(user);
            }
        }

        Map<String, String> error = new HashMap<>();
        error.put("error", "Invalid email or password.");
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }
}
