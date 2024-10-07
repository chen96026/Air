package tw.air.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cassandra.CassandraProperties.Request;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tw.air.model.Orders;
import tw.air.model.Orders.PassengerOrderRequest;
import tw.air.model.Passenger;
import tw.air.service.PassengerService;

@RequestMapping("/passenger")
@RestController
public class PassengerController {

	@Autowired
	private PassengerService passengerService;

	@PostMapping("/createpassenger")
	public ResponseEntity<Object> createPassenger(@RequestBody PassengerOrderRequest requestBody) {
	    List<Passenger> passengers = requestBody.getPassengers();
	    Long orderId = requestBody.getOrderId();

	    if (passengers == null || passengers.isEmpty()) {
	        return ResponseEntity.badRequest().body("Passenger list cannot be empty");
	    }

	    // 檢查每個乘客的 contactId 是否存在
	    for (Passenger passenger : passengers) {
	        if (passenger.getContactId() == null) {
	            return ResponseEntity.badRequest().body("Contact ID is required for all passengers");
	        }
	        
	        // 設定 orders 給每個乘客
	        Orders orders = new Orders();
	        orders.setOid(orderId);
	        passenger.setOrders(orders);
	    }

	    try {
	        // 保存乘客資料
	        List<Passenger> savedPassengers = passengerService.savePassengers(passengers);
	        return ResponseEntity.ok(savedPassengers); // 返回成功的乘客資料
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("Internal Server Error: " + e.getMessage());
	    }
	}
	
	
	@GetMapping("/getpassenger")
	public List<Passenger> getAllPassenger() {
		return passengerService.getAllPassengers();

	}

}