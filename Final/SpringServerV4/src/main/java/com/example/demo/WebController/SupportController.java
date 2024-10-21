package com.example.demo.WebController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.Model.Member;
import com.example.demo.Repository.MemberRepository;

import jakarta.servlet.http.HttpSession;

@RequestMapping("/")
@Controller
public class SupportController {
	
	@Autowired
	private MemberRepository memberRepository;
	
	
	@GetMapping("/support")
	public String contact(Model model, HttpSession session) {
		
		String getSessionUid = (String) session.getAttribute("userUid");

		if (getSessionUid != null) {
			model.addAttribute("login", true);
			
			Member member = memberRepository.findByUid(getSessionUid);
			model.addAttribute("login", true);
			model.addAttribute("email", member.getEmail());
			
		} else {
			model.addAttribute("login", false);
		}
		
		return "support";
	}

}
