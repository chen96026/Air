package tw.brad.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.mail.MessagingException;
import tw.brad.model.Contact;
import tw.brad.service.ContactService;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RequestMapping("/contact/api")
@RestController
public class ContactAPIController {
	
	@Autowired
	private ContactService contactService;

	@PostMapping("/submit")
	public Contact newContact(
			@RequestParam String name,
			@RequestParam String email,
			@RequestParam(required = false) String phone,
			@RequestParam(required = false) Long orderId,
			@RequestParam String category,
			@RequestParam String content) throws MessagingException, IOException {
		
		Contact contact = new Contact();
		
		contact.setName(name);
		contact.setEmail(email);
		contact.setPhone(phone);
		contact.setOrderId(orderId);
		contact.setCategory(category);
		contact.setContent(content);
		contact.setSubmissionTime(LocalDateTime.now());
		
		return contactService.newContact(contact);
	}
	
}
