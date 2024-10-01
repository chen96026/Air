package tw.air.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tw.air.model.Passenger;
import tw.air.service.PassengerService;

@RequestMapping("/passenger")
@RestController
public class PassengerController {

	@Autowired
	private PassengerService passengerService;

	@PostMapping("/createpassenger")
	public ResponseEntity<Passenger> createPassenger(@RequestBody Passenger passenger) {
	    if (passenger.getContactId() == null) {
	        return ResponseEntity.badRequest().body(null); // 返回 400 錯誤
	    }
	    try {
	        Passenger savedPassenger = passengerService.savePassenger(passenger);
	        return ResponseEntity.ok(savedPassenger);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}

	@GetMapping("/getpassenger")
	public List<Passenger> getAllPassenger() {
		return passengerService.getAllPassengers();

	}

}