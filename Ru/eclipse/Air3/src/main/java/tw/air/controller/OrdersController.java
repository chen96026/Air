package tw.air.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestBody;
import tw.air.model.Contact;
import tw.air.model.Orders;
import tw.air.repository.ContactRepository;
import tw.air.service.ContactService;
import tw.air.service.OrdersService;

@RestController
@RequestMapping("/orders")
public class OrdersController {
	
	@Autowired
	private OrdersService ordersService;
	
	@Autowired
	private ContactRepository contactRepository;
	
	@Autowired
	private ContactService contactService;
	
	@PostMapping("/createContact")
	public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
	    Contact savedContact = contactRepository.save(contact);
	    return ResponseEntity.ok(savedContact); // 確保這裡返回的對象包含 CId
	}
	
	@PostMapping("/createOrder")
	public ResponseEntity<Object> createOrder(@RequestBody Orders order) {
		System.out.println("Received order data: " + order);
		// 檢查聯絡人是否存在
	    if (order.getContact() == null || order.getContact().getCId() == null) {
	        return ResponseEntity.badRequest().body("Contact ID is required");
	    }

	    // 根據聯絡人 ID 查找聯絡人
	    Contact contact = contactRepository.findById(order.getContact().getCId())
	            .orElseThrow(() -> new RuntimeException("Contact not found"));

	    order.setContact(contact); // 將查詢到的聯絡人設置到訂單中

	    // 保存訂單
	    Orders savedOrder = ordersService.saveOrder(order);
	    return ResponseEntity.ok(savedOrder); // 返回成功的訂單資料
	}
	
	@GetMapping("/getOrder")
    public List<Orders> getAllOrders() {
        return ordersService.getAllOrders(); 
    }
	
	@GetMapping("/{id}")
	public Orders getOrderById(@PathVariable int id) {
	    return ordersService.getOrderById(id);
	}
		

}
