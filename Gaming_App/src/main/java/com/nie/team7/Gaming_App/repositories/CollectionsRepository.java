package com.nie.team7.Gaming_App.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.nie.team7.Gaming_App.models.Collections;
import java.util.List;

public interface CollectionsRepository extends MongoRepository<Collections, String> {
    List<Collections> findByMemberId(String memberId);
    List<Collections> findByGameId(String gameId);
    List<Collections> findByStatus(String status);
}
