package com.donation.management;

import com.donation.management.entity.Campaign;
import com.donation.management.entity.User;
import com.donation.management.repository.CampaignRepository;
import com.donation.management.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

/**
 * MODULE 6.1 & 6.2: Spring Boot Main Application Entry Point
 * 
 * 1. @SpringBootApplication: Triggers Auto-Configuration, Component Scanning, and Property loading.
 * 2. CommandLineRunner: Pre-populates the database with sample users and campaigns on startup.
 */
@SpringBootApplication
public class DonationManagementApplication {

    public static void main(String[] args) {
        // Starts the Spring Boot application and embedded Tomcat server on port 8080
        SpringApplication.run(DonationManagementApplication.class, args);
        System.out.println("==========================================================");
        System.out.println(">>> Donation Management Backend is running on port 8080 <<<");
        System.out.println("==========================================================");
    }

    /**
     * Seeds initial mock data for immediate testing and demo viva presentation.
     */
    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository, CampaignRepository campaignRepository) {
        return args -> {
            // Seed Admin User if not present
            if (userRepository.findByEmail("admin@charity.org").isEmpty()) {
                User admin = new User("System Administrator", "admin@charity.org", "admin123", "ADMIN");
                userRepository.save(admin);
                System.out.println("Seeded Default Admin: admin@charity.org / admin123");
            }

            // Seed Donor User if not present
            if (userRepository.findByEmail("rahul@gmail.com").isEmpty()) {
                User donor = new User("Rahul Sharma", "rahul@gmail.com", "donor123", "DONOR");
                userRepository.save(donor);
                System.out.println("Seeded Default Donor: rahul@gmail.com / donor123");
            }

            // Seed Campaigns if table is empty
            if (campaignRepository.count() == 0) {
                Campaign c1 = new Campaign("Underprivileged Child Education Fund", 
                        "Providing school bags, books, and uniforms for 100 rural children.", 50000.0);
                c1.setCollectedAmount(15000.0);
                campaignRepository.save(c1);

                Campaign c2 = new Campaign("Clean Drinking Water in Drought Villages", 
                        "Installing community water filtration units and borewell repairs.", 80000.0);
                c2.setCollectedAmount(48000.0);
                campaignRepository.save(c2);

                Campaign c3 = new Campaign("Winter Relief Blankets & Warm Clothing", 
                        "Distributing warm blankets and jackets to homeless elderly people.", 20000.0);
                c3.setCollectedAmount(20000.0);
                c3.setStatus("COMPLETED");
                campaignRepository.save(c3);

                System.out.println("Seeded 3 Sample Fundraising Campaigns.");
            }
        };
    }
}
