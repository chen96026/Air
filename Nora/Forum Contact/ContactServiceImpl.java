package tw.brad.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import tw.brad.model.Contact;
import tw.brad.model.Contact.ContactStatus;
import tw.brad.repository.ContactRepository;

@Service
public class ContactServiceImpl implements ContactService {
	
	@Autowired
	private ContactRepository contactRepository;
	
	@Autowired
	private MailService mailService;

	@Override
	public Contact newContact(Contact contact) throws MessagingException, IOException {
		
		Contact newContact = contactRepository.save(contact);
		mailService.sendContactMail(newContact);
		
		return newContact;
		
	}

	@Override
	public Page<Contact> getAllContacts(int page) {
		
		Sort sort = Sort.by(Sort.Order.desc("submissionTime"));
		Pageable pageable = PageRequest.of(page, 10, sort);
		
		return contactRepository.findAll(pageable);
		
	}

	@Override
	public Page<Contact> getContactsByStatus(String status, int page) {

		Contact.ContactStatus contactStatus = ContactStatus.valueOf(status);
		Sort sort = Sort.by(Sort.Order.desc("submissionTime"));
		Pageable pageable = PageRequest.of(page, 10, sort);
		
		return contactRepository.findByStatus(contactStatus, pageable);
	}


}
