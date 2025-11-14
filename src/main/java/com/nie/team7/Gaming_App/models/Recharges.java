package com.nie.team7.Gaming_App.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Document(collection = "recharges")
public class Recharges {

    @Id
    @Field("_id")
    private String id;

    private String memberId;   // Reference to Members
    private Double amount;
    private Date dateTime;

    // Constructors
    public Recharges() {}

    public Recharges(String memberId, Double amount, Date dateTime) {
        this.memberId = memberId;
        this.amount = amount;
        this.dateTime = dateTime;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getMemberId() { return memberId; }
    public void setMemberId(String memberId) { this.memberId = memberId; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public Date getDateTime() { return dateTime; }
    public void setDateTime(Date dateTime) { this.dateTime = dateTime; }
}
