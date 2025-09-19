package com.nie.csd.gamingapp.repository;

import com.nie.csd.gamingapp.model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends MongoRepository<Game, String> {

}
