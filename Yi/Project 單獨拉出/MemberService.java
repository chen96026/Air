package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.Member;
import com.example.demo.model.ResponseMember;

@Service
public interface MemberService {

	//註冊
	public ResponseMember registerMember(Member member);
	//檢查
//	public ResponseMember isExistMember(String email);
	//檢查
	public ResponseMember isExistEmail(String email);
	//登錄
	public ResponseMember loginMember(Member member);
	//uid查詢會員資料
	public Member findMemberuid(String uid);
	//更新
	public ResponseMember updateMember(Member member);
	//刪除
	boolean deleteAccountByEmail(String email);
	//上傳頭像
    void uploadMembericon(String uid, MultipartFile file) throws Exception;
    //根據uid獲取會員頭像(Base64)
    String getMembericon(String uid) throws Exception;
}
