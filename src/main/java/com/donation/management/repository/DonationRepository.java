package com.donation.management.repository;

import com.donation.management.model.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByDonorId(Long donorId);
    List<Donation> findByCampaignId(Long campaignId);

    @Query("SELECT SUM(d.amount) FROM Donation d")
    Double getTotalDonationSum();
}
