package com.nie.csd.gamingapp.service;

import com.nie.csd.gamingapp.model.Game;
import com.nie.csd.gamingapp.model.Member;
import com.nie.csd.gamingapp.model.Transaction;
import com.nie.csd.gamingapp.repository.GameRepository;
import com.nie.csd.gamingapp.repository.MemberRepository;
import com.nie.csd.gamingapp.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private GameRepository gameRepository;

    public Transaction addTransaction(Transaction transaction) {
        Optional<Member> memberOpt = memberRepository.findById(transaction.getMemberId());
        Optional<Game> gameOpt = gameRepository.findById(transaction.getGameId());

        if (memberOpt.isPresent() && gameOpt.isPresent()) {
            Member member = memberOpt.get();
            Game game = gameOpt.get();

            // Deduct price from balance
            if (member.getBalance() >= game.getPrice()) {
                member.setBalance(member.getBalance() - game.getPrice());
                memberRepository.save(member);

                // Set transaction amount = game price
                transaction.setAmount(game.getPrice());
                return transactionRepository.save(transaction);
            } else {
                throw new RuntimeException("Insufficient balance!");
            }
        } else {
            throw new RuntimeException("Invalid member or game!");
        }
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}
