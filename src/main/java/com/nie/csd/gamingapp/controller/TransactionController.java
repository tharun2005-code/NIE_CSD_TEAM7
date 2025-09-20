package com.nie.csd.gamingapp.controller;

import com.nie.csd.gamingapp.model.Transaction;
import com.nie.csd.gamingapp.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction transaction) {
        return transactionService.addTransaction(transaction);
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }
}

