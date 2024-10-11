package com.example.demo.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.ResponseMember;
import com.example.demo.Model.Member;

@Service
public interface MemberService {

	//檢查
	public ResponseMember isExistEmail(String email);
	//註冊
	public ResponseMember registerMember(Member member);
	//登錄
	public ResponseMember loginMember(Member member);
	//uid查詢會員資料
	public Member findMemberuid(String uid);
	//更新
	public ResponseMember updateMember(Member member);
	//上傳頭像
	void uploadMembericon(String uid, MultipartFile file) throws Exception;
	//刪除
	boolean deleteAccount(String email,String password);
}
