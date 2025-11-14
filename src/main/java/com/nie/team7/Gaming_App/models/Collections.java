package com.nie.team7.Gaming_App.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Document(collection = "collections")
public class Collections {

    @Id
    @Field("_id")
    private String id;

    private Date date;
    private Double amount;

    // Constructors
    public Collections() {}

    public Collections(Date date, Double amount) {
        this.date = date;
        this.amount = amount;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
}
