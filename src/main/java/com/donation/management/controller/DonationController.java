package com.donation.management.controller;

import com.donation.management.dto.DonationRequest;
import com.donation.management.dto.DonationResponse;
import com.donation.management.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Donation Transactions (Module 6.1, 6.2 & Lab 12).
 */
@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "*")
public class DonationController {

    private final DonationService donationService;

    @Autowired
    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @PostMapping
    public ResponseEntity<DonationResponse> processDonation(@RequestBody DonationRequest request) {
        DonationResponse response = donationService.processDonation(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/donor/{donorId}")
    public ResponseEntity<List<DonationResponse>> getDonationsByDonor(@PathVariable Long donorId) {
        List<DonationResponse> donations = donationService.getDonationsByDonor(donorId);
        return ResponseEntity.ok(donations);
    }

    @GetMapping("/campaign/{campaignId}")
    public ResponseEntity<List<DonationResponse>> getDonationsByCampaign(@PathVariable Long campaignId) {
        List<DonationResponse> donations = donationService.getDonationsByCampaign(campaignId);
        return ResponseEntity.ok(donations);
    }

    @GetMapping
    public ResponseEntity<List<DonationResponse>> getAllDonations() {
        List<DonationResponse> donations = donationService.getAllDonations();
        return ResponseEntity.ok(donations);
    }
}
