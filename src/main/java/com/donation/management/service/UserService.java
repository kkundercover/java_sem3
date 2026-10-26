package com.donation.management.service;

import com.donation.management.dto.AuthResponse;
import com.donation.management.dto.LoginRequest;
import com.donation.management.dto.RegisterRequest;
import com.donation.management.exception.InvalidDonationException;
import com.donation.management.exception.ResourceNotFoundException;
import com.donation.management.model.User;
import com.donation.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service managing user registration and authentication logic (Module 6.1 & 6.2).
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse register(RegisterRequest request) {
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new InvalidDonationException("Email address cannot be empty.");
        }
        if (request.getPassword() == null || request.getPassword().length() < 4) {
            throw new InvalidDonationException("Password must be at least 4 characters long.");
        }
        if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
            throw new InvalidDonationException("An account with this email already exists: " + request.getEmail());
        }

        String role = (request.getRole() != null && request.getRole().equalsIgnoreCase("ADMIN"))
                ? "ADMIN" : "DONOR";

        User user = new User(
                request.getName() != null ? request.getName().trim() : "Anonymous",
                request.getEmail().trim().toLowerCase(),
                request.getPassword(),
                role
        );

        User savedUser = userRepository.save(user);
        return new AuthResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole(),
                "User registered successfully!"
        );
    }

    public AuthResponse login(LoginRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            throw new InvalidDonationException("Email and password are required.");
        }

        Optional<User> userOpt = userRepository.findByEmail(request.getEmail().trim().toLowerCase());
        if (userOpt.isEmpty()) {
            throw new ResourceNotFoundException("No user found with email: " + request.getEmail());
        }

        User user = userOpt.get();
        if (!user.getPassword().equals(request.getPassword())) {
            throw new InvalidDonationException("Invalid credentials. Please verify your password.");
        }

        return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                "Login successful!"
        );
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }
}
