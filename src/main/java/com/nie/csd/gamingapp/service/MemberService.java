package com.nie.csd.gamingapp.service;

import com.nie.csd.gamingapp.model.Member;
import com.nie.csd.gamingapp.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
    public Member createMember(Member member){
        if(memberRepository.existsByPhone(member.getPhone())){
            throw new RuntimeException("Phone number already exists");
        }
        member.setBalance((member.getBalance()==0? 0.0 : member.getBalance()));
        return memberRepository.save(member);
    }
    public List<Member> getAllMembers(){
        return memberRepository.findAll();
    }
    public Member getMemberById(String id){
        return memberRepository.findById(id).orElse(null);
    }
    public Optional<Member> getMemberByPhone(String phone){
        return memberRepository.findByPhone(phone);
    }
    public Member updateMember(Member member){
        return memberRepository.save(member);
    }
    public void deleteMemberById(String id){
        memberRepository.deleteById(id);
    }
}
