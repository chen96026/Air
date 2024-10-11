package com.example.demo.Service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.MemberStatus;
import com.example.demo.ResponseMember;
import com.example.demo.Model.Member;
import com.example.demo.Repository.MemberRepository;
import com.example.demo.bcrypt.BCrypt;

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
		ResponseMember responseMember = isExistEmail(member.getEmail());
		if (responseMember.getMemberStatus() == MemberStatus.NOT_EXIST) {
			// 生成唯一的 UID
			String uid = UUID.randomUUID().toString();
			member.setUid(uid); // 將 UID 設置到 Member 物件中

			member.setPassword(BCrypt.hashpw(member.getPassword(), BCrypt.gensalt()));

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
		} else {
			responseMember.setMesg("帳號重複");
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
	public boolean deleteAccount(String email,String password) {
		Member member = memberRepository.findByEmail(email);
		if(BCrypt.checkpw(password,member.getPassword()) && member.getUid()!=null) {
			memberRepository.delete(member);
			return true;
		}else {
			return false;
		}
	}
}
