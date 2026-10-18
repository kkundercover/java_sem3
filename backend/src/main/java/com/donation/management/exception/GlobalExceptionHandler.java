package com.donation.management.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.HashMap;
import java.util.Map;

/**
 * MODULE 2.2 & 6.2: Centralized Exception Handling in Spring Boot
 * 
 * 1. @RestControllerAdvice: Intercepts exceptions thrown by any @RestController across the application.
 * 2. @ExceptionHandler: Maps specific exception types to designated response methods.
 * 3. Ensures the client receives clean, structured JSON errors instead of raw stack traces.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handles custom ResourceNotFoundException (HTTP 404 NOT FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleResourceNotFound(ResourceNotFoundException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    // Handles custom InvalidDonationException (HTTP 400 BAD REQUEST)
    @ExceptionHandler(InvalidDonationException.class)
    public ResponseEntity<Map<String, String>> handleInvalidDonation(InvalidDonationException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // Handles general unexpected exceptions (HTTP 500 INTERNAL SERVER ERROR)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneralException(Exception ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "An unexpected error occurred: " + ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
