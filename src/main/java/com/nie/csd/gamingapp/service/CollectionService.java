package com.nie.csd.gamingapp.service;

import com.nie.csd.gamingapp.model.Collection;
import com.nie.csd.gamingapp.repository.CollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CollectionService {

    @Autowired
    private CollectionRepository collectionRepository;

    public void addToCollection(Double amount) {
        Date today = new Date();
        // Normalize date to only YYYY-MM-DD
        today = new java.sql.Date(today.getTime());

        Optional<Collection> existing = collectionRepository.findByDate(today);

        if (existing.isPresent()) {
            Collection col = existing.get();
            col.setAmount(col.getAmount() + amount);
            collectionRepository.save(col);
        } else {
            Collection col = new Collection();
            col.setDate(today);
            col.setAmount(amount);
            collectionRepository.save(col);
        }
    }

    public List<Collection> getAllCollections() {
        return collectionRepository.findAll();
    }
}
