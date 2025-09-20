package com.nie.csd.gamingapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "admin_users")
public class AdminUser {
    @Id
    private String id;
    private String username;
    private String password; // plain text for simplicity

    public AdminUser() {}

    public AdminUser(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
