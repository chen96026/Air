package tw.air.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecpay.payment.integration.AllInOne;
import ecpay.payment.integration.domain.AioCheckOutALL;
import tw.air.model.Orders;

@Service
public class EcpayService {
	@Autowired
	private OrdersService ordersService;
	
	public String ecpayCheckout(Long oid) {
		
		//取得訂單編號和金額
		Orders order = ordersService.getOrderById(oid);
		String orderNumber = order.getOrderNumber();
		String orderPrice = String.valueOf(order.getFinalPrice().intValue());
		
		// UUID.randomUUID().toString().replaceAll("-", "").substring(0, 20);
		// 當前時間
		Date date = new Date();
		// 注意綠界要求格式 yyyy-MM-dd 會error
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss");
		System.out.println(dateFormat.format(date));
			
		AllInOne all = new AllInOne("");
			
		AioCheckOutALL obj = new AioCheckOutALL();
		
		// 訂單編號，商家提供，要唯一
		obj.setMerchantTradeNo(orderNumber);
		// 當前時間
		obj.setMerchantTradeDate(dateFormat.format(date));
		// 價格
		obj.setTotalAmount(orderPrice);
		// 交易描述
		obj.setTradeDesc("test Description");
		// 交易商品
		obj.setItemName("機票款");
		// 交易成功後付款結果通知回傳網址，注意不能指定port號，所以我有用ngork來產生一個公共url
		obj.setReturnURL("https://a7b6-118-163-218-100.ngrok-free.app/ecpayResult");
		// 交易完成後的「回到商店」導引回哪個頁面，若無設置則沒有回到商店按鈕
		obj.setClientBackURL("http://localhost:8081/test");
//		obj.setOrderResultURL("http://localhost:8081/test");
		// returnRUL是否要額外交易資訊
		obj.setNeedExtraPaidInfo("N");
		// 設定自訂資訊
		obj.setCustomField1("...");
			
			
		String form = all.aioCheckOut(obj, null);
			
		return form;
		}
}
