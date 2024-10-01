package tw.air.service;

import java.util.List;

import tw.air.model.Luggage;

public interface LuggagesService {
	
	
	public List<Luggage> saveAllLuggages(List<Luggage> luggageList);
	
    public List<Luggage> getAllLuggages();
	
	public Luggage getLuggageById(Long lid);
	
	public List<Luggage> getLuggagesByPassengerId(Long pid);

}
