package tw.air.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.air.model.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long>{

}
