package com.nie.team7.Gaming_App.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.nie.team7.Gaming_App.models.Collections;
import java.util.List;
import java.util.Date;

public interface CollectionsRepository extends MongoRepository<Collections, String> {
    List<Collections> findByDate(Date date);
    List<Collections> findByDateBetween(Date startDate, Date endDate);
}
