package com.example.demo.WebController;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpSession;

@Controller
public class WebController {

	@GetMapping("/homepage")
	public String homepage() {
		return "new_homepage";
	}
	
	@GetMapping("/searchpage")
	public String searchpage() {
		return "new_searchpage1";
	}
	
	@GetMapping("/searchpage2")
	public String searchpage2() {
		return "new_searchpage2";
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
