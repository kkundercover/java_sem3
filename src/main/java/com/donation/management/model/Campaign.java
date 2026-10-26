package com.donation.management.model;

import jakarta.persistence.*;

/**
 * Campaign Entity demonstrating Encapsulation and Inheritance (Module 1.2 & Module 2.1).
 */
@Entity
@Table(name = "campaigns")
public class Campaign extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(name = "target_amount", nullable = false)
    private Double targetAmount;

    @Column(name = "collected_amount", nullable = false)
    private Double collectedAmount = 0.0;

    @Column(nullable = false)
    private String status = "ACTIVE"; // "ACTIVE", "COMPLETED", "PAUSED"

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "created_by")
    private User createdBy;

    public Campaign() {}

    public Campaign(String title, String description, Double targetAmount, User createdBy) {
        this.title = title;
        this.description = description;
        this.targetAmount = targetAmount;
        this.collectedAmount = 0.0;
        this.status = "ACTIVE";
        this.createdBy = createdBy;
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

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }
}
