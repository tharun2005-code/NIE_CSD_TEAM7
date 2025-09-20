package com.nie.csd.gamingapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "collections")
public class Collection {

    @Id
    private String id;
    private Date date;
    private Double amount;

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
}
