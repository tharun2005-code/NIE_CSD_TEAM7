package com.nie.csd.gamingapp.controller;


import com.nie.csd.gamingapp.model.AdminUser;
import com.nie.csd.gamingapp.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins="http://localhost:3000")
public class AdminUserController {

    @Autowired
    private AdminUserService adminUserService;

    @PostMapping("/register")
    public AdminUser register(@RequestParam String username, @RequestParam String password) {
        return adminUserService.registerAdmin(username, password);
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody(required = false) AdminUser adminUser,
                                     @RequestParam(required = false) String username,
                                     @RequestParam(required = false) String password) {

        String userUsername = (adminUser != null) ? adminUser.getUsername() : username;
        String userPassword = (adminUser != null) ? adminUser.getPassword() : password;

        Map<String, Object> response = new HashMap<>();

        if (userUsername == null || userPassword == null) {
            response.put("success", false);
            response.put("message", "Username and password are required");
            return response;
        }

        boolean success = adminUserService.login(userUsername, userPassword);
        response.put("success", success);
        response.put("message", success ? "Login successful" : "Invalid credentials");
        return response;
    }

}
