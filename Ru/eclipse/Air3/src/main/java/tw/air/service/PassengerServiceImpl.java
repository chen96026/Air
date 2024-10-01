package tw.air.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tw.air.model.Luggage;
import tw.air.model.Passenger;
import tw.air.repository.PassengerRepository;


@Service
public class PassengerServiceImpl implements PassengerService{
	
	@Autowired 
	private PassengerRepository passengerRepository;
	
	@Override
	public Passenger savePassenger(Passenger passenger) {
		return passengerRepository.save(passenger);
	}

	@Override
	public List<Passenger> getAllPassengers() {	
		return passengerRepository.findAll();
	}

	@Override
	public Passenger getPassengerById(Long pid) {
		Passenger passenger =  passengerRepository.findById(pid).orElse(null);
		return passenger;
	}



}
