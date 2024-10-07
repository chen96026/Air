package tw.air.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/validation")
@Validated
public class ValidationController {
	
	@PostMapping("/validateContact")	
	public ResponseEntity<Map<String, String>> validatedContact(@RequestBody Map<String, String> contactData){
		Map<String, String> errors = new HashMap<>();
		
		String contactName = contactData.get("contactName");
		String contactPhone = contactData.get("contactPhone");
		String contactEmail = contactData.get("contactEmail");
		
		if(contactName == null || contactName.trim().isEmpty()) {
			errors.put("contactName", "聯絡人姓名為必填");
		}
		if(contactPhone == null || !contactPhone.matches("\\d{10}")) {
			errors.put("contactPhone", "請輸入有效的聯絡人電話號碼");
		}
		if(contactEmail == null || !contactEmail.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
			errors.put("contactEmail", "請輸入有效的電子郵件地址");
		}
		
		if(errors.isEmpty()) {
			return ResponseEntity.ok().build();
		}else {
			return ResponseEntity.badRequest().body(errors);
		}
			
	}
			
}
