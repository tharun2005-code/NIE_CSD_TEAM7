package com.nie.csd.gamingapp.controller;

import com.nie.csd.gamingapp.model.Game;
import com.nie.csd.gamingapp.service.GameService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/games")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    // 1. Add game
    @PostMapping
    public Game createGame(@RequestBody Game game) {
        return gameService.createGame(game);
    }

    // 2. Get all games
    @GetMapping
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    // 3. Get game by ID
    @GetMapping("/{id}")
    public Optional<Game> getGameById(@PathVariable String id) {
        return gameService.getGameById(id);
    }

    // 4. Delete game
    @DeleteMapping("/{id}")
    public void deleteGame(@PathVariable String id) {
        gameService.deleteGame(id);
    }
}
