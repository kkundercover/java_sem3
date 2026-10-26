package com.donation.management.config;

import com.donation.management.model.Campaign;
import com.donation.management.model.Donation;
import com.donation.management.model.User;
import com.donation.management.repository.CampaignRepository;
import com.donation.management.repository.DonationRepository;
import com.donation.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * Pre-seeds test data on application boot if database is empty (Module 4.1 & Lab 13).
 * Campaigns are designed to match the UI category filters: Animals, Environment, Housing.
 * Ensures instant readiness for viva demonstration and testing.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CampaignRepository campaignRepository;
    private final DonationRepository donationRepository;

    @Autowired
    public DataInitializer(UserRepository userRepository,
                           CampaignRepository campaignRepository,
                           DonationRepository donationRepository) {
        this.userRepository = userRepository;
        this.campaignRepository = campaignRepository;
        this.donationRepository = donationRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            System.out.println("[DataInitializer] Database already seeded. Skipping initial data injection.");
            return;
        }

        System.out.println("[DataInitializer] Seeding initial users, campaigns, and donation records...");

        // =====================================================================
        // 1. Users — 1 Admin, 4 Donors (matching Featured Donors sidebar)
        // =====================================================================
        User admin = userRepository.save(new User(
                "System Administrator",
                "admin@donation.org",
                "admin123",
                "ADMIN"
        ));

        User donor1 = userRepository.save(new User(
                "John Doe",
                "john@example.com",
                "donor123",
                "DONOR"
        ));

        User donor2 = userRepository.save(new User(
                "Sarah Connor",
                "sarah@example.com",
                "donor123",
                "DONOR"
        ));

        User donor3 = userRepository.save(new User(
                "Heidi John",
                "heidi@example.com",
                "donor123",
                "DONOR"
        ));

        User donor4 = userRepository.save(new User(
                "John Abraham",
                "john.abraham@example.com",
                "donor123",
                "DONOR"
        ));

        // =====================================================================
        // 2. Campaigns — mapped to UI filter categories
        //    Category detection in CampaignCard.jsx uses keywords in title/description:
        //    Animals  → donkey, animal, rescue, wildlife
        //    Environment → tree, earth, environment, forest, green
        //    Housing  → blanket, shelter, house, relief
        // =====================================================================

        // --- ANIMALS category ---
        Campaign c1 = new Campaign(
                "Peaceful Valley Donkey Rescue",
                "Rescuing and rehabilitating abandoned and abused donkeys across rural valleys, providing veterinary care, nutrition, and safe sanctuary for these gentle animals.",
                20000.0,
                admin
        );
        c1.setCollectedAmount(15000.0);
        c1.setStatus("ACTIVE");
        campaignRepository.save(c1);

        Campaign c2 = new Campaign(
                "Aloha Diaper Bank for Animals",
                "Providing essential animal care supplies, diapers, and hygiene products for sheltered rescue animals and foster pets across community animal shelters.",
                20000.0,
                admin
        );
        c2.setCollectedAmount(15000.0);
        c2.setStatus("ACTIVE");
        campaignRepository.save(c2);

        // --- ENVIRONMENT category ---
        Campaign c3 = new Campaign(
                "Wildlife Habitat Reforestation & Tree Planting",
                "Planting native trees and rebuilding green forest corridors for endangered local wildlife and biodiversity, restoring earth's natural ecosystems one tree at a time.",
                20000.0,
                admin
        );
        c3.setCollectedAmount(15000.0);
        c3.setStatus("ACTIVE");
        campaignRepository.save(c3);

        Campaign c4 = new Campaign(
                "Clean Green Earth Initiative",
                "Deploying solar-powered clean water filtration and green energy systems to drought-stricken villages, protecting the environment and communities together.",
                20000.0,
                admin
        );
        c4.setCollectedAmount(15000.0);
        c4.setStatus("ACTIVE");
        campaignRepository.save(c4);

        // --- HOUSING category ---
        Campaign c5 = new Campaign(
                "The Red Blanket Project",
                "Providing emergency blankets, warm shelter kits, and relief supplies to families facing homelessness and extreme weather conditions across underserved communities.",
                20000.0,
                admin
        );
        c5.setCollectedAmount(15000.0);
        c5.setStatus("ACTIVE");
        campaignRepository.save(c5);

        Campaign c6 = new Campaign(
                "Social Compassion Housing Relief",
                "Funding transitional housing, shelter restoration, and home rebuilding programs for displaced families and survivors of natural disasters.",
                20000.0,
                admin
        );
        c6.setCollectedAmount(15000.0);
        c6.setStatus("ACTIVE");
        campaignRepository.save(c6);

        // --- COMPLETED campaign example ---
        Campaign c7 = new Campaign(
                "Tech Education for Underprivileged Kids",
                "Equipped rural classrooms with modern computers, STEM robotics kits, and high-speed internet — Goal fully achieved!",
                10000.0,
                admin
        );
        c7.setCollectedAmount(10000.0);
        c7.setStatus("COMPLETED");
        campaignRepository.save(c7);

        // =====================================================================
        // 3. Sample Donation Records
        // =====================================================================
        donationRepository.save(new Donation(donor1, c1, 5000.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));
        donationRepository.save(new Donation(donor2, c1, 4500.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));
        donationRepository.save(new Donation(donor3, c1, 3500.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));

        donationRepository.save(new Donation(donor1, c2, 6000.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));
        donationRepository.save(new Donation(donor4, c2, 5000.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));
        donationRepository.save(new Donation(donor2, c2, 4000.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));

        donationRepository.save(new Donation(donor1, c3, 7500.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));
        donationRepository.save(new Donation(donor3, c3, 4000.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));
        donationRepository.save(new Donation(donor4, c3, 3500.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));

        donationRepository.save(new Donation(donor2, c4, 8000.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));
        donationRepository.save(new Donation(donor4, c4, 4500.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));
        donationRepository.save(new Donation(donor1, c4, 2500.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));

        donationRepository.save(new Donation(donor3, c5, 6500.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));
        donationRepository.save(new Donation(donor1, c5, 5000.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));
        donationRepository.save(new Donation(donor2, c5, 3500.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));

        donationRepository.save(new Donation(donor4, c6, 7000.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));
        donationRepository.save(new Donation(donor2, c6, 5000.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));
        donationRepository.save(new Donation(donor3, c6, 3000.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));

        donationRepository.save(new Donation(donor1, c7, 5000.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));
        donationRepository.save(new Donation(donor2, c7, 5000.0, "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()));

        System.out.println("[DataInitializer] Seeding complete! Pre-loaded 5 users, 7 campaigns (Animals/Environment/Housing/Completed), and 20 donations.");
    }
}
