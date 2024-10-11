package com.example.demo.repository;
import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Member;

public interface MemberRepository extends JpaRepository<Member, Long>{

//	public List<Member>findByAccount(String account);
	public Member findByEmail(String email);
	public Member findByUid(String uid);
	
	//新增第三方-10/11
	public Member findByThirdPartyId(String thirdPartyId);  // 根據第三方 ID 查詢使用者
	
}
