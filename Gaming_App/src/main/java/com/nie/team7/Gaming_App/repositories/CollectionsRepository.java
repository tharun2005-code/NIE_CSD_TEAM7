package com.nie.team7.Gaming_App.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.nie.team7.Gaming_App.models.Collections;

public interface CollectionsRepository extends MongoRepository<Collections, String> {
	
}
