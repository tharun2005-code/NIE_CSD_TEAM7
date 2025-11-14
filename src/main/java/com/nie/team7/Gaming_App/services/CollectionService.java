package com.nie.team7.Gaming_App.services;

import com.nie.team7.Gaming_App.models.Collections;
import com.nie.team7.Gaming_App.repositories.CollectionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Date;

@Service
public class CollectionService {

    @Autowired
    private CollectionsRepository collectionsRepository;

    public List<Collections> getAllCollections() {
        return collectionsRepository.findAll();
    }

    public Optional<Collections> getCollectionById(String id) {
        return collectionsRepository.findById(id);
    }

    public Collections createCollection(Collections collection) {
        return collectionsRepository.save(collection);
    }

    public Collections updateCollection(String id, Collections collection) {
        collection.setId(id);
        return collectionsRepository.save(collection);
    }

    public void deleteCollection(String id) {
        collectionsRepository.deleteById(id);
    }

    public List<Collections> getCollectionsByDate(Date date) {
        return collectionsRepository.findByDate(date);
    }

    public List<Collections> getCollectionsByDateRange(Date startDate, Date endDate) {
        return collectionsRepository.findByDateBetween(startDate, endDate);
    }
}
