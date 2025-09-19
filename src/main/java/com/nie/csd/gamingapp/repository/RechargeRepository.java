package com.nie.csd.gamingapp.repository;

import com.nie.csd.gamingapp.model.Recharge;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RechargeRepository extends MongoRepository<Recharge, String> {
}
