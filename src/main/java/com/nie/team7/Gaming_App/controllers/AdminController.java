package com.nie.team7.Gaming_App.controllers;

import com.nie.team7.Gaming_App.models.AdminUsers;
import com.nie.team7.Gaming_App.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public ResponseEntity<List<AdminUsers>> getAllAdmins() {
        List<AdminUsers> admins = adminService.getAllAdmins();
        return ResponseEntity.ok(admins);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminUsers> getAdminById(@PathVariable String id) {
        Optional<AdminUsers> admin = adminService.getAdminById(id);
        return admin.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<AdminUsers> createAdmin(@RequestBody AdminUsers admin) {
        AdminUsers createdAdmin = adminService.createAdmin(admin);
        return ResponseEntity.ok(createdAdmin);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminUsers> updateAdmin(@PathVariable String id, @RequestBody AdminUsers admin) {
        AdminUsers updatedAdmin = adminService.updateAdmin(id, admin);
        return ResponseEntity.ok(updatedAdmin);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable String id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<AdminUsers> loginAdmin(@RequestBody AdminUsers loginRequest) {
        Optional<AdminUsers> admin = adminService.loginAdmin(loginRequest.getUsername(), loginRequest.getPassword());
        return admin.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
}
