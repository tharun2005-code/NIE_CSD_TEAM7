package com.nie.team7.Gaming_App.controllers;

import com.nie.team7.Gaming_App.models.Recharges;
import com.nie.team7.Gaming_App.models.Members;
import com.nie.team7.Gaming_App.services.RechargeService;
import com.nie.team7.Gaming_App.services.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/recharges")
@CrossOrigin(origins = "*")
public class RechargeController {

    @Autowired
    private RechargeService rechargeService;

    @Autowired
    private MemberService memberService;

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
    public ResponseEntity<?> createRecharge(@RequestBody Map<String, Object> rechargeData) {
        String memberId = rechargeData.get("memberId").toString();
        Double amount = Double.valueOf(rechargeData.get("amount").toString());
        
        // Check if member exists
        Optional<Members> memberOpt = memberService.getMemberById(memberId);
        if (memberOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Member not found");
        }
        
        // Create recharge
        Recharges recharge = new Recharges(memberId, amount, new Date());
        Recharges createdRecharge = rechargeService.createRecharge(recharge);
        
        // Update member balance
        Members member = memberOpt.get();
        member.setBalance(member.getBalance() + amount);
        memberService.updateMember(memberId, member);
        
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
