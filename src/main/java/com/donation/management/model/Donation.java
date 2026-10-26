package com.donation.management.model;

import jakarta.persistence.*;

/**
 * Donation Entity representing financial transaction records (Module 1.2 & Module 4.1).
 */
@Entity
@Table(name = "donations")
public class Donation extends BaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "donor_id", nullable = false)
    private User donor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "campaign_id", nullable = false)
    private Campaign campaign;

    @Column(nullable = false)
    private Double amount;

    @Column(name = "transaction_id", nullable = false, unique = true)
    private String transactionId;

    public Donation() {}

    public Donation(User donor, Campaign campaign, Double amount, String transactionId) {
        this.donor = donor;
        this.campaign = campaign;
        this.amount = amount;
        this.transactionId = transactionId;
    }

    public User getDonor() {
        return donor;
    }

    public void setDonor(User donor) {
        this.donor = donor;
    }

    public Campaign getCampaign() {
        return campaign;
    }

    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
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
}
