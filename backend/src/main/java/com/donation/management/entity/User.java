package com.donation.management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

/**
 * MODULE 1.2 & 2.1: Class, Objects, Inheritance & Encapsulation
 * 
 * 1. 'extends BaseEntity': Inherits 'id' and 'createdAt' from BaseEntity.
 * 2. Encapsulation: All fields are private, accessible strictly via public getters/setters.
 * 3. Method Overriding: Overrides toString() from java.lang.Object.
 */
@Entity
@Table(name = "users")
public class User extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    // Role: "DONOR" or "ADMIN"
    @Column(nullable = false)
    private String role;

    // Default No-Argument Constructor (Required by JPA/Hibernate)
    public User() {
        super();
    }

    // Parameterized Constructor for manual instantiation
    public User(String name, String email, String password, String role) {
        super(); // Invokes parent BaseEntity constructor
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Constructor with ID and CreatedAt (Demonstrates constructor overloading & super call)
    public User(Long id, LocalDateTime createdAt, String name, String email, String password, String role) {
        super(id, createdAt);
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Encapsulation: Getter and Setter Methods
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // Method Overriding (Module 2.1: Polymorphism)
    @Override
    public String toString() {
        return "User [id=" + id + ", name=" + name + ", email=" + email + ", role=" + role + "]";
    }
}
