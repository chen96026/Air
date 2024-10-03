package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {

//	@RequestMapping("/register")
//	public String registerpage() {
//		return "register";
//	}
	
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
	
	@RequestMapping("/update")
	public String updatepage() {
		return "update";
	}
	
	@RequestMapping("/delete")
	public String deletepage() {
		return "delete";
	}
	

}
