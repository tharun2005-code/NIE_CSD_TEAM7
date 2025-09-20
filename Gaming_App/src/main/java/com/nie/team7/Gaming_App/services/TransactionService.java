package com.nie.team7.Gaming_App.services;

import com.nie.team7.Gaming_App.models.Transactions;
import com.nie.team7.Gaming_App.repositories.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionsRepository transactionsRepository;

    public List<Transactions> getAllTransactions() {
        return transactionsRepository.findAll();
    }

    public Optional<Transactions> getTransactionById(String id) {
        return transactionsRepository.findById(id);
    }

    public Transactions createTransaction(Transactions transaction) {
        return transactionsRepository.save(transaction);
    }

    public Transactions updateTransaction(String id, Transactions transaction) {
        transaction.setId(id);
        return transactionsRepository.save(transaction);
    }

    public void deleteTransaction(String id) {
        transactionsRepository.deleteById(id);
    }

    public List<Transactions> getTransactionsByMemberId(String memberId) {
        return transactionsRepository.findByMemberId(memberId);
    }

    public List<Transactions> getTransactionsByGameId(String gameId) {
        return transactionsRepository.findByGameId(gameId);
    }

    public List<Transactions> getTransactionsByMemberIdOrderByDate(String memberId) {
        return transactionsRepository.findByMemberIdOrderByDateTimeDesc(memberId);
    }
}
