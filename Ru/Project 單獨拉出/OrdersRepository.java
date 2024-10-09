package tw.air.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import tw.air.model.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long>{
	@Query(value = "SELECT o.order_number, c.contactName, o.finalprice, o.createDate " +
		            "FROM order_information o " +
		            "JOIN contact_information c ON o.contact_id = c.CId", 
            nativeQuery = true)
	List<Object[]> findOrdersWithContactName();
}
