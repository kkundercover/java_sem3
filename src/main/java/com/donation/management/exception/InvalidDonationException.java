package com.donation.management.exception;

/**
 * User-defined exception for invalid donation amounts or closed campaign states (Module 2.2 & Lab 3).
 * Demonstrates domain-specific runtime exception handling.
 */
public class InvalidDonationException extends RuntimeException {

    public InvalidDonationException(String message) {
        super(message);
    }
}
