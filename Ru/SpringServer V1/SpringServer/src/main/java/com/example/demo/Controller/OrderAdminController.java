package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Orders;
import com.example.demo.Service.OrdersService;

@RestController
@RequestMapping("/orders")
public class OrderAdminController {
	
	@Autowired
	private OrdersService ordersService;

	@GetMapping("/order_admin")
	public List<Orders> showOrderAdminPage(Model model) {
		List<Orders> orderList = ordersService.getAllOrders();
		return orderList; 
	}

}
