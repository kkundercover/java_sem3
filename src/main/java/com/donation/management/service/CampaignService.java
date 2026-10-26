package com.donation.management.service;

import com.donation.management.dto.CampaignRequest;
import com.donation.management.exception.InvalidDonationException;
import com.donation.management.exception.ResourceNotFoundException;
import com.donation.management.model.Campaign;
import com.donation.management.model.User;
import com.donation.management.repository.CampaignRepository;
import com.donation.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service managing Campaign life-cycle and business logic (Module 6.1 & 6.2).
 */
@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final UserRepository userRepository;

    @Autowired
    public CampaignService(CampaignRepository campaignRepository, UserRepository userRepository) {
        this.campaignRepository = campaignRepository;
        this.userRepository = userRepository;
    }

    public List<Campaign> getAllCampaigns(String status) {
        if (status != null && !status.trim().isEmpty() && !status.equalsIgnoreCase("ALL")) {
            return campaignRepository.findByStatus(status.toUpperCase());
        }
        return campaignRepository.findAll();
    }

    public Campaign getCampaignById(Long id) {
        return campaignRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign", "id", id));
    }

    public Campaign createCampaign(CampaignRequest request) {
        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new InvalidDonationException("Campaign title is required.");
        }
        if (request.getTargetAmount() == null || request.getTargetAmount() <= 0) {
            throw new InvalidDonationException("Campaign target amount must be strictly greater than 0.");
        }

        User creator = null;
        if (request.getCreatedById() != null) {
            creator = userRepository.findById(request.getCreatedById()).orElse(null);
        }

        Campaign campaign = new Campaign(
                request.getTitle().trim(),
                request.getDescription() != null ? request.getDescription().trim() : "",
                request.getTargetAmount(),
                creator
        );

        if (request.getStatus() != null && !request.getStatus().trim().isEmpty()) {
            campaign.setStatus(request.getStatus().toUpperCase());
        }

        return campaignRepository.save(campaign);
    }

    public Campaign updateCampaign(Long id, CampaignRequest request) {
        Campaign campaign = getCampaignById(id);

        if (request.getTitle() != null && !request.getTitle().trim().isEmpty()) {
            campaign.setTitle(request.getTitle().trim());
        }
        if (request.getDescription() != null) {
            campaign.setDescription(request.getDescription().trim());
        }
        if (request.getTargetAmount() != null && request.getTargetAmount() > 0) {
            campaign.setTargetAmount(request.getTargetAmount());
        }
        if (request.getStatus() != null && !request.getStatus().trim().isEmpty()) {
            campaign.setStatus(request.getStatus().toUpperCase());
        }

        return campaignRepository.save(campaign);
    }

    public void deleteCampaign(Long id) {
        Campaign campaign = getCampaignById(id);
        campaignRepository.delete(campaign);
    }
}
