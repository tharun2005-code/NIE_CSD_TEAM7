package com.nie.team7.Gaming_App;

import com.nie.team7.Gaming_App.models.AdminUsers;
import com.nie.team7.Gaming_App.repositories.AdminUsersRepository;
import com.nie.team7.Gaming_App.services.AdminService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminServiceTest {

    @Mock
    private AdminUsersRepository adminUsersRepository;

    @InjectMocks
    private AdminService adminService;

    private AdminUsers testAdmin;

    @BeforeEach
    void setUp() {
        testAdmin = new AdminUsers();
        testAdmin.setId("1");
        testAdmin.setUsername("admin");
        testAdmin.setPassword("admin123");
    }

    @Test
    void testGetAllAdmins() {
        List<AdminUsers> admins = Arrays.asList(testAdmin);
        when(adminUsersRepository.findAll()).thenReturn(admins);

        List<AdminUsers> result = adminService.getAllAdmins();

        assertEquals(1, result.size());
        assertEquals(testAdmin, result.get(0));
        verify(adminUsersRepository).findAll();
    }

    @Test
    void testGetAdminById() {
        when(adminUsersRepository.findById("1")).thenReturn(Optional.of(testAdmin));

        Optional<AdminUsers> result = adminService.getAdminById("1");

        assertTrue(result.isPresent());
        assertEquals(testAdmin, result.get());
        verify(adminUsersRepository).findById("1");
    }

    @Test
    void testCreateAdmin() {
        when(adminUsersRepository.save(any(AdminUsers.class))).thenReturn(testAdmin);

        AdminUsers result = adminService.createAdmin(testAdmin);

        assertEquals(testAdmin, result);
        verify(adminUsersRepository).save(testAdmin);
    }

    @Test
    void testUpdateAdmin() {
        when(adminUsersRepository.save(any(AdminUsers.class))).thenReturn(testAdmin);

        AdminUsers result = adminService.updateAdmin("1", testAdmin);

        assertEquals(testAdmin, result);
        verify(adminUsersRepository).save(testAdmin);
    }

    @Test
    void testDeleteAdmin() {
        doNothing().when(adminUsersRepository).deleteById("1");

        adminService.deleteAdmin("1");

        verify(adminUsersRepository).deleteById("1");
    }

    @Test
    void testLoginAdmin() {
        when(adminUsersRepository.findByUsernameAndPassword("admin", "admin123"))
                .thenReturn(Optional.of(testAdmin));

        Optional<AdminUsers> result = adminService.loginAdmin("admin", "admin123");

        assertTrue(result.isPresent());
        assertEquals(testAdmin, result.get());
        verify(adminUsersRepository).findByUsernameAndPassword("admin", "admin123");
    }

    @Test
    void testGetAdminByUsername() {
        when(adminUsersRepository.findByUsername("admin")).thenReturn(Optional.of(testAdmin));

        Optional<AdminUsers> result = adminService.getAdminByUsername("admin");

        assertTrue(result.isPresent());
        assertEquals(testAdmin, result.get());
        verify(adminUsersRepository).findByUsername("admin");
    }
}
