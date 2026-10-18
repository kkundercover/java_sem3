package com.donation.management.controller;

import com.donation.management.entity.Campaign;
import com.donation.management.entity.Donation;
import com.donation.management.exception.InvalidDonationException;
import com.donation.management.exception.ResourceNotFoundException;
import com.donation.management.repository.CampaignRepository;
import com.donation.management.repository.DonationRepository;
import com.donation.management.worker.ReceiptWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

/**
 * MODULE 2.2, 2.3 & 6.2: Donation Controller
 * 
 * Demonstrates:
 * 1. RESTful API endpoints (@PostMapping, @GetMapping, @PathVariable, @RequestBody).
 * 2. Exception Handling (Module 2.2): Uses 'throw' to raise InvalidDonationException and
 *    declares 'throws InvalidDonationException' in the method signature.
 * 3. Multithreading (Module 2.3): Spawns a background Thread using ReceiptWorker (Runnable)
 *    to handle receipt generation without stalling the HTTP response.
 */
@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "http://localhost:5173")
public class DonationController {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    /**
     * POST /api/donations
     * Processes a new donation, updates campaign funds, saves the record,
     * and asynchronously triggers the background receipt worker thread.
     */
    @PostMapping
    public ResponseEntity<Donation> processDonation(@RequestBody Donation donation) throws InvalidDonationException {

        // MODULE 2.2: Input validation and 'throw' custom checked exception
        if (donation.getAmount() == null || donation.getAmount() <= 0) {
            throw new InvalidDonationException("Donation amount must be positive and strictly greater than zero.");
        }

        if (donation.getCampaignId() == null) {
            throw new InvalidDonationException("Campaign ID must be provided.");
        }

        // Validate campaign existence in database
        Campaign campaign = campaignRepository.findById(donation.getCampaignId())
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found with ID: " + donation.getCampaignId()));

        // Update campaign progress
        double updatedCollected = campaign.getCollectedAmount() + donation.getAmount();
        campaign.setCollectedAmount(updatedCollected);

        // Check if fundraising goal is reached
        if (updatedCollected >= campaign.getTargetAmount()) {
            campaign.setStatus("COMPLETED");
        }
        campaignRepository.save(campaign);

        // Assign a unique transaction reference identifier
        String txnId = "TXN-" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        donation.setTransactionId(txnId);

        // Persist donation record in MySQL
        Donation savedDonation = donationRepository.save(donation);

        // =========================================================================
        // MODULE 2.3: Multithreading in Java
        // Instantiate the Runnable worker and execute it on a new background Thread
        // =========================================================================
        ReceiptWorker worker = new ReceiptWorker(savedDonation.getId(), savedDonation.getAmount(), savedDonation.getTransactionId());
        Thread receiptThread = new Thread(worker);
        receiptThread.setName("ReceiptWorker-Txn-" + savedDonation.getTransactionId());
        receiptThread.start(); // Initiates asynchronous execution in run()

        return new ResponseEntity<>(savedDonation, HttpStatus.CREATED);
    }

    /**
     * GET /api/donations/donor/{donorId}
     * Retrieves all donations made by a specific donor.
     */
    @GetMapping("/donor/{donorId}")
    public List<Donation> getDonationsByDonor(@PathVariable Long donorId) {
        return donationRepository.findByDonorIdOrderByCreatedAtDesc(donorId);
    }

    /**
     * GET /api/donations
     * Retrieves all donations (for Admin analytics).
     */
    @GetMapping
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }
}
