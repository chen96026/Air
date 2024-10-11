package com.example.demo.service;

import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.mindrot.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.CheckPasswordDTO;
import com.example.demo.model.Member;
import com.example.demo.model.MemberStatus;
import com.example.demo.model.Posts;
import com.example.demo.model.ResponseMember;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.HomeRepository;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	private MemberRepository memberRepository;

	@Override
	public ResponseMember isExistEmail(String email) {
		ResponseMember responseMember = new ResponseMember();
		Member member = memberRepository.findByEmail(email);
		if (member != null) {
			responseMember.setMemberStatus(MemberStatus.EXIST);
			responseMember.setMesg("Email已被註冊");
			responseMember.setMember(member);
		} else {
			responseMember.setMemberStatus(MemberStatus.NOT_EXIST);
			responseMember.setMesg("Email可以註冊");
			responseMember.setMember(null);
		}
		return responseMember;
	}
	
	@Override
	public ResponseMember registerMember(Member member) {
		ResponseMember responseMember = new ResponseMember();
		 // 如果是非第三方註冊，檢查 email 和 password 是否為 null
	    if (member.getProvider() == null || member.getProvider().isEmpty()) {
	        // 檢查 email 是否為空
	        if (member.getEmail() == null || member.getEmail().isEmpty()) {
	            responseMember.setMemberStatus(MemberStatus.ADD_FAILURE);
	            responseMember.setMesg("Email是必填的");
	            return responseMember;
	        }
	        // 檢查 password 是否為空
	        if (member.getPassword() == null || member.getPassword().isEmpty()) {
	            responseMember.setMemberStatus(MemberStatus.ADD_FAILURE);
	            responseMember.setMesg("Password是必填的");
	            return responseMember;
	        }
	        // 檢查 email 是否已經存在
	        responseMember = isExistEmail(member.getEmail());
	        if (responseMember.getMemberStatus() == MemberStatus.NOT_EXIST) {
	            // 生成唯一的 UID
	            String uid = UUID.randomUUID().toString();
	            member.setUid(uid); // 將 UID 設置到 Member 物件中

	            // 密碼加密
	            member.setPassword(BCrypt.hashpw(member.getPassword(), BCrypt.gensalt()));
	        } else {
	            // 如果 email 已經存在，返回失敗狀態
	            responseMember.setMesg("Email重複");
	            return responseMember;
	        }
	    }
	    // 保存新會員至資料庫
	    Member newMember = memberRepository.save(member);

	    if (newMember.getId() != null) {
	        responseMember.setMemberStatus(MemberStatus.ADD_SUCCESS);
	        responseMember.setMesg("註冊成功");
	        responseMember.setMember(member);
	    } else {
	        responseMember.setMemberStatus(MemberStatus.ADD_FAILURE);
	        responseMember.setMesg("註冊失敗");
	        responseMember.setMember(member);
	    }

	    return responseMember;
	}

	@Override
	public ResponseMember loginMember(Member member) {
		ResponseMember responseMember = isExistEmail(member.getEmail());
		
		if (responseMember.getMemberStatus() == MemberStatus.NOT_EXIST) {
			responseMember.setMemberStatus(MemberStatus.LOGIN_FAILURE);
			responseMember.setMesg("Email尚未註冊");
			responseMember.setMember(null);
		} else {
			
			Member memberDB = responseMember.getMember();
			
			if (BCrypt.checkpw(member.getPassword(), memberDB.getPassword())) {
				responseMember.setMemberStatus(MemberStatus.LOGIN_SUCCESS);
				responseMember.setMesg("登入成功");
				responseMember.setMember(memberDB);
			} else {
				responseMember.setMemberStatus(MemberStatus.LOGIN_FAILURE);
				responseMember.setMesg("Email或密碼錯誤");
				responseMember.setMember(null);
			}

		}
		return responseMember;
	}

	@Override
	public ResponseMember updateMember(Member member) {
		ResponseMember responseMember = new ResponseMember();
		
		Member memberDB = memberRepository.findByUid(member.getUid());

		 if (memberDB != null) {
		        // 只更新非空且與當前值不同的欄位
		        if (member.getEmail() != null && !member.getEmail().equals(memberDB.getEmail())) {
		            memberDB.setEmail(member.getEmail());
		        }
		        if (member.getPassword() != null && !member.getPassword().isEmpty()) {
		            String hashedPassword = BCrypt.hashpw(member.getPassword(), BCrypt.gensalt());
		            memberDB.setPassword(hashedPassword);
		        }
		        if (member.getName() != null && !member.getName().equals(memberDB.getName())) {
		            memberDB.setName(member.getName());
		        }
		        if (member.getPhone() != null && !member.getPhone().equals(memberDB.getPhone())) {
		            memberDB.setPhone(member.getPhone());
		        }
		        if (member.getBirthday() != null && !member.getBirthday().equals(memberDB.getBirthday())) {
		            memberDB.setBirthday(member.getBirthday());
		        }
		        
			memberRepository.save(memberDB);

			responseMember.setMemberStatus(MemberStatus.UPDATE_SUCCESS);
			responseMember.setMesg("資料更新成功");
			responseMember.setMember(memberDB);
		}
		else {
			responseMember.setMemberStatus(MemberStatus.UPDATE_FAILURE);
			responseMember.setMesg("找不到會員");
			responseMember.setMember(null);
	    }
		return responseMember;
	}
	
	
	//新增舊密碼驗證-10/11
	@Override
	public String updatePassword(CheckPasswordDTO checkPasswordDTO) {
		Member member = memberRepository.findByUid(checkPasswordDTO.getUid());
		if (member.getPassword() != null && BCrypt.checkpw(checkPasswordDTO.getOld_password(), member.getPassword())) {
			member.setPassword(BCrypt.hashpw(checkPasswordDTO.getPassword(),BCrypt.gensalt()));
			memberRepository.save(member);
		}else {
			return "舊密碼不符";
		}
		return null;
	}
	//10/11


	@Override
	public Member findMemberuid(String uid) {
		Member member = memberRepository.findByUid(uid);
		if(member!=null) {
			return member;
		}else {
			return null;
		}
	}

	 @Override
	    public void uploadMembericon(String uid, MultipartFile file) throws Exception {
	        Member member = memberRepository.findByUid(uid);

	        if (member == null) {
	            throw new RuntimeException("用戶未找到");
	        }

	        // 將圖片文件的二進制數據儲存到 icon 欄位
	        member.setIcon(file.getBytes());
	        memberRepository.save(member);
	    }

	 @Override
	 public String getMembericon(String uid) throws Exception {
		 Member member = memberRepository.findByUid(uid);

		 if (member == null || member.getIcon() == null) {
	            // 如果沒有找到會員或頭像為空，返回預設圖片
	            String defaultImageBase64 = "data:image/png;base64,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";
	            return defaultImageBase64;
	        }

	        // 將圖片的二進制數據轉換為 Base64 編碼
		 	String base64Image = Base64.getEncoder().encodeToString(member.getIcon());
		    String result = "data:image/jpeg;base64," + base64Image;
		    return result;
	    }

	 @Override
	 public boolean deleteAccountByEmail(String email) {
	     Member member = memberRepository.findByEmail(email);
	     if (member != null) {
	         memberRepository.delete(member);
	         return true;
	     } else {
	         return false;
	     }
	 }

	@Override
	public Member findById(Long id) {
		  return memberRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Member not found with id: " + id));
	    }

	//新增第三方-10/11
	@Override
	public Member findByThirdPartyId(String thirdPartyId) {
		// 查詢是否有thirdPartyId的會員
		 return memberRepository.findByThirdPartyId(thirdPartyId);
	}

	@Override
	public ResponseMember thirdPartyLogin(String thirdPartyId, String provider, String name, String email,
			byte[] icon) {
		 Member existingMember = memberRepository.findByThirdPartyId(thirdPartyId);
		 ResponseMember responseMember = new ResponseMember();
		  if (existingMember != null) {
		        // 如果會員已經存在，返回登入成功
		        responseMember.setMemberStatus(MemberStatus.LOGIN_SUCCESS);
		        responseMember.setMesg("登入成功");
		        responseMember.setMember(existingMember);
		        return responseMember;
		    }
		 
		 // 如果會員不存在，則進行註冊
		    Member newMember = new Member();
		    newMember.setThirdPartyId(thirdPartyId);  // 設定第三方ID
		    newMember.setProvider(provider);          // 設定提供商 (Google, Line等)
		    newMember.setName(name);           		  // 使用第三方的 displayname 存到 name 欄位
		    newMember.setEmail(email);                // 設定 email，允許為 null
		    newMember.setIcon(icon);                  // 存儲頭像數據
		    
		    // 生成唯一的 UID
		    String uid = UUID.randomUUID().toString();
		    newMember.setUid(uid); // 為第三方用戶設置 UID
		 
		    // 註冊新會員，並將會員資料保存到資料庫
		    ResponseMember registerResponse = registerMember(newMember);
		    
		    return registerResponse;  // 返回註冊結果
	}

	@Override
	public boolean deleteAccountByThirdPartyId(String thirdPartyId, String email) {
		 Member member = memberRepository.findByThirdPartyId(thirdPartyId);
		 if (member != null && (email == null || member.getEmail().equals(email))) {
		        memberRepository.delete(member);
		        return true;
		    }
		return false;
	}
	
	//新增第三方-10/11

	}
