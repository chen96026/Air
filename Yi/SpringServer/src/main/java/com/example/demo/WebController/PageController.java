package com.example.demo.WebController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {

	@RequestMapping("/register")
	public String registerpage() {
		return "member_register";
	}
	
	@RequestMapping("/login")
	public String loginpage() {
		return "member_login";
	}
	
	@RequestMapping("/member_page")
	public String member_page() {
		return "member_page";
	}
	
	@RequestMapping("/return_member")
	public String return_member() {
		return "Member";
	}
	
	@RequestMapping("/order")
	public String order() {
		return "order";
	}
	
}
