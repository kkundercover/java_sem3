package com.donation.management.repository;

import com.donation.management.entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * MODULE 2.1 & 4.1: Campaign Repository Interface
 * 
 * Extends JpaRepository interface providing ready-to-use CRUD operations for Campaign entities.
 */
@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    // Inherits standard methods:
    // - save(Campaign c)
    // - findAll()
    // - findById(Long id)
    // - deleteById(Long id)
}
