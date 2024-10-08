package tw.brad.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import tw.brad.model.Member;


public interface MemberRepository extends JpaRepository<Member, Long>{

//	public List<Member>findByAccount(String account);
	public Member findByEmail(String email);
	public Member findByUid(String uid);
}
