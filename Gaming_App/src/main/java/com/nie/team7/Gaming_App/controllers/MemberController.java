package com.nie.team7.Gaming_App.controllers;

import com.nie.team7.Gaming_App.models.Members;
import com.nie.team7.Gaming_App.services.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "*")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping
    public ResponseEntity<List<Members>> getAllMembers() {
        List<Members> members = memberService.getAllMembers();
        return ResponseEntity.ok(members);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Members> getMemberById(@PathVariable String id) {
        Optional<Members> member = memberService.getMemberById(id);
        return member.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Members> createMember(@RequestBody Members member) {
        Members createdMember = memberService.createMember(member);
        return ResponseEntity.ok(createdMember);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Members> updateMember(@PathVariable String id, @RequestBody Members member) {
        Members updatedMember = memberService.updateMember(id, member);
        return ResponseEntity.ok(updatedMember);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable String id) {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Members> loginMember(@RequestBody Members loginRequest) {
        Optional<Members> member = memberService.loginMember(loginRequest.getUsername(), loginRequest.getPassword());
        return member.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/balance")
    public ResponseEntity<Double> getMemberBalance(@PathVariable String id) {
        Double balance = memberService.getMemberBalance(id);
        return ResponseEntity.ok(balance);
    }
}
