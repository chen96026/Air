package com.example.demo.Service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.MemberStatus;
import com.example.demo.ResponseMember;
import com.example.demo.Model.Member;
import com.example.demo.Repository.MemberRepository;
import com.example.demo.bcrypt.BCrypt;
import com.example.demo.dto.CheckPasswordDTO;

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
			responseMember.setMesg("信箱已被註冊");
			responseMember.setMember(member);
		} else {
			responseMember.setMemberStatus(MemberStatus.NOT_EXIST);
			responseMember.setMesg("信箱可以註冊");
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
			responseMember.setMesg("登入失敗");
			responseMember.setMember(member);
		} else {
			Member memberDB = responseMember.getMember();

			if (BCrypt.checkpw(member.getPassword(), memberDB.getPassword())) {
				responseMember.setMemberStatus(MemberStatus.LOGIN_SUCCESS);
				responseMember.setMesg("登入成功");
				responseMember.setMember(memberDB);
			} else {
				responseMember.setMemberStatus(MemberStatus.LOGIN_FAILURE);
				responseMember.setMesg("登入失敗");
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
		} else {
			responseMember.setMemberStatus(MemberStatus.UPDATE_FAILURE);
			responseMember.setMesg("找不到會員");
			responseMember.setMember(null);
		}
		return responseMember;
	}
	
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

	@Override
	public Member findMemberuid(String uid) {
		Member member = memberRepository.findByUid(uid);
		if (member != null) {
			return member;
		} else {
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

		System.out.println("會員 " + member.getUid() + " 的頭像已更新");
	}

	@Override
	public boolean deleteAccount(String email, String password) {
		Member member = memberRepository.findByEmail(email);
		if (BCrypt.checkpw(password, member.getPassword()) && member.getUid() != null) {
			memberRepository.delete(member);
			return true;
		} else {
			return false;
		}
	}
	
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
		
	//後臺會員新增API
	@Override
	public List<Member> findallmember() {
		 return memberRepository.findAll();
	}
	//後臺會員新增API
}
