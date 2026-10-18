package com.donation.management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

/**
 * MODULE 1.2 & 2.1: Campaign Entity
 * 
 * Represents a donation fundraising campaign.
 * Inherits 'id' and 'createdAt' from BaseEntity via 'extends'.
 */
@Entity
@Table(name = "campaigns")
public class Campaign extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private Double targetAmount;

    @Column(nullable = false)
    private Double collectedAmount = 0.0;

    // Status: "ACTIVE", "COMPLETED", "CLOSED"
    @Column(nullable = false)
    private String status = "ACTIVE";

    // Default No-Argument Constructor
    public Campaign() {
        super();
    }

    // Parameterized Constructor
    public Campaign(String title, String description, Double targetAmount) {
        super();
        this.title = title;
        this.description = description;
        this.targetAmount = targetAmount;
        this.collectedAmount = 0.0;
        this.status = "ACTIVE";
    }

    // Full Parameterized Constructor (Constructor Overloading)
    public Campaign(Long id, LocalDateTime createdAt, String title, String description, Double targetAmount, Double collectedAmount, String status) {
        super(id, createdAt);
        this.title = title;
        this.description = description;
        this.targetAmount = targetAmount;
        this.collectedAmount = collectedAmount;
        this.status = status;
    }

    // Getters and Setters
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

    public Double getCollectedAmount() {
        return collectedAmount;
    }

    public void setCollectedAmount(Double collectedAmount) {
        this.collectedAmount = collectedAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Campaign [id=" + id + ", title=" + title + ", target=" + targetAmount + ", collected=" + collectedAmount + ", status=" + status + "]";
    }
}
