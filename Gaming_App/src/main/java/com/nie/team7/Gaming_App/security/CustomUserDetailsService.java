package com.nie.team7.Gaming_App.security;

import com.nie.team7.Gaming_App.models.AdminUsers;
import com.nie.team7.Gaming_App.models.Members;
import com.nie.team7.Gaming_App.services.AdminService;
import com.nie.team7.Gaming_App.services.MemberService;
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

    @Autowired
    private MemberService memberService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Try to find admin user first
        Optional<AdminUsers> adminUser = adminService.getAdminByUsername(username);
        if (adminUser.isPresent()) {
            AdminUsers admin = adminUser.get();
            return new User(admin.getUsername(), admin.getPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));
        }

        // Try to find member user
        Optional<Members> memberUser = memberService.getMemberByUsername(username);
        if (memberUser.isPresent()) {
            Members member = memberUser.get();
            return new User(member.getUsername(), member.getPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_MEMBER")));
        }

        throw new UsernameNotFoundException("User not found with username: " + username);
    }
}
