package tw.air.service;

import tw.air.model.Contact;

public interface ContactService {
	
	public Contact saveContact(Contact contact);
	
	public Contact findByCId(Long cId);

}
