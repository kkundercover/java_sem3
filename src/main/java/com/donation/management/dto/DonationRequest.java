package com.donation.management.dto;

public class DonationRequest {

    private Long donorId;
    private Long campaignId;
    private Double amount;

    public DonationRequest() {}

    public DonationRequest(Long donorId, Long campaignId, Double amount) {
        this.donorId = donorId;
        this.campaignId = campaignId;
        this.amount = amount;
    }

    public Long getDonorId() {
        return donorId;
    }

    public void setDonorId(Long donorId) {
        this.donorId = donorId;
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
}
