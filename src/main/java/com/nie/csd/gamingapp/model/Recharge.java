package com.nie.csd.gamingapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document("recharges")
public class Recharge {
    @Id
    private String id;
    private String memberId;
    private Double amount;
    private Date dateTime = new Date();

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getMemberId() { return memberId; }
    public void setMemberId(String memberId) { this.memberId = memberId; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public Date getDateTime() { return dateTime; }
    public void setDateTime(Date dateTime) { this.dateTime = dateTime; }
}
