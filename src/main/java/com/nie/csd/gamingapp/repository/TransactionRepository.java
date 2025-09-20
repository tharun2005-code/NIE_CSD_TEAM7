package com.nie.csd.gamingapp.repository;

import com.nie.csd.gamingapp.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
}
