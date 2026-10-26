package com.donation.management.service;

import com.donation.management.dto.AnalyticsResponse;
import com.donation.management.dto.DonationRequest;
import com.donation.management.dto.DonationResponse;
import com.donation.management.exception.InvalidDonationException;
import com.donation.management.exception.ResourceNotFoundException;
import com.donation.management.model.Campaign;
import com.donation.management.model.Donation;
import com.donation.management.model.User;
import com.donation.management.repository.CampaignRepository;
import com.donation.management.repository.DonationRepository;
import com.donation.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Core transactional business service managing donation workflows and multithreaded notifications (Module 2.3, 4.1 & 6.1).
 */
@Service
public class DonationService {

    private final DonationRepository donationRepository;
    private final CampaignRepository campaignRepository;
    private final UserRepository userRepository;
    private final EmailNotificationService emailNotificationService;

    @Autowired
    public DonationService(DonationRepository donationRepository,
                           CampaignRepository campaignRepository,
                           UserRepository userRepository,
                           EmailNotificationService emailNotificationService) {
        this.donationRepository = donationRepository;
        this.campaignRepository = campaignRepository;
        this.userRepository = userRepository;
        this.emailNotificationService = emailNotificationService;
    }

    /**
     * Atomically executes a donation transaction, updates campaign totals, and dispatches background worker thread.
     */
    @Transactional
    public DonationResponse processDonation(DonationRequest request) {
        // Assert donation amount > 0 (Client & Server Validation alignment)
        if (request.getAmount() == null || request.getAmount() <= 0) {
            throw new InvalidDonationException("Donation amount must be strictly greater than zero. Received: " + request.getAmount());
        }

        // Validate donor existence
        User donor = userRepository.findById(request.getDonorId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getDonorId()));

        // Validate campaign existence
        Campaign campaign = campaignRepository.findById(request.getCampaignId())
                .orElseThrow(() -> new ResourceNotFoundException("Campaign", "id", request.getCampaignId()));

        if ("COMPLETED".equalsIgnoreCase(campaign.getStatus())) {
            throw new InvalidDonationException("Cannot donate to campaign '" + campaign.getTitle() + "' because it is already COMPLETED.");
        }

        // Atomically increment campaign collected_amount
        double updatedAmount = (campaign.getCollectedAmount() == null ? 0.0 : campaign.getCollectedAmount()) + request.getAmount();
        campaign.setCollectedAmount(updatedAmount);

        // Auto-complete campaign if target is reached
        if (campaign.getTargetAmount() != null && updatedAmount >= campaign.getTargetAmount()) {
            campaign.setStatus("COMPLETED");
        }
        campaignRepository.save(campaign);

        // Generate unique transaction UUID
        String transactionId = "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        // Persist donation record
        Donation donation = new Donation(donor, campaign, request.getAmount(), transactionId);
        Donation savedDonation = donationRepository.save(donation);

        // Multithreading: trigger asynchronous email receipt on worker thread
        emailNotificationService.sendDonationReceiptAsync(savedDonation);
        emailNotificationService.dispatchViaCustomRunnable(savedDonation);

        return mapToResponse(savedDonation);
    }

    public List<DonationResponse> getDonationsByDonor(Long donorId) {
        userRepository.findById(donorId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", donorId));

        return donationRepository.findByDonorId(donorId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<DonationResponse> getDonationsByCampaign(Long campaignId) {
        campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign", "id", campaignId));

        return donationRepository.findByCampaignId(campaignId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<DonationResponse> getAllDonations() {
        return donationRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public AnalyticsResponse getAdminAnalytics() {
        Double totalFunds = donationRepository.getTotalDonationSum();
        if (totalFunds == null) {
            totalFunds = 0.0;
        }

        long totalDonations = donationRepository.count();
        long totalUsers = userRepository.count();
        long totalCampaigns = campaignRepository.count();
        long activeCampaigns = campaignRepository.findByStatus("ACTIVE").size();

        double avgDonation = totalDonations > 0 ? (totalFunds / totalDonations) : 0.0;

        List<DonationResponse> recent = donationRepository.findAll().stream()
                .sorted((a, b) -> b.getId().compareTo(a.getId()))
                .limit(5)
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return new AnalyticsResponse(
                Math.round(totalFunds * 100.0) / 100.0,
                totalDonations,
                totalUsers,
                totalCampaigns,
                activeCampaigns,
                Math.round(avgDonation * 100.0) / 100.0,
                recent
        );
    }

    private DonationResponse mapToResponse(Donation donation) {
        return new DonationResponse(
                donation.getId(),
                donation.getDonor().getId(),
                donation.getDonor().getName(),
                donation.getDonor().getEmail(),
                donation.getCampaign().getId(),
                donation.getCampaign().getTitle(),
                donation.getAmount(),
                donation.getTransactionId(),
                donation.getCreatedAt()
        );
    }
}
