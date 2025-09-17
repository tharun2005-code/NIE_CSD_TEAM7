package com.nie.team7.Gaming_App.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.nie.team7.Gaming_App.models.Recharges;

public interface RechargesRepository extends MongoRepository<Recharges, String> {

}
