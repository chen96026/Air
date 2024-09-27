package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Member;
import com.example.demo.model.ResponseMember;
import com.example.demo.service.MemberService;


@RequestMapping("/member")
@RestController
public class MemberController {

	@Autowired
	private MemberService memberService;

	@PostMapping("/register")
	public ResponseMember register(@RequestBody Member member) {
		return memberService.registerMember(member);
	}

	@PostMapping("/login")
	public ResponseMember login(@RequestBody Member member) {
		return memberService.loginMember(member);
	}

	@PutMapping("/update")
	public ResponseMember update(@RequestBody Member member) {
		return memberService.updateMember(member);
	}
	
	@DeleteMapping("/delete/{id}")
	public String delete(@PathVariable Long id) {
		memberService.deleteMember(id);
		return "已刪除";
	}

	@GetMapping("/isexist/{account}")
	public ResponseMember  isExist(@PathVariable String account) {
		return memberService.isExistMember(account);
		
	}
}
