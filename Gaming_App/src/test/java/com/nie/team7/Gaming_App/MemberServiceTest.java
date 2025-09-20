package com.nie.team7.Gaming_App;

import com.nie.team7.Gaming_App.models.Members;
import com.nie.team7.Gaming_App.repositories.MembersRepository;
import com.nie.team7.Gaming_App.services.MemberService;
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
class MemberServiceTest {

    @Mock
    private MembersRepository membersRepository;

    @InjectMocks
    private MemberService memberService;

    private Members testMember;

    @BeforeEach
    void setUp() {
        testMember = new Members();
        testMember.setId("1");
        testMember.setName("Test User");
        testMember.setPhone("9876543210");
        testMember.setBalance(100.0);
    }

    @Test
    void testGetAllMembers() {
        List<Members> members = Arrays.asList(testMember);
        when(membersRepository.findAll()).thenReturn(members);

        List<Members> result = memberService.getAllMembers();

        assertEquals(1, result.size());
        assertEquals(testMember, result.get(0));
        verify(membersRepository).findAll();
    }

    @Test
    void testGetMemberById() {
        when(membersRepository.findById("1")).thenReturn(Optional.of(testMember));

        Optional<Members> result = memberService.getMemberById("1");

        assertTrue(result.isPresent());
        assertEquals(testMember, result.get());
        verify(membersRepository).findById("1");
    }

    @Test
    void testCreateMember() {
        when(membersRepository.save(any(Members.class))).thenReturn(testMember);

        Members result = memberService.createMember(testMember);

        assertEquals(testMember, result);
        verify(membersRepository).save(testMember);
    }

    @Test
    void testUpdateMember() {
        when(membersRepository.save(any(Members.class))).thenReturn(testMember);

        Members result = memberService.updateMember("1", testMember);

        assertEquals(testMember, result);
        verify(membersRepository).save(testMember);
    }

    @Test
    void testDeleteMember() {
        doNothing().when(membersRepository).deleteById("1");

        memberService.deleteMember("1");

        verify(membersRepository).deleteById("1");
    }

    @Test
    void testGetMemberByPhone() {
        when(membersRepository.findByPhone("9876543210"))
                .thenReturn(Optional.of(testMember));

        Optional<Members> result = memberService.getMemberByPhone("9876543210");

        assertTrue(result.isPresent());
        assertEquals(testMember, result.get());
        verify(membersRepository).findByPhone("9876543210");
    }

    @Test
    void testGetMemberBalance() {
        when(membersRepository.findById("1")).thenReturn(Optional.of(testMember));

        Double balance = memberService.getMemberBalance("1");

        assertEquals(100.0, balance);
        verify(membersRepository).findById("1");
    }
}
