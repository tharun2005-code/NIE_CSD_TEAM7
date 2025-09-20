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
}