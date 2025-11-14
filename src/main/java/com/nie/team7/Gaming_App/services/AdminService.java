package com.nie.team7.Gaming_App.services;

import com.nie.team7.Gaming_App.models.AdminUsers;
import com.nie.team7.Gaming_App.repositories.AdminUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminUsersRepository adminUsersRepository;

    public List<AdminUsers> getAllAdmins() {
        return adminUsersRepository.findAll();
    }

    public Optional<AdminUsers> getAdminById(String id) {
        return adminUsersRepository.findById(id);
    }

    public AdminUsers createAdmin(AdminUsers admin) {
        return adminUsersRepository.save(admin);
    }

    public AdminUsers updateAdmin(String id, AdminUsers admin) {
        admin.setId(id);
        return adminUsersRepository.save(admin);
    }

    public void deleteAdmin(String id) {
        adminUsersRepository.deleteById(id);
    }

    public Optional<AdminUsers> loginAdmin(String username, String password) {
        return adminUsersRepository.findByUsernameAndPassword(username, password);
    }

    public Optional<AdminUsers> getAdminByUsername(String username) {
        return adminUsersRepository.findByUsername(username);
    }
}
