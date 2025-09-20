package com.nie.team7.Gaming_App.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.nie.team7.Gaming_App.models.AdminUsers;
import java.util.Optional;

public interface AdminUsersRepository extends MongoRepository<AdminUsers, String> {
    Optional<AdminUsers> findByUsername(String username);
    Optional<AdminUsers> findByUsernameAndPassword(String username, String password);
}
