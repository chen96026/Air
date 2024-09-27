package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {

	@RequestMapping("/register")
	public String reg() {
		return "register";
	}
	

	@RequestMapping("/update")
	public String upd() {
		return "update";
	}
	
	@RequestMapping("/delete")
	public String del() {
		return "delete";
	}
}
