package com.donation.management.dto;

public class CampaignRequest {

    private String title;
    private String description;
    private Double targetAmount;
    private String status; // Optional: "ACTIVE", "PAUSED", "COMPLETED"
    private Long createdById; // ID of the Admin user creating it

    public CampaignRequest() {}

    public CampaignRequest(String title, String description, Double targetAmount, String status, Long createdById) {
        this.title = title;
        this.description = description;
        this.targetAmount = targetAmount;
        this.status = status;
        this.createdById = createdById;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(Double targetAmount) {
        this.targetAmount = targetAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getCreatedById() {
        return createdById;
    }

    public void setCreatedById(Long createdById) {
        this.createdById = createdById;
    }
}
