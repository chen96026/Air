package tw.brad.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.brad.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long>{

}
