package tw.brad.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.brad.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
}
