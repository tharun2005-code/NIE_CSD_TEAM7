package com.nie.csd.gamingapp.service;

import com.nie.csd.gamingapp.model.AdminUser;
import com.nie.csd.gamingapp.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminUserService {

    @Autowired
    private AdminUserRepository adminUserRepository;

    public AdminUser registerAdmin(String username, String password) {
        AdminUser user = new AdminUser(username, password);
        return adminUserRepository.save(user);
    }

    public boolean login(String username, String password) {
        return adminUserRepository.findByUsername(username)
                .map(user -> user.getPassword().equals(password))
                .orElse(false);
    }
}
