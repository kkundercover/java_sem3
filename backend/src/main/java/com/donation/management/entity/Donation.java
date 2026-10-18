package com.donation.management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

/**
 * MODULE 1.2 & 2.1: Donation Entity
 * 
 * Represents a donation transaction made by a donor to a specific campaign.
 * Inherits 'id' and 'createdAt' from BaseEntity.
 */
@Entity
@Table(name = "donations")
public class Donation extends BaseEntity {

    @Column(nullable = false)
    private Long donorId;

    @Column(nullable = false)
    private String donorName;

    @Column(nullable = false)
    private Long campaignId;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false, unique = true)
    private String transactionId;

    // Default No-Argument Constructor
    public Donation() {
        super();
    }

    // Parameterized Constructor
    public Donation(Long donorId, String donorName, Long campaignId, Double amount, String transactionId) {
        super();
        this.donorId = donorId;
        this.donorName = donorName;
        this.campaignId = campaignId;
        this.amount = amount;
        this.transactionId = transactionId;
    }

    // Constructor with BaseEntity properties (Constructor Overloading)
    public Donation(Long id, LocalDateTime createdAt, Long donorId, String donorName, Long campaignId, Double amount, String transactionId) {
        super(id, createdAt);
        this.donorId = donorId;
        this.donorName = donorName;
        this.campaignId = campaignId;
        this.amount = amount;
        this.transactionId = transactionId;
    }

    // Getters and Setters
    public Long getDonorId() {
        return donorId;
    }

    public void setDonorId(Long donorId) {
        this.donorId = donorId;
    }

    public String getDonorName() {
        return donorName;
    }

    public void setDonorName(String donorName) {
        this.donorName = donorName;
    }

    public Long getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(Long campaignId) {
        this.campaignId = campaignId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    @Override
    public String toString() {
        return "Donation [id=" + id + ", txn=" + transactionId + ", donor=" + donorName + ", amount=" + amount + "]";
    }
}
