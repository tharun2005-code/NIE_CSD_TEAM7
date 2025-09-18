package com.nie.csd.gamingapp.controller;

import com.nie.csd.gamingapp.model.Member;
import com.nie.csd.gamingapp.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    //Create memeber
    @PostMapping
    public Member createMember(@RequestBody Member member) {
        return memberService.createMember(member);
    }

    //Get All Members
    @GetMapping
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }

    //Get Member by ID
    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable String id) {
        Member member = memberService.getMemberById(id);
        if(member!=null) {
            return ResponseEntity.ok(member);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    //Get Member By Phone
    @GetMapping("/search")
    public Optional<Member> getMemberByPhone(@RequestParam String phone) {
        return memberService.getMemberByPhone(phone);
    }

    //Delete Member by Id
    @DeleteMapping("/{id}")
    public void deleteMemberById(@PathVariable String id) {
        memberService.deleteMemberById(id);
    }
}
