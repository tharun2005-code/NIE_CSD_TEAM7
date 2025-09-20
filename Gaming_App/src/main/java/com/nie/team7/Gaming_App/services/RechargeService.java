package com.nie.team7.Gaming_App.services;

import com.nie.team7.Gaming_App.models.Recharges;
import com.nie.team7.Gaming_App.repositories.RechargesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Date;

@Service
public class RechargeService {

    @Autowired
    private RechargesRepository rechargesRepository;

    public List<Recharges> getAllRecharges() {
        return rechargesRepository.findAll();
    }

    public Optional<Recharges> getRechargeById(String id) {
        return rechargesRepository.findById(id);
    }

    public Recharges createRecharge(Recharges recharge) {
        return rechargesRepository.save(recharge);
    }

    public Recharges updateRecharge(String id, Recharges recharge) {
        recharge.setId(id);
        return rechargesRepository.save(recharge);
    }

    public void deleteRecharge(String id) {
        rechargesRepository.deleteById(id);
    }

    public List<Recharges> getRechargesByMemberId(String memberId) {
        return rechargesRepository.findByMemberId(memberId);
    }

    public List<Recharges> getRechargesByDateRange(Date startDate, Date endDate) {
        return rechargesRepository.findByDateTimeBetween(startDate, endDate);
    }
}
