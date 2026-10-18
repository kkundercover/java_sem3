package com.donation.management.repository;

import com.donation.management.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * MODULE 2.1 & 4.1: Donation Repository Interface
 * 
 * Extends JpaRepository interface and adds custom derived query for donor-specific transactions.
 */
@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {

    // Derived query method: Retrieves all donations made by a specific donor
    List<Donation> findByDonorIdOrderByCreatedAtDesc(Long donorId);

    // Derived query method: Retrieves all donations associated with a campaign
    List<Donation> findByCampaignId(Long campaignId);
}
