package com.donation.management.repository;

import com.donation.management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * MODULE 2.1 & 4.1: Interface & Database Connectivity
 * 
 * 1. 'implements / extends Interface': UserRepository is an interface extending JpaRepository.
 * 2. Spring Data JPA generates standard CRUD implementations at runtime:
 *    save(), findById(), findAll(), deleteById().
 * 3. Custom Query Method: findByEmail() auto-generates SQL:
 *    SELECT * FROM users WHERE email = ?;
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Derived query method to find user by unique email during login / registration check
    Optional<User> findByEmail(String email);
}
