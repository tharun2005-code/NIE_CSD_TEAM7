package com.nie.team7.Gaming_App.services;

import com.nie.team7.Gaming_App.models.Games;
import com.nie.team7.Gaming_App.repositories.GamesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GamesService {

    @Autowired
    private GamesRepository gamesRepository;

    public List<Games> getAllGames() {
        return gamesRepository.findAll();
    }

    public Optional<Games> getGameById(String id) {
        return gamesRepository.findById(id);
    }

    public Games createGame(Games game) {
        return gamesRepository.save(game);
    }

    public Games updateGame(String id, Games game) {
        game.setId(id);
        return gamesRepository.save(game);
    }

    public void deleteGame(String id) {
        gamesRepository.deleteById(id);
    }

    public List<Games> getGamesByCategory(String category) {
        return gamesRepository.findByCategory(category);
    }

    public List<Games> getGamesByStatus(String status) {
        return gamesRepository.findByStatus(status);
    }

    public List<Games> getGamesByPriceRange(Double minPrice, Double maxPrice) {
        return gamesRepository.findByPriceBetween(minPrice, maxPrice);
    }
}
