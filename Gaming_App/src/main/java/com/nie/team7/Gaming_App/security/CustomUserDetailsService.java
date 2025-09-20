package com.nie.team7.Gaming_App.security;

import com.nie.team7.Gaming_App.models.AdminUsers;
import com.nie.team7.Gaming_App.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminService adminService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Only admin users can login through this service
        Optional<AdminUsers> adminUser = adminService.getAdminByUsername(username);
        if (adminUser.isPresent()) {
            AdminUsers admin = adminUser.get();
            return new User(admin.getUsername(), admin.getPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));
        }

        throw new UsernameNotFoundException("Admin user not found with username: " + username);
    }
}
