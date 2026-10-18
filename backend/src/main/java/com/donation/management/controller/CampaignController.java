package com.donation.management.controller;

import com.donation.management.entity.Campaign;
import com.donation.management.exception.ResourceNotFoundException;
import com.donation.management.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.donation.management.entity.Donation;
import com.donation.management.repository.DonationRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * MODULE 6.1 & 6.2: Spring Boot REST Controller for Campaigns
 * 
 * Handles fundraising campaign CRUD operations.
 */
@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin(origins = "http://localhost:5173")
public class CampaignController {

    // Dependency Injection of CampaignRepository and DonationRepository
    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private DonationRepository donationRepository;

    /**
     * GET /api/campaigns
     * Retrieves all campaigns stored in MySQL.
     */
    @GetMapping
    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    /**
     * GET /api/campaigns/{id}
     * Retrieves a single campaign by ID. Throws custom ResourceNotFoundException if absent.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Campaign> getCampaignById(@PathVariable Long id) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found with ID: " + id));
        return ResponseEntity.ok(campaign);
    }

    /**
     * POST /api/campaigns
     * Creates a new campaign (Admin feature).
     */
    @PostMapping
    public ResponseEntity<Campaign> createCampaign(@RequestBody Campaign campaign) {
        // Initialize default values for new campaigns
        if (campaign.getCollectedAmount() == null) {
            campaign.setCollectedAmount(0.0);
        }
        if (campaign.getStatus() == null || campaign.getStatus().trim().isEmpty()) {
            campaign.setStatus("ACTIVE");
        }

        Campaign savedCampaign = campaignRepository.save(campaign);
        return new ResponseEntity<>(savedCampaign, HttpStatus.CREATED);
    }

    /**
     * DELETE /api/campaigns/{id}
     * Removes a campaign by ID and safely removes its associated donations to prevent foreign key errors.
     */
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<String> deleteCampaign(@PathVariable Long id) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot delete: Campaign not found with ID: " + id));

        // Delete associated donations first so foreign key constraint does not block deletion
        List<Donation> associatedDonations = donationRepository.findByCampaignId(id);
        if (associatedDonations != null && !associatedDonations.isEmpty()) {
            donationRepository.deleteAll(associatedDonations);
        }

        campaignRepository.delete(campaign);
        return ResponseEntity.ok("Campaign deleted successfully.");
    }
}
