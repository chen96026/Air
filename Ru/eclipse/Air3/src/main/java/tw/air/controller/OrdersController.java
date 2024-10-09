package tw.air.controller;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.RequestBody;
import tw.air.model.Contact;
import tw.air.model.Luggage;
import tw.air.model.Orders;
import tw.air.model.Passenger;
import tw.air.repository.ContactRepository;
import tw.air.service.ContactService;
import tw.air.service.LuggagesService;
import tw.air.service.OrdersService;
import tw.air.service.PassengerService;

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
	public ResponseEntity<Object> createOrder(@RequestBody Orders order){
	    
	    if (order.getCreateDate() == null) {
	        order.setCreateDate(LocalDateTime.now());
	    }
	    
	    Orders savedOrder = ordersService.saveOrder(order);
	    
	    for(Passenger passenger : order.getPassengerList()) {
	    	passenger.setOrders(savedOrder);
	    	passengerService.savePassenger(passenger);
	    	
	    	List<Luggage> luggageList = new ArrayList<>();
	    	for(Luggage luggage : passenger.getLuggageList()) {
		    	luggage.setPassenger(passenger);
		    	luggageList.add(luggage);
		    }
	    	
	    	if(!luggageList.isEmpty()) {
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
	    
	    
	    return "orderComplete";
	}
	
	
	
	@GetMapping("/Toback")
	@ResponseBody
	public List<Map<String, Object>> getOrdersWithContactName(){
		return ordersService.getOrdersWithContactName();
		
	}

}
