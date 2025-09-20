package com.nie.team7.Gaming_App.models;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.annotation.Id;

@Document(collection = "games")
public class Games {

    @Id
    @Field("_id")
    private String id;

    private String name;
    private Double price;
    private String description;
    private Integer duration;              // duration in minutes
    private String status;                 // e.g., "active", "inactive"
    private Integer minPlayerCount;
    private Integer maxPlayerCount;
    private Integer playerCountMultiple;

    // Constructors
    public Games() {}

    public Games(String name, Double price, String description, Integer duration,
                 String status, Integer minPlayerCount, Integer maxPlayerCount,
                 Integer playerCountMultiple) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.duration = duration;
        this.status = status;
        this.minPlayerCount = minPlayerCount;
        this.maxPlayerCount = maxPlayerCount;
        this.playerCountMultiple = playerCountMultiple;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getMinPlayerCount() {
        return minPlayerCount;
    }

    public void setMinPlayerCount(Integer minPlayerCount) {
        this.minPlayerCount = minPlayerCount;
    }

    public Integer getMaxPlayerCount() {
        return maxPlayerCount;
    }

    public void setMaxPlayerCount(Integer maxPlayerCount) {
        this.maxPlayerCount = maxPlayerCount;
    }

    public Integer getPlayerCountMultiple() {
        return playerCountMultiple;
    }

    public void setPlayerCountMultiple(Integer playerCountMultiple) {
        this.playerCountMultiple = playerCountMultiple;
    }
}