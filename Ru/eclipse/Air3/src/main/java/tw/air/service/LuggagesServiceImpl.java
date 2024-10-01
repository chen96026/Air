package tw.air.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tw.air.model.Luggage;
import tw.air.repository.LuggagesRepository;


@Service
public class LuggagesServiceImpl implements LuggagesService{
	
	@Autowired
	private LuggagesRepository luggagesRepository;
	
	@Override
    public List<Luggage> saveAllLuggages(List<Luggage> luggageList) {
        return luggagesRepository.saveAll(luggageList);
    }

	@Override
	public List<Luggage> getAllLuggages() {
		return luggagesRepository.findAll();
	}

	@Override
	public Luggage getLuggageById(Long lid) {
		return luggagesRepository.findById(lid).orElse(null);
	}

	@Override
	public List<Luggage> getLuggagesByPassengerId(Long pid) {
		return luggagesRepository.findByPassengerPid(pid);
	}

}
