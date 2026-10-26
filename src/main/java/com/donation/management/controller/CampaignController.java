package com.donation.management.controller;

import com.donation.management.dto.CampaignRequest;
import com.donation.management.model.Campaign;
import com.donation.management.service.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for Campaign Management (Module 6.1, 6.2 & Lab 12).
 */
@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin(origins = "*")
public class CampaignController {

    private final CampaignService campaignService;

    @Autowired
    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @GetMapping
    public ResponseEntity<List<Campaign>> getAllCampaigns(@RequestParam(required = false) String status) {
        List<Campaign> campaigns = campaignService.getAllCampaigns(status);
        return ResponseEntity.ok(campaigns);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Campaign> getCampaignById(@PathVariable Long id) {
        Campaign campaign = campaignService.getCampaignById(id);
        return ResponseEntity.ok(campaign);
    }

    @PostMapping
    public ResponseEntity<Campaign> createCampaign(@RequestBody CampaignRequest request) {
        Campaign createdCampaign = campaignService.createCampaign(request);
        return new ResponseEntity<>(createdCampaign, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Campaign> updateCampaign(@PathVariable Long id, @RequestBody CampaignRequest request) {
        Campaign updatedCampaign = campaignService.updateCampaign(id, request);
        return ResponseEntity.ok(updatedCampaign);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteCampaign(@PathVariable Long id) {
        campaignService.deleteCampaign(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Campaign with ID " + id + " has been successfully deleted.");
        return ResponseEntity.ok(response);
    }
}
