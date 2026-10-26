package com.donation.management.dto;

import java.time.LocalDateTime;

public class DonationResponse {

    private Long id;
    private Long donorId;
    private String donorName;
    private String donorEmail;
    private Long campaignId;
    private String campaignTitle;
    private Double amount;
    private String transactionId;
    private LocalDateTime createdAt;

    public DonationResponse() {}

    public DonationResponse(Long id, Long donorId, String donorName, String donorEmail,
                            Long campaignId, String campaignTitle, Double amount,
                            String transactionId, LocalDateTime createdAt) {
        this.id = id;
        this.donorId = donorId;
        this.donorName = donorName;
        this.donorEmail = donorEmail;
        this.campaignId = campaignId;
        this.campaignTitle = campaignTitle;
        this.amount = amount;
        this.transactionId = transactionId;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getDonorEmail() {
        return donorEmail;
    }

    public void setDonorEmail(String donorEmail) {
        this.donorEmail = donorEmail;
    }

    public Long getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(Long campaignId) {
        this.campaignId = campaignId;
    }

    public String getCampaignTitle() {
        return campaignTitle;
    }

    public void setCampaignTitle(String campaignTitle) {
        this.campaignTitle = campaignTitle;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
