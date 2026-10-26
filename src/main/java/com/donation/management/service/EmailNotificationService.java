package com.donation.management.service;

import com.donation.management.model.Donation;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Service demonstrating Multithreading & Asynchronous Concurrency (Module 2.3 & Lab 4).
 * Executes email dispatch and receipt generation on a dedicated background worker thread
 * without blocking the main HTTP request/response thread.
 */
@Service
public class EmailNotificationService {

    /**
     * Simulates an asynchronous receipt dispatch worker using @Async.
     */
    @Async
    public void sendDonationReceiptAsync(Donation donation) {
        String threadName = Thread.currentThread().getName();
        System.out.println("======================================================================");
        System.out.println("[ASYNC WORKER THREAD: " + threadName + "] Starting receipt dispatch job...");
        System.out.println("[ASYNC WORKER] Processing receipt for Transaction: " + donation.getTransactionId());
        System.out.println("[ASYNC WORKER] Donor: " + donation.getDonor().getName() + " (" + donation.getDonor().getEmail() + ")");
        System.out.println("[ASYNC WORKER] Campaign: " + donation.getCampaign().getTitle());
        System.out.println("[ASYNC WORKER] Amount: $" + donation.getAmount());

        try {
            // Simulate external SMTP network latency or PDF generation time
            Thread.sleep(1200);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.err.println("[ASYNC WORKER] Dispatch interrupted: " + e.getMessage());
            return;
        }

        System.out.println("[ASYNC WORKER THREAD: " + threadName + "] SUCCESS: E-receipt & tax certificate dispatched to "
                + donation.getDonor().getEmail());
        System.out.println("======================================================================");
    }

    /**
     * Alternative Multithreading method explicitly using java.lang.Runnable (Module 2.3 & Lab 4).
     */
    public void dispatchViaCustomRunnable(Donation donation) {
        Runnable receiptTask = () -> {
            String currentThread = Thread.currentThread().getName();
            System.out.println("[RUNNABLE THREAD: " + currentThread + "] Background audit log written for: "
                    + donation.getTransactionId());
        };

        Thread worker = new Thread(receiptTask, "DonationReceiptWorker-" + donation.getId());
        worker.start();
    }
}
