package com.example.demo.service;

import java.util.List;

import org.mindrot.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Member;
import com.example.demo.model.MemberStatus;
import com.example.demo.model.ResponseMember;
import com.example.demo.repository.MemberRepository;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	private MemberRepository memberRepository;

	@Override
	public ResponseMember registerMember(Member member) {
		ResponseMember responseMember = isExistMember(member.getAccount());
		if (responseMember.getMemberStatus() == MemberStatus.NOT_EXIST) {
			member.setPassword(BCrypt.hashpw(member.getPassword(), BCrypt.gensalt()));

			Member newMember = memberRepository.save(member);
			if (newMember.getId() != null) {
				responseMember.setMemberStatus(MemberStatus.ADD_SUCCESS);
				responseMember.setMesg("註冊成功");
				responseMember.setMember(member);
				System.out.println("Saving member: " + member);
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
		ResponseMember responseMember = isExistMember(member.getAccount());
		if (responseMember.getMemberStatus() == MemberStatus.NOT_EXIST) {
			responseMember.setMemberStatus(MemberStatus.LOGIN_FAILURE);
			responseMember.setMesg("登入失敗");
			responseMember.setMember(member);
		} else {
			Member memberDB = responseMember.getMember();
			if (BCrypt.checkpw(member.getPassword(), memberDB.getPassword())) {
				responseMember.setMemberStatus(MemberStatus.LOGIN_SUCCESS);
				responseMember.setMesg("登入成功");
				responseMember.setMember(member);
			} else {
				responseMember.setMemberStatus(MemberStatus.ADD_FAILURE);
				responseMember.setMesg("登入失敗");
				responseMember.setMember(member);
			}

		}
		return responseMember;
	}

	@Override
	public ResponseMember updateMember(Member member) {
		ResponseMember responseMember = new ResponseMember();
		Member memberDB = memberRepository.findById(member.getId()).orElse(null);
		if (memberDB != null) {
			if (member.getAccount() != null) {
				memberDB.setAccount(member.getAccount());
			}
			if (member.getName() != null) {
				memberDB.setName(member.getName());
			}
			if (member.getPassword() != null) {
				memberDB.setPassword(member.getPassword());
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

	@Override
	public void deleteMember(Long id) {
		memberRepository.deleteById(id);
		Member memberDB = memberRepository.findById(id).orElse(null);
		if (memberDB != null) {
			memberRepository.delete(memberDB);
		}

	}

	@Override
	public ResponseMember isExistMember(String account) {
		ResponseMember responseMember = new ResponseMember();
		List<Member> members = memberRepository.findByAccount(account);
		if (members != null && members.size() > 0) {
			responseMember.setMemberStatus(MemberStatus.EXIST);
			responseMember.setMesg("帳號已被註冊");
			responseMember.setMember(members.get(0));
		} else {
			responseMember.setMemberStatus(MemberStatus.NOT_EXIST);
			responseMember.setMesg("帳號可以註冊");
			responseMember.setMember(null);
		}
		return responseMember;
	}

}
