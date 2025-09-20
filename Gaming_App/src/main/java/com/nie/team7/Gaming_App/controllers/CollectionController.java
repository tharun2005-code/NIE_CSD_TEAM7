package com.nie.team7.Gaming_App.controllers;

import com.nie.team7.Gaming_App.models.Collections;
import com.nie.team7.Gaming_App.services.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/collections")
@CrossOrigin(origins = "*")
public class CollectionController {

    @Autowired
    private CollectionService collectionService;

    @GetMapping
    public ResponseEntity<List<Collections>> getAllCollections() {
        List<Collections> collections = collectionService.getAllCollections();
        return ResponseEntity.ok(collections);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Collections> getCollectionById(@PathVariable String id) {
        Optional<Collections> collection = collectionService.getCollectionById(id);
        return collection.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Collections> createCollection(@RequestBody Collections collection) {
        Collections createdCollection = collectionService.createCollection(collection);
        return ResponseEntity.ok(createdCollection);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Collections> updateCollection(@PathVariable String id, @RequestBody Collections collection) {
        Collections updatedCollection = collectionService.updateCollection(id, collection);
        return ResponseEntity.ok(updatedCollection);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCollection(@PathVariable String id) {
        collectionService.deleteCollection(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<Collections>> getCollectionsByMemberId(@PathVariable String memberId) {
        List<Collections> collections = collectionService.getCollectionsByMemberId(memberId);
        return ResponseEntity.ok(collections);
    }

    @GetMapping("/game/{gameId}")
    public ResponseEntity<List<Collections>> getCollectionsByGameId(@PathVariable String gameId) {
        List<Collections> collections = collectionService.getCollectionsByGameId(gameId);
        return ResponseEntity.ok(collections);
    }
}
