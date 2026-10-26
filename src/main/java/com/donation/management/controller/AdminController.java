package com.donation.management.controller;

import com.donation.management.dto.AnalyticsResponse;
import com.donation.management.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST Controller for Administrator Analytics and Metrics (Module 6.1, 6.2 & Lab 12).
 */
@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final DonationService donationService;

    @Autowired
    public AdminController(DonationService donationService) {
        this.donationService = donationService;
    }

    @GetMapping("/analytics")
    public ResponseEntity<AnalyticsResponse> getAnalytics() {
        AnalyticsResponse analytics = donationService.getAdminAnalytics();
        return ResponseEntity.ok(analytics);
    }
}
