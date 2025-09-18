package com.nie.csd.gamingapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.nie.csd.gamingapp.model.Member;
import java.util.Optional;

@Repository
public interface MemberRepository extends MongoRepository<Member, String> {
    Optional<Member> findByPhone(String phone);
    boolean existsByPhone(String phone);
}
