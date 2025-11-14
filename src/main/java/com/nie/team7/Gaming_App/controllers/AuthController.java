package com.nie.team7.Gaming_App.controllers;

import com.nie.team7.Gaming_App.models.AdminUsers;
import com.nie.team7.Gaming_App.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AdminService adminService;

    @PostMapping
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");
        
        Optional<AdminUsers> admin = adminService.loginAdmin(username, password);
        
        if (admin.isPresent()) {
            // For now, return a fake JWT token as specified in the PDF
            return ResponseEntity.ok("fake-jwt-token");
        } else {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> signupRequest) {
        String username = signupRequest.get("username");
        String password = signupRequest.get("password");
        
        if (username == null || username.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Username is required");
        }
        
        if (password == null || password.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Password is required");
        }
        
        // Check if username already exists
        Optional<AdminUsers> existingAdmin = adminService.getAdminByUsername(username);
        if (existingAdmin.isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        
        // Create new admin
        AdminUsers newAdmin = new AdminUsers(username, password);
        AdminUsers createdAdmin = adminService.createAdmin(newAdmin);
        
        return ResponseEntity.ok(createdAdmin);
    }
}