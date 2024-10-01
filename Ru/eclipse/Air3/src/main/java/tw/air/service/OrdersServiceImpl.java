package tw.air.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.air.model.Orders;
import tw.air.repository.OrdersRepository; // 假設這是你的資料庫操作類
import tw.air.service.OrdersService;


@Service
public class OrdersServiceImpl implements OrdersService{
	
	@Autowired
	private OrdersRepository ordersRepository;

	@Override
	public Orders saveOrder(Orders order) {
		return ordersRepository.save(order);
	}

	@Override
	public List<Orders> getAllOrders() {
		return ordersRepository.findAll();
	}

	@Override
	public Orders getOrderById(long oid) {
		Optional<Orders> orderOptional = ordersRepository.findById(oid);
		return orderOptional.orElse(null);
	}

	

}
