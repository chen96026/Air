package tw.air.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tw.air.model.Contact;
import tw.air.repository.ContactRepository;

@Service
public class ContactServiceImpl implements ContactService{
	
	@Autowired
	private ContactRepository contactRepository;

	@Override
	public Contact saveContact(Contact contact) {
		return contactRepository.save(contact);
	}

	@Override
    public Contact findByCId(Long cId) {
        return contactRepository.findByCId(cId);
    }
	
	

}
