package tw.air.service;

import java.util.List;

import tw.air.model.Orders;

public interface OrdersService {
	
	public Orders saveOrder(Orders order);
	
	public List<Orders> getAllOrders();
	
	public Orders getOrderById(long id);
	


}
