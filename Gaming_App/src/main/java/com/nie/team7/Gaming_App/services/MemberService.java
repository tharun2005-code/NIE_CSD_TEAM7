package com.nie.team7.Gaming_App.services;

import com.nie.team7.Gaming_App.models.Members;
import com.nie.team7.Gaming_App.repositories.MembersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    @Autowired
    private MembersRepository membersRepository;

    public List<Members> getAllMembers() {
        return membersRepository.findAll();
    }

    public Optional<Members> getMemberById(String id) {
        return membersRepository.findById(id);
    }

    public Members createMember(Members member) {
        return membersRepository.save(member);
    }

    public Members updateMember(String id, Members member) {
        member.setId(id);
        return membersRepository.save(member);
    }

    public void deleteMember(String id) {
        membersRepository.deleteById(id);
    }

    public Optional<Members> getMemberByPhone(String phone) {
        return membersRepository.findByPhone(phone);
    }

    public Double getMemberBalance(String memberId) {
        Optional<Members> member = membersRepository.findById(memberId);
        return member.map(Members::getBalance).orElse(0.0);
    }

    public Members updateMemberBalance(String memberId, Double newBalance) {
        Optional<Members> memberOpt = membersRepository.findById(memberId);
        if (memberOpt.isPresent()) {
            Members member = memberOpt.get();
            member.setBalance(newBalance);
            return membersRepository.save(member);
        }
        return null;
    }
}
