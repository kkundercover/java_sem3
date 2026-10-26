package com.donation.management.exception;

/**
 * User-defined exception for missing resources (Module 2.2 & Lab 3).
 * Demonstrates custom exception handling and inheritance from RuntimeException.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue));
    }
}
