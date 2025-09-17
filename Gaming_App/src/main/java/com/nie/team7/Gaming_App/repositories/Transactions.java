package com.nie.team7.Gaming_App.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface Transactions extends MongoRepository<Transactions, String> {
	
}
