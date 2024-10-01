package tw.air.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tw.air.model.Contact;


@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
	
    Contact findByCId(Long cId);
}
