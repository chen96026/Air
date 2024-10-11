package tw.brad.service;

import java.io.IOException;

import jakarta.mail.MessagingException;
import tw.brad.model.Contact;

public interface MailService {
	
	public void sendContactMail(Contact contact) throws MessagingException, IOException;

}
