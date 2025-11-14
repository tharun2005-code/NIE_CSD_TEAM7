package com.nie.team7.Gaming_App.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "admin_users")
public class AdminUsers {

    @Id
    @Field("_id")
    private String id;

    private String username;
    private String password;

    // Constructors
    public AdminUsers() {}

    public AdminUsers(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
