package com.nie.team7.Gaming_App;

import com.nie.team7.Gaming_App.models.Games;
import com.nie.team7.Gaming_App.repositories.GamesRepository;
import com.nie.team7.Gaming_App.services.GamesService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GameServiceTest {

    @Mock
    private GamesRepository gamesRepository;

    @InjectMocks
    private GamesService gamesService;

    private Games testGame;

    @BeforeEach
    void setUp() {
        testGame = new Games();
        testGame.setId("1");
        testGame.setName("Test Game");
        testGame.setDescription("A test game");
        testGame.setPrice(29.99);
        testGame.setStatus("Active");
        testGame.setMinPlayerCount(1);
        testGame.setMaxPlayerCount(4);
    }

    @Test
    void testGetAllGames() {
        List<Games> games = Arrays.asList(testGame);
        when(gamesRepository.findAll()).thenReturn(games);

        List<Games> result = gamesService.getAllGames();

        assertEquals(1, result.size());
        assertEquals(testGame, result.get(0));
        verify(gamesRepository).findAll();
    }

    @Test
    void testGetGameById() {
        when(gamesRepository.findById("1")).thenReturn(Optional.of(testGame));

        Optional<Games> result = gamesService.getGameById("1");

        assertTrue(result.isPresent());
        assertEquals(testGame, result.get());
        verify(gamesRepository).findById("1");
    }

    @Test
    void testCreateGame() {
        when(gamesRepository.save(any(Games.class))).thenReturn(testGame);

        Games result = gamesService.createGame(testGame);

        assertEquals(testGame, result);
        verify(gamesRepository).save(testGame);
    }

    @Test
    void testUpdateGame() {
        when(gamesRepository.save(any(Games.class))).thenReturn(testGame);

        Games result = gamesService.updateGame("1", testGame);

        assertEquals(testGame, result);
        verify(gamesRepository).save(testGame);
    }

    @Test
    void testDeleteGame() {
        doNothing().when(gamesRepository).deleteById("1");

        gamesService.deleteGame("1");

        verify(gamesRepository).deleteById("1");
    }

    @Test
    void testGetGamesByPriceRange() {
        List<Games> games = Arrays.asList(testGame);
        when(gamesRepository.findByPriceBetween(20.0, 50.0)).thenReturn(games);

        List<Games> result = gamesService.getGamesByPriceRange(20.0, 50.0);

        assertEquals(1, result.size());
        assertEquals(testGame, result.get(0));
        verify(gamesRepository).findByPriceBetween(20.0, 50.0);
    }

    @Test
    void testGetGamesByStatus() {
        List<Games> games = Arrays.asList(testGame);
        when(gamesRepository.findByStatus("Active")).thenReturn(games);

        List<Games> result = gamesService.getGamesByStatus("Active");

        assertEquals(1, result.size());
        assertEquals(testGame, result.get(0));
        verify(gamesRepository).findByStatus("Active");
    }
}
