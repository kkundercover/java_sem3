package com.donation.management.exception;

/**
 * MODULE 2.2: Checked User Defined Exception Handling
 * 
 * Demonstrates:
 * 1. Extending java.lang.Exception to create a checked exception.
 * 2. Demonstrates the 'throw' keyword inside service/controller logic.
 * 3. Requires explicit 'throws' clause in method signatures.
 */
public class InvalidDonationException extends Exception {

    // Default Constructor
    public InvalidDonationException() {
        super("Invalid donation parameters provided.");
    }

    // Parameterized Constructor
    public InvalidDonationException(String message) {
        super(message);
    }
}
