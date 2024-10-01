package tw.air.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tw.air.model.Luggage;
import tw.air.model.Orders;
import tw.air.model.Passenger;
import tw.air.service.LuggagesService;
import tw.air.service.OrdersService;
import tw.air.service.PassengerService;


@RestController
@RequestMapping("/luggage")
public class LuggagesController {
	
	@Autowired
	public LuggagesService luggagesService;
	
	@Autowired
	public PassengerService passengerService;
	
	@Autowired
	public OrdersService ordersService;
	
	
	@PostMapping("/createluggages")
	public List<Luggage> createLuggages(@RequestBody List<Luggage> luggageList) {
	    for (Luggage luggage : luggageList) {
	        Passenger passenger = passengerService.getPassengerById(luggage.getPassenger().getPid());
	        Orders orders = ordersService.getOrderById(luggage.getOrders().getOid());  // 確保這裡的 oid 是有效的
	        luggage.setPassenger(passenger);
	        luggage.setOrders(orders); // 將 orders 設置為查詢到的 orders
	    }
	    
	    List<Luggage> savedLuggageList = luggagesService.saveAllLuggages(luggageList);
	    return savedLuggageList;
	}
	
	@GetMapping("/getluggages")
	public List<Luggage> getAllLuggages(){
		return luggagesService.getAllLuggages();
	}
	
	
	@GetMapping("/{lid}")
	public Luggage getLuggageById(@PathVariable Long lid) {
		return luggagesService.getLuggageById(lid);
	}
	
	
	@GetMapping("/passenger/{pid}")
	public List<Luggage> getLuggagesByPassengerId(@PathVariable Long pid){
		return luggagesService.getLuggagesByPassengerId(pid);
	}
	
	

}
