package tw.air.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.air.model.Luggage;

public interface LuggagesRepository extends JpaRepository<Luggage, Long>{
	List<Luggage> findByPassengerPid(Long pid);
}
