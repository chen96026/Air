package com.example.demo.WebController;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class WebController {
	
	@GetMapping("/main_page")
	public String main_page() {
		return "main_page";
	}
	
	@GetMapping("/search_page")
	public String search_page(@RequestParam(value = "openBtnValue", required = false) String openBtnValue, Model model) {
		if (openBtnValue != null) {
	        model.addAttribute("openBtnValue", openBtnValue);
	    }
		return "search_page";
	}
	
	@GetMapping("/search_page2")
	public String search_page2() {
		return "search_page2";
	}
	
	@GetMapping("/member_page")
	public String member_page() {
		return "member_page";
	}
	
	@GetMapping("/forum_page")
	public String forum_page() {
		return "forum_page";
	}
	
	@GetMapping("/forum_page_detail")
	public String forum_page_detail() {
		return "forum_page_detail";
	}
	
	@GetMapping("/forum_page_edit")
	public String forum_page_edit() {
		return "forum_page_edit";
	}
	
	@GetMapping("/order")
	public String order() {
		return "order";
	}
	
	@GetMapping("/order_back")
	public String order_back() {
		return "/back/order_admin";
	}
	
	
}