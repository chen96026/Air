package tw.air.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.air.model.Passenger;

public interface PassengerRepository extends JpaRepository<Passenger, Long>{

}
