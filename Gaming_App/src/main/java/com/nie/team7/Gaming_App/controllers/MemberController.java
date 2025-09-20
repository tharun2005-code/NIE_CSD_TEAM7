package com.nie.team7.Gaming_App.controllers;

import com.nie.team7.Gaming_App.models.Members;
import com.nie.team7.Gaming_App.models.Games;
import com.nie.team7.Gaming_App.models.Recharges;
import com.nie.team7.Gaming_App.models.Transactions;
import com.nie.team7.Gaming_App.services.MemberService;
import com.nie.team7.Gaming_App.services.GamesService;
import com.nie.team7.Gaming_App.services.RechargeService;
import com.nie.team7.Gaming_App.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/members")
@CrossOrigin(origins = "*")
public class MemberController {

    @Autowired
    private MemberService memberService;
    
    @Autowired
    private GamesService gamesService;
    
    @Autowired
    private RechargeService rechargeService;
    
    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<Members> createMember(@RequestBody Map<String, Object> memberData) {
        String name = (String) memberData.get("name");
        String phone = (String) memberData.get("phone");
        Double fee = Double.valueOf(memberData.get("fee").toString());
        
        Members member = new Members(name, phone, fee);
        Members createdMember = memberService.createMember(member);
        
        // Create a transaction record for the membership fee
        if (createdMember != null && fee > 0) {
            Transactions membershipTransaction = new Transactions(
                createdMember.getId(), 
                "MEMBERSHIP_FEE", // Special gameId for membership fees
                fee, 
                new Date()
            );
            transactionService.createTransaction(membershipTransaction);
        }
        
        return ResponseEntity.ok(createdMember);
    }

    @PostMapping("/search")
    public ResponseEntity<Map<String, Object>> searchMember(@RequestBody Map<String, String> searchRequest) {
        String phone = searchRequest.get("phone");
        Optional<Members> memberOpt = memberService.getMemberByPhone(phone);
        
        if (memberOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Members member = memberOpt.get();
        Map<String, Object> response = new HashMap<>();
        response.put("member", member);
        
        // Get recharge history
        List<Recharges> rechargeHistory = rechargeService.getRechargesByMemberId(member.getId());
        response.put("recharge_history", rechargeHistory);
        
        // Get available games
        List<Games> games = gamesService.getAllGames();
        response.put("games", games);
        
        // Get played history
        List<Transactions> playedHistory = transactionService.getTransactionsByMemberId(member.getId());
        response.put("played_history", playedHistory);
        
        return ResponseEntity.ok(response);
    }
}
