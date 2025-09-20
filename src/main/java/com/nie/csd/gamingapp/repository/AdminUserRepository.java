package com.nie.csd.gamingapp.repository;

import com.nie.csd.gamingapp.model.AdminUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminUserRepository extends MongoRepository<AdminUser, String> {
    Optional<AdminUser> findByUsername(String username);
}
