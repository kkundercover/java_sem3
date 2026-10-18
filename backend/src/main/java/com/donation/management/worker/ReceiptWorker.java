package com.donation.management.worker;

/**
 * MODULE 2.3: Multithreading in Java
 * 
 * Demonstrates:
 * 1. Interface implementation: Implements java.lang.Runnable interface.
 * 2. Method Overriding: Implements public void run().
 * 3. Thread execution: When spawned via 'new Thread(worker).start()', this code executes
 *    concurrently in a separate background thread without blocking the HTTP request thread.
 * 4. Exception Handling: Catches InterruptedException thrown by Thread.sleep().
 */
public class ReceiptWorker implements Runnable {

    private final Long donationId;
    private final Double amount;
    private final String transactionId;

    // Parameterized constructor to receive transaction details
    public ReceiptWorker(Long donationId, Double amount, String transactionId) {
        this.donationId = donationId;
        this.amount = amount;
        this.transactionId = transactionId;
    }

    // The entry point for the concurrent thread
    @Override
    public void run() {
        String threadName = Thread.currentThread().getName();
        System.out.println("=================================================");
        System.out.println("[BACKGROUND THREAD STARTED: " + threadName + "]");
        System.out.println("Generating PDF Receipt for Transaction: " + transactionId);
        System.out.println("Donation ID: " + donationId + " | Amount: Rs. " + amount);
        System.out.println("=================================================");

        try {
            // Simulate 2 seconds of background computation / receipt PDF rendering
            Thread.sleep(2000);

            System.out.println("-------------------------------------------------");
            System.out.println("[BACKGROUND THREAD COMPLETED: " + threadName + "]");
            System.out.println("SUCCESS: Digital Receipt sent to donor for " + transactionId);
            System.out.println("-------------------------------------------------");
        } catch (InterruptedException e) {
            // Module 2.2: Exception handling inside multithreaded environment
            System.err.println("Thread interrupted while generating receipt: " + e.getMessage());
            Thread.currentThread().interrupt(); // Restore interrupted status
        }
    }
}
