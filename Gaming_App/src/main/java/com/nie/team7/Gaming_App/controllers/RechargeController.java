package com.nie.team7.Gaming_App.controllers;

import com.nie.team7.Gaming_App.models.Recharges;
import com.nie.team7.Gaming_App.services.RechargeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recharges")
@CrossOrigin(origins = "*")
public class RechargeController {

    @Autowired
    private RechargeService rechargeService;

    @GetMapping
    public ResponseEntity<List<Recharges>> getAllRecharges() {
        List<Recharges> recharges = rechargeService.getAllRecharges();
        return ResponseEntity.ok(recharges);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recharges> getRechargeById(@PathVariable String id) {
        Optional<Recharges> recharge = rechargeService.getRechargeById(id);
        return recharge.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Recharges> createRecharge(@RequestBody Recharges recharge) {
        Recharges createdRecharge = rechargeService.createRecharge(recharge);
        return ResponseEntity.ok(createdRecharge);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recharges> updateRecharge(@PathVariable String id, @RequestBody Recharges recharge) {
        Recharges updatedRecharge = rechargeService.updateRecharge(id, recharge);
        return ResponseEntity.ok(updatedRecharge);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecharge(@PathVariable String id) {
        rechargeService.deleteRecharge(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<Recharges>> getRechargesByMemberId(@PathVariable String memberId) {
        List<Recharges> recharges = rechargeService.getRechargesByMemberId(memberId);
        return ResponseEntity.ok(recharges);
    }
}
