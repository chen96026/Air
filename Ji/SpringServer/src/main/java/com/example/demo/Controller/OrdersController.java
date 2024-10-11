package com.example.demo.Controller;

import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.demo.Model.Contact;
import com.example.demo.Model.Luggage;
import com.example.demo.Model.Orders;
import com.example.demo.Model.Orders.OrderStatus;
import com.example.demo.Model.Passenger;
import com.example.demo.Model.Plane;
import com.example.demo.Repository.ContactRepository;
import com.example.demo.Service.ContactService;
import com.example.demo.Service.LuggagesService;
import com.example.demo.Service.OrdersService;
import com.example.demo.Service.PassengerService;


@Controller
@RequestMapping("/orders")
public class OrdersController {

	@Autowired
	private OrdersService ordersService;

	@Autowired
	private ContactRepository contactRepository;

	@Autowired
	private ContactService contactService;

	@Autowired
	private PassengerService passengerService;

	@Autowired
	private LuggagesService luggagesService;

	@PostMapping("/createContact")
	public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
		Contact savedContact = contactRepository.save(contact);
		return ResponseEntity.ok(savedContact);
	}

	@PostMapping("/createOrder")
	public ResponseEntity<Object> createOrder(@RequestBody Orders order) {

		if (order.getCreateDate() == null) {
			order.setCreateDate(LocalDateTime.now());
		}
		order.setOrderStatus(OrderStatus.訂單已成立);

		Orders savedOrder = ordersService.saveOrder(order);

		for (Passenger passenger : order.getPassengerList()) {
			passenger.setOrders(savedOrder);
			passengerService.savePassenger(passenger);

			List<Luggage> luggageList = new ArrayList<>();
			for (Luggage luggage : passenger.getLuggageList()) {
				luggage.setPassenger(passenger);
				luggageList.add(luggage);
			}

			if (!luggageList.isEmpty()) {
				luggagesService.saveAllLuggages(luggageList);
			}
		}

		return ResponseEntity.ok(savedOrder);
	}

	@GetMapping("/Complete/{oid}")
	public String getOrderById(@PathVariable("oid") int oid, Model model) {
		Orders order = ordersService.getOrderById(oid);
		if (order == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "訂單未找到"); // 處理未找到訂單的情況
		}

		if (order.getCreateDate() == null) {
			order.setCreateDate(LocalDateTime.now());
		}
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		String formattedCreateDateTime = order.getCreateDate().format(formatter);

		LocalDateTime createDate = order.getCreateDate();
		LocalDateTime adjustedTime = createDate.plusHours(1);
		String payBeforeTime = adjustedTime.format(formatter);

		Contact contact = contactRepository.findByCId(order.getContactId());

		DecimalFormat df = new DecimalFormat("#,###");
		String formattedPrice = df.format(order.getFinalPrice());

		model.addAttribute("order", order);
		model.addAttribute("contactName", contact.getContactName());
		model.addAttribute("contactEmail", contact.getContactEmail());
		model.addAttribute("contactPhone", contact.getContactPhone());
		model.addAttribute("formattedCreateDateTime", formattedCreateDateTime);
		model.addAttribute("payBeforeTime", payBeforeTime + " 前支付款項！");
		model.addAttribute("formattedPrice", formattedPrice);

		return "order_complete";
	}

	@PostMapping("/Toback")
	public ResponseEntity<String> handleEcpayCallback(@RequestParam Map<String, String> params) {
		String orderNumber = params.get("MerchantTradeNo");
		String paymentStatus = params.get("RtnCode");
		String paymentAmount = params.get("TradeAmt");

		if ("1".equals(paymentStatus)) { // 支付成功
			Orders newOrder = new Orders();
			newOrder.setOrderNumber(orderNumber);
			newOrder.setFinalPrice(Double.valueOf(paymentAmount));
			// 其他字段设置...

			ordersService.saveOrder(newOrder);
		}

		return ResponseEntity.ok("OK");
	}

	@GetMapping("/order")
	public String order() {

		return "order";
	}

	@GetMapping("/order_admin")
	public String showOrderAdminPage(Model model) {
		return "back/order_admin"; // 返回 order_admin.html
	}

	// 返回订单数据的 JSON 响应
	@GetMapping("/api/orders")
	@ResponseBody // 将响应体返回为 JSON
	public ResponseEntity<List<Orders>> getOrders() {
		List<Orders> ordersList = ordersService.getAllOrders(); // 获取所有订单信息
		return ResponseEntity.ok(ordersList); // 返回 JSON 数据
	}

}
