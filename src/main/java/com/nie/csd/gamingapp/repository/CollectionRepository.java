package com.nie.csd.gamingapp.repository;

import com.nie.csd.gamingapp.model.Collection;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Date;
import java.util.Optional;

public interface CollectionRepository extends MongoRepository<Collection, String> {
    Optional<Collection> findByDate(Date date);
}
