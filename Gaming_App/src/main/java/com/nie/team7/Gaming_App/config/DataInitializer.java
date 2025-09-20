package com.nie.team7.Gaming_App.config;

import com.nie.team7.Gaming_App.models.AdminUsers;
import com.nie.team7.Gaming_App.models.Games;
import com.nie.team7.Gaming_App.repositories.AdminUsersRepository;
import com.nie.team7.Gaming_App.repositories.GamesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AdminUsersRepository adminUsersRepository;
    
    @Autowired
    private GamesRepository gamesRepository;

    @Override
    public void run(String... args) throws Exception {
        // Create default admin user if it doesn't exist
        if (adminUsersRepository.findByUsername("admin").isEmpty()) {
            AdminUsers defaultAdmin = new AdminUsers();
            defaultAdmin.setUsername("admin");
            defaultAdmin.setPassword("admin");
            adminUsersRepository.save(defaultAdmin);
            System.out.println("Default admin user created: admin/admin");
        }
        
        // Create some sample games if none exist
        if (gamesRepository.count() == 0) {
            Games chess = new Games();
            chess.setName("Chess");
            chess.setPrice(50.0);
            chess.setDescription("2 players needed");
            chess.setStatus("active");
            chess.setMinPlayerCount(2);
            chess.setMaxPlayerCount(2);
            chess.setPlayerCountMultiple(1);
            gamesRepository.save(chess);
            
            Games carrom = new Games();
            carrom.setName("Carrom");
            carrom.setPrice(100.0);
            carrom.setDescription("2-4 players");
            carrom.setStatus("active");
            carrom.setMinPlayerCount(2);
            carrom.setMaxPlayerCount(4);
            carrom.setPlayerCountMultiple(1);
            gamesRepository.save(carrom);
            
            Games foosball = new Games();
            foosball.setName("Foosball");
            foosball.setPrice(150.0);
            foosball.setDescription("Multiple allowed");
            foosball.setStatus("active");
            foosball.setMinPlayerCount(2);
            foosball.setMaxPlayerCount(4);
            foosball.setPlayerCountMultiple(2);
            gamesRepository.save(foosball);
            
            System.out.println("Sample games created");
        }
    }
}