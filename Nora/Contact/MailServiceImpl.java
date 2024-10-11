package tw.brad.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import tw.brad.model.Contact;

@Service
public class MailServiceImpl implements MailService {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private TemplateEngine templateEngine;

	
	@Override
	public void sendContactMail(Contact contact) throws MessagingException, IOException {

		MimeMessage mimeMailMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMailMessage, false);
		
		helper.setFrom("Javel 通知信<tf661633icv@gmail.com>");
		helper.setTo(contact.getEmail());
		helper.setSubject("【Javel】（自動回信）我們已收到您的來信");
		
		Context context = new Context();
		context.setVariable("id", contact.getId());
		context.setVariable("name", contact.getName());
		context.setVariable("email", contact.getEmail());
		context.setVariable("phone", contact.getPhone());
		context.setVariable("orderId", (contact.getOrderId() != null) ? contact.getOrderId() : "");
		context.setVariable("category", contact.getCategory());
		
		contact.setContent(contact.getContent().replace("\r\n", "<br/>"));
		context.setVariable("content", contact.getContent());
		
		String mailContent = templateEngine.process("contactMailTemplates", context);
		helper.setText(mailContent, true);
		
		javaMailSender.send(mimeMailMessage);
	}

}
