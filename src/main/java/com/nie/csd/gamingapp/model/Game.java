package com.nie.csd.gamingapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "games")
public class Game {
    @Id
    private String id;
    private String name;
    private Double price;
    private double costPerHour;

    public Game () {}

    public Game(String id, String name, double costPerHour,double price) {
        this.id = id;
        this.name = name;
        this.costPerHour = costPerHour;
        this.price = price;
    }

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

    public double getCostPerHour() {
        return costPerHour;
    }

    public void setCostPerHour(double costPerHour) {
        this.costPerHour = costPerHour;
    }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

}
