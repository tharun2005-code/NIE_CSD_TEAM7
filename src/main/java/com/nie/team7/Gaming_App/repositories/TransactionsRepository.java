package com.nie.team7.Gaming_App.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.nie.team7.Gaming_App.models.Transactions;
import java.util.Date;
import java.util.List;

public interface TransactionsRepository extends MongoRepository<Transactions, String> {
    List<Transactions> findByMemberId(String memberId);
    List<Transactions> findByGameId(String gameId);
    List<Transactions> findByMemberIdOrderByDateTimeDesc(String memberId);
    List<Transactions> findByDateTimeBetween(Date startDate, Date endDate);
}
