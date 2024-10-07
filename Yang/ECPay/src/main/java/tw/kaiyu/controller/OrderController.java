package tw.kaiyu.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import tw.kaiyu.service.OrderService;

@RestController
public class OrderController {
	
	@Autowired
	OrderService orderService;

	@RequestMapping("/ecpayCheckout")
	public String ecpayCheckout() {
		String aioCheckOutALLForm = orderService.ecpayCheckout();
		
		return aioCheckOutALLForm;
	}
	
	@RequestMapping("/test")
	public String hi() {
		return "Hello World!";
	}
	
	@PostMapping("/ecpayResult")
	public String ecpayReturnURL(HttpServletRequest request) {
		Map<String,String[]> paramMap = request.getParameterMap();

	    // 記錄接收到的所有參數
	    paramMap.forEach((key, value) -> {
	        System.out.println(key + ": " + String.join(", ", value));
	    });
	    
	    // CustomField1~4，商家自定義的資訊，若無需要全部都可為空
	    // PaymentTypeChargeFee，表示該筆交易的手續費，0為無手續費或商家承擔，無法設定，是由ECpay自己計算
	    // SimulatePaid 為1 代表此交易為模擬付款，並非是由消費者實際真的付款。
	    
	    // 回應 ECpay ，1|OK是官方規定格式
	    return "1|OK";
	}
}
