package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.CheckPasswordDTO;
import com.example.demo.model.Member;
import com.example.demo.model.Posts;
import com.example.demo.model.ResponseMember;

@Service
public interface MemberService {

	//註冊
	public ResponseMember registerMember(Member member);
	//檢查
	public ResponseMember isExistEmail(String email);
	//登錄
	public ResponseMember loginMember(Member member);
	//uid查詢會員資料
	public Member findMemberuid(String uid);
	//更新帳號資料
	public ResponseMember updateMember(Member member);
	//更新密碼
	public String updatePassword(CheckPasswordDTO checkPasswordDTO);
	//刪除
	public boolean deleteAccountByEmail(String email);
	//上傳頭像
    public void uploadMembericon(String uid, MultipartFile file) throws Exception;
    //根據uid獲取會員頭像(Base64)
    public String getMembericon(String uid) throws Exception;
    //根據id取得頭像
    public Member findById(Long id);
    // 根據第三方平台的唯一 ID 查詢會員
    public Member findByThirdPartyId(String thirdPartyId);
    //第三方登入
    public ResponseMember thirdPartyLogin(String thirdPartyId, String provider, String name, String email, byte[] icon);
    // 刪除第三方帳號
    public boolean deleteAccountByThirdPartyId(String thirdPartyId, String email);
}
