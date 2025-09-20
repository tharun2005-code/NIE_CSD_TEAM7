package com.nie.csd.gamingapp.service;
import com.nie.csd.gamingapp.model.Member;
import com.nie.csd.gamingapp.model.Recharge;
import com.nie.csd.gamingapp.repository.MemberRepository;
import com.nie.csd.gamingapp.repository.RechargeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RechargeService {

    @Autowired
    private RechargeRepository rechargeRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private CollectionService collectionService;

    public Recharge addRecharge(Recharge recharge) {
        // Save recharge record
        Recharge savedRecharge = rechargeRepository.save(recharge);

        // Update member balance
        Optional<Member> memberOpt = memberRepository.findById(recharge.getMemberId());
        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();
            member.setBalance(member.getBalance() + recharge.getAmount());
            memberRepository.save(member);
        }
        collectionService.addToCollection(recharge.getAmount());
        return savedRecharge;
    }

    public List<Recharge> getAllRecharges() {
        return rechargeRepository.findAll();
    }
}
