package com.nie.team7.Gaming_App.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "members")
public class Members {

    @Id
    @Field("_id")
    private String id;

    private String name;
    private Double balance;
    private String phone;

    // Constructors
    public Members() {}

    public Members(String name, Double balance, String phone) {
        this.name = name;
        this.balance = balance;
        this.phone = phone;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getBalance() { return balance; }
    public void setBalance(Double balance) { this.balance = balance; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}
