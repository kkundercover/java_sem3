package com.donation.management.exception;

/**
 * MODULE 2.2: User Defined Exception Handling
 * 
 * Demonstrates:
 * 1. Creating a custom unchecked exception by extending RuntimeException.
 * 2. Invoking parent constructor using super(message).
 * 3. Used when a requested database entity (User or Campaign) is not found.
 */
public class ResourceNotFoundException extends RuntimeException {

    // Default Constructor
    public ResourceNotFoundException() {
        super("Requested resource was not found.");
    }

    // Parameterized Constructor accepting custom error message
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
