package com.donation.management.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import java.time.LocalDateTime;

/**
 * MODULE 1.2 & 2.1: OOP Concepts & Inheritance
 * 
 * Demonstrates:
 * 1. Abstract Class: BaseEntity cannot be instantiated directly with 'new BaseEntity()'.
 * 2. Inheritance: Common fields (id, createdAt) are inherited by child entities using 'extends'.
 * 3. Encapsulation: Fields are declared 'protected' or 'private' and accessed via getters and setters.
 * 4. JPA @MappedSuperclass: Tells Hibernate to map these fields into the child entity's database table.
 */
@MappedSuperclass
public abstract class BaseEntity {

    // Primary Key with auto-increment strategy
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    // Timestamp when the record is created
    protected LocalDateTime createdAt;

    // Default No-Argument Constructor (Required by JPA specification)
    public BaseEntity() {
    }

    // Parameterized Constructor
    public BaseEntity(Long id, LocalDateTime createdAt) {
        this.id = id;
        this.createdAt = createdAt;
    }

    // Lifecycle hook: sets the creation timestamp automatically before persisting into the DB
    @PrePersist
    public void onPrePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    // Standard Getters and Setters demonstrating Encapsulation
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
