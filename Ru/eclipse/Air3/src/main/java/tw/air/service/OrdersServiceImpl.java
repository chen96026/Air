package tw.air.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Currency;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.sql.Timestamp;
import java.text.NumberFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.air.model.Orders;
import tw.air.repository.OrdersRepository; // 假設這是你的資料庫操作類
import tw.air.service.OrdersService;


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
			 
			 Double finalPrice = (Double) row[2];
			 String formattedPrice = formatCurrency(finalPrice);
			 orderMap.put("finalPrice", formattedPrice);
			 
			 Timestamp timestamp = (Timestamp) row[3];
			 LocalDateTime createDate = convertToLocalDateTime(timestamp);
			 orderMap.put("createDate", createDate.format(formatter));
			 
			 
			 ordersWithContact.add(orderMap);
		 }
		 
		return ordersWithContact;
		
	}

	private String formatCurrency(Double price) {
		NumberFormat currencyFormat = NumberFormat.getNumberInstance(Locale.TAIWAN);
		currencyFormat.setMaximumFractionDigits(0);
		return currencyFormat.format(price);
	}

	private LocalDateTime convertToLocalDateTime(Timestamp timestamp) {
		if(timestamp != null) {
			return timestamp.toLocalDateTime();
		}
		return null;
	}

	@Override
	public Orders getOrderByOrderNumber(String orderNumber) {
		return ordersRepository.findByOrderNumber(orderNumber);
	}

	

}
