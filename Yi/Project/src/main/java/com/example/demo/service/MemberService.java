package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.model.Member;
import com.example.demo.model.ResponseMember;

@Service
public interface MemberService {

	//註冊
	public ResponseMember registerMember(Member member);
	//檢查
	public ResponseMember isExistMember(String account);
	//登錄
	public ResponseMember loginMember(Member member);
	//更新
	public ResponseMember updateMember(Member member);
	//刪除
	public void deleteMember(Long id);
}
