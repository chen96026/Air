package com.example.demo.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Orders;
import com.example.demo.Repository.OrdersRepository;

@Service
public class OrdersServiceImpl implements OrdersService{
	
	@Autowired
	private OrdersRepository ordersRepository;

	@Override
	public Orders saveOrder(Orders order) {
		return ordersRepository.save(order);
	}

	@Override
	public List<Orders> getAllOrders() {
		return ordersRepository.findAll();
	}

	@Override
	public Orders getOrderById(long oid) {
		return ordersRepository.findById(oid).orElse(null);
	}

	@Override
	public List<Map<String, Object>> getOrdersWithContactName() {
		 List<Object[]> results = ordersRepository.findOrdersWithContactName();
		 List<Map<String, Object>> ordersWithContact = new ArrayList<>();
		 
		 DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		 
		 for(Object[] row : results) {
			 Map<String, Object> orderMap = new HashMap<>();
			 orderMap.put("orderNumber", row[0]);
			 orderMap.put("contactName", row[1]);
			 orderMap.put("finalPrice", row[2]);
			 
			 LocalDateTime createDate = (LocalDateTime) row[3];
			 String formattedDate = createDate.format(formatter);
			 orderMap.put("createDate", row[3]);
			 ordersWithContact.add(orderMap);
		 }
		return ordersWithContact;	
	}
}
