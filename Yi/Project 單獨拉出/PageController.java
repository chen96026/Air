package com.example.demo;

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
	
	@RequestMapping("/member_info")
    public String memberPage() {
        return "member_info";
    }
	
	@RequestMapping("/member_forum")
    public String member_forumPage() {
        return "member_forum";
    }
	
	@RequestMapping("/member_order")
    public String member_orderPage() {
        return "member_order";
    }
	
}
