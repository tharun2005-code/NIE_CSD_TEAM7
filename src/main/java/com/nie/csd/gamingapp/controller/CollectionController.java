package com.nie.csd.gamingapp.controller;

import com.nie.csd.gamingapp.model.Collection;
import com.nie.csd.gamingapp.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/collections")
public class CollectionController {

    @Autowired
    private CollectionService collectionService;

    @GetMapping
    public List<Collection> getAllCollections() {
        return collectionService.getAllCollections();
    }
}
