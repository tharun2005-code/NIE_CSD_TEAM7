package com.nie.team7.Gaming_App.controllers;

import com.nie.team7.Gaming_App.models.Games;
import com.nie.team7.Gaming_App.models.Members;
import com.nie.team7.Gaming_App.models.Transactions;
import com.nie.team7.Gaming_App.services.GamesService;
import com.nie.team7.Gaming_App.services.MemberService;
import com.nie.team7.Gaming_App.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/game")
@CrossOrigin(origins = "*")
public class GameController {

    @Autowired
    private GamesService gamesService;
    
    @Autowired
    private MemberService memberService;
    
    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<Games> addGame(@RequestBody Map<String, Object> gameData) {
        String name = (String) gameData.get("name");
        Double price = Double.valueOf(gameData.get("price").toString());
        String description = (String) gameData.get("description");
        
        Games game = new Games();
        game.setName(name);
        game.setPrice(price);
        game.setDescription(description);
        
        Games createdGame = gamesService.createGame(game);
        return ResponseEntity.ok(createdGame);
    }
    
    @PostMapping("/play")
    public ResponseEntity<String> playGame(@RequestBody Map<String, Object> playRequest) {
        String memberId = playRequest.get("member_id").toString();
        String gameId = playRequest.get("game_id").toString();
        
        // Get member and check balance
        Optional<Members> memberOpt = memberService.getMemberById(memberId);
        Optional<Games> gameOpt = gamesService.getGameById(gameId);
        
        if (memberOpt.isEmpty() || gameOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Member or Game not found");
        }
        
        Members member = memberOpt.get();
        Games game = gameOpt.get();
        
        if (member.getBalance() < game.getPrice()) {
            return ResponseEntity.badRequest().body("Insufficient balance!");
        }
        
        // Deduct balance and create transaction
        member.setBalance(member.getBalance() - game.getPrice());
        memberService.updateMember(memberId, member);
        
        Transactions transaction = new Transactions(memberId, gameId, game.getPrice(), new Date());
        transactionService.createTransaction(transaction);
        
        return ResponseEntity.ok("Game played successfully!");
    }
    
    @GetMapping
    public ResponseEntity<List<Games>> getAllGames() {
        List<Games> games = gamesService.getAllGames();
        return ResponseEntity.ok(games);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Games> getGameById(@PathVariable String id) {
        Optional<Games> game = gamesService.getGameById(id);
        return game.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Games> updateGame(@PathVariable String id, @RequestBody Games game) {
        Games updatedGame = gamesService.updateGame(id, game);
        return ResponseEntity.ok(updatedGame);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable String id) {
        gamesService.deleteGame(id);
        return ResponseEntity.noContent().build();
    }
}