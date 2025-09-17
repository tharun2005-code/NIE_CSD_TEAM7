package com.nie.team7.Gaming_App.repositories;

import com.nie.team7.Gaming_App.models.Games;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GamesRepository extends MongoRepository<Games, String> {
	
}
