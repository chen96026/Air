package tw.brad.service;

import java.io.IOException;

import org.springframework.data.domain.Page;

import jakarta.mail.MessagingException;
import tw.brad.model.Contact;

public interface ContactService {
	
	public Contact newContact(Contact contact) throws MessagingException, IOException;
	
	public Page<Contact> getAllContacts (int page);
	public Page<Contact> getContactsByStatus (String status,int page);

}
