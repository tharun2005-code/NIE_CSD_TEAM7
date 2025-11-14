package com.nie.team7.Gaming_App.controllers;

import com.nie.team7.Gaming_App.models.Recharges;
import com.nie.team7.Gaming_App.models.Members;
import com.nie.team7.Gaming_App.models.Transactions;
import com.nie.team7.Gaming_App.services.RechargeService;
import com.nie.team7.Gaming_App.services.MemberService;
import com.nie.team7.Gaming_App.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/collection")
@CrossOrigin(origins = "*")
public class CollectionsController {

    @Autowired
    private RechargeService rechargeService;
    
    @Autowired
    private MemberService memberService;
    
    @Autowired
    private TransactionService transactionService;

    @GetMapping("/{dateString}")
    public ResponseEntity<List<Map<String, Object>>> getCollectionsByDate(@PathVariable String dateString) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date searchDate = sdf.parse(dateString);
            
            // Get start and end of day
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(searchDate);
            calendar.set(Calendar.HOUR_OF_DAY, 0);
            calendar.set(Calendar.MINUTE, 0);
            calendar.set(Calendar.SECOND, 0);
            calendar.set(Calendar.MILLISECOND, 0);
            Date startOfDay = calendar.getTime();
            
            calendar.set(Calendar.HOUR_OF_DAY, 23);
            calendar.set(Calendar.MINUTE, 59);
            calendar.set(Calendar.SECOND, 59);
            calendar.set(Calendar.MILLISECOND, 999);
            Date endOfDay = calendar.getTime();
            
            List<Map<String, Object>> response = new ArrayList<>();
            
            // Get recharges for the date
            List<Recharges> recharges = rechargeService.getRechargesByDateRange(startOfDay, endOfDay);
            
            for (Recharges recharge : recharges) {
                Map<String, Object> item = new HashMap<>();
                
                // Get member name
                Optional<Members> memberOpt = memberService.getMemberById(recharge.getMemberId());
                String memberName = memberOpt.isPresent() ? memberOpt.get().getName() : "Unknown";
                
                item.put("transaction_id", recharge.getId());
                item.put("member", memberName);
                item.put("recharge_amount", recharge.getAmount());
                item.put("transaction_type", "RECHARGE");
                
                response.add(item);
            }
            
            // Get membership transactions for the date
            List<Transactions> membershipTransactions = transactionService.getTransactionsByDateRange(startOfDay, endOfDay);
            
            for (Transactions transaction : membershipTransactions) {
                // Only include membership fee transactions
                if ("MEMBERSHIP_FEE".equals(transaction.getGameId())) {
                    Map<String, Object> item = new HashMap<>();
                    
                    // Get member name
                    Optional<Members> memberOpt = memberService.getMemberById(transaction.getMemberId());
                    String memberName = memberOpt.isPresent() ? memberOpt.get().getName() : "Unknown";
                    
                    item.put("transaction_id", transaction.getId());
                    item.put("member", memberName);
                    item.put("recharge_amount", transaction.getAmount());
                    item.put("transaction_type", "MEMBERSHIP_FEE");
                    
                    response.add(item);
                }
            }
            
            // Sort by transaction time (most recent first)
            response.sort((a, b) -> {
                // You could add timestamp comparison here if needed
                return 0; // For now, keep original order
            });
            
            return ResponseEntity.ok(response);
            
        } catch (ParseException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}