package tw.brad.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import tw.brad.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {
	
	public Page<Contact> findByStatus(Contact.ContactStatus status, Pageable pageable);

}
