package com.donation.management.dto;

import java.util.List;

public class AnalyticsResponse {

    private Double totalFundsRaised;
    private Long totalDonationsCount;
    private Long totalDonorsCount;
    private Long totalCampaignsCount;
    private Long activeCampaignsCount;
    private Double averageDonationAmount;
    private List<DonationResponse> recentDonations;

    public AnalyticsResponse() {}

    public AnalyticsResponse(Double totalFundsRaised, Long totalDonationsCount, Long totalDonorsCount,
                             Long totalCampaignsCount, Long activeCampaignsCount,
                             Double averageDonationAmount, List<DonationResponse> recentDonations) {
        this.totalFundsRaised = totalFundsRaised;
        this.totalDonationsCount = totalDonationsCount;
        this.totalDonorsCount = totalDonorsCount;
        this.totalCampaignsCount = totalCampaignsCount;
        this.activeCampaignsCount = activeCampaignsCount;
        this.averageDonationAmount = averageDonationAmount;
        this.recentDonations = recentDonations;
    }

    public Double getTotalFundsRaised() {
        return totalFundsRaised;
    }

    public void setTotalFundsRaised(Double totalFundsRaised) {
        this.totalFundsRaised = totalFundsRaised;
    }

    public Long getTotalDonationsCount() {
        return totalDonationsCount;
    }

    public void setTotalDonationsCount(Long totalDonationsCount) {
        this.totalDonationsCount = totalDonationsCount;
    }

    public Long getTotalDonorsCount() {
        return totalDonorsCount;
    }

    public void setTotalDonorsCount(Long totalDonorsCount) {
        this.totalDonorsCount = totalDonorsCount;
    }

    public Long getTotalCampaignsCount() {
        return totalCampaignsCount;
    }

    public void setTotalCampaignsCount(Long totalCampaignsCount) {
        this.totalCampaignsCount = totalCampaignsCount;
    }

    public Long getActiveCampaignsCount() {
        return activeCampaignsCount;
    }

    public void setActiveCampaignsCount(Long activeCampaignsCount) {
        this.activeCampaignsCount = activeCampaignsCount;
    }

    public Double getAverageDonationAmount() {
        return averageDonationAmount;
    }

    public void setAverageDonationAmount(Double averageDonationAmount) {
        this.averageDonationAmount = averageDonationAmount;
    }

    public List<DonationResponse> getRecentDonations() {
        return recentDonations;
    }

    public void setRecentDonations(List<DonationResponse> recentDonations) {
        this.recentDonations = recentDonations;
    }
}
