package tw.air.service;

import java.sql.Date;
import java.util.List;

import tw.air.model.Luggage;
import tw.air.model.Passenger;

public interface PassengerService {
	
	public Passenger savePassenger(Passenger passenger);
	
	public List<Passenger> savePassengers(List<Passenger> passengers);
	
	public List<Passenger> getAllPassengers();
	 
	public Passenger getPassengerById(Long pid);
	
//	public void validatePassportExpiry(Date idDate);
//	
//	public void processPassenget(Passenger passenger);
}
