package com.nie.csd.gamingapp.controller;

import com.nie.csd.gamingapp.model.Recharge;
import com.nie.csd.gamingapp.service.RechargeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recharges")
public class RechargeController {

    @Autowired
    private RechargeService rechargeService;

    @PostMapping
    public Recharge addRecharge(@RequestBody Recharge recharge) {
        return rechargeService.addRecharge(recharge);
    }

    @GetMapping
    public List<Recharge> getAllRecharges() {
        return rechargeService.getAllRecharges();
    }
}

