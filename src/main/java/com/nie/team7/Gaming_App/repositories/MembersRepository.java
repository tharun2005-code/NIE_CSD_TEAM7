package com.nie.team7.Gaming_App.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.nie.team7.Gaming_App.models.Members;
import java.util.Optional;

public interface MembersRepository extends MongoRepository<Members, String> {
    Optional<Members> findByPhone(String phone);
}
