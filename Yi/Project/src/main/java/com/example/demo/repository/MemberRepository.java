package com.example.demo.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Member;

public interface MemberRepository extends JpaRepository<Member, Long>{

	public List<Member>findByAccount(String account);
	
	//模糊查詢
	public List<Member>findByAccountContaining(String account);
	
	
}
