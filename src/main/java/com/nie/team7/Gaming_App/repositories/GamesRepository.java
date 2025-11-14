package com.nie.team7.Gaming_App.repositories;

import com.nie.team7.Gaming_App.models.Games;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface GamesRepository extends MongoRepository<Games, String> {
    List<Games> findByStatus(String status);
    List<Games> findByPriceBetween(Double minPrice, Double maxPrice);
}
