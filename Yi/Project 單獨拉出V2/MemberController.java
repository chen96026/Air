package com.example.demo.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.CheckPasswordDTO;
import com.example.demo.model.Member;
import com.example.demo.model.MemberStatus;
import com.example.demo.model.Posts;
import com.example.demo.model.PostsDTO;
import com.example.demo.model.ResponseMember;
import com.example.demo.model.ThirdPartyDTO;
import com.example.demo.repository.HomeRepository;
import com.example.demo.service.MemberService;

import jakarta.servlet.http.HttpSession;

@RequestMapping("/member")
@RestController
public class MemberController {

	@Autowired
	private MemberService memberService;

//	@GetMapping("/isexist/{account}")
//	public ResponseMember isExist(@PathVariable String account) {
//		return memberService.isExistMember(account);
//	}

	@GetMapping("/isexistEmail/{email}")
	public ResponseMember isExistEmail(@PathVariable("email") String email) {
		return memberService.isExistEmail(email);
	}

	@PostMapping("/register")
	public ResponseMember register(@RequestBody Member member, HttpSession session) {
		ResponseMember responseMember = memberService.registerMember(member);
		if (responseMember.getMemberStatus() == MemberStatus.ADD_SUCCESS) {
			session.setAttribute("userEmail", responseMember.getMember().getEmail());
			session.setAttribute("userUid", responseMember.getMember().getUid());
		}
		return responseMember;
	}

	@GetMapping("/info")
	public Member getMemberInfo(HttpSession session) {
		String userUid = (String) session.getAttribute("userUid");
		if (userUid != null) {
			Member member = memberService.findMemberuid(userUid);
			System.out.println("返回的會員資料: " + member);
			return member;
		}
		return null;
	}

	@PostMapping("/login")
	public ResponseMember login(@RequestBody Member member, HttpSession session) {
		ResponseMember responsemember = memberService.loginMember(member);
		if (responsemember.getMemberStatus() == MemberStatus.LOGIN_SUCCESS) {
			session.setAttribute("userEmail", responsemember.getMember().getEmail());
			session.setAttribute("userName", responsemember.getMember().getName());
			session.setAttribute("userPhone", responsemember.getMember().getPhone());
			session.setAttribute("userBirth", responsemember.getMember().getBirthday());
			session.setAttribute("userUid", responsemember.getMember().getUid());
		}
		return responsemember;
	}

	@GetMapping("/uid/{uid}")
	public Member getMemberByUid(@PathVariable String uid) {
		Member member = memberService.findMemberuid(uid);
		return member;
	}

	@PutMapping("/update")
	public ResponseMember update(@RequestBody Member member) {
		return memberService.updateMember(member);
	}
	
	@PutMapping("/updatepassword")
	public String updatepassword(@RequestBody CheckPasswordDTO checkPasswordDTO) {
		System.out.println(checkPasswordDTO.getPassword());
		return memberService.updatePassword(checkPasswordDTO);
	}

	@DeleteMapping("/delete/{email}")
	public String delete(@PathVariable("email") String email) {
		boolean isDeleted = memberService.deleteAccountByEmail(email);
		if (isDeleted) {
			return "已刪除";
		} else {
			return "未找到會員，無法刪除";
		}
	}

	@PostMapping("/uploadicon")
	public ResponseEntity<String> uploadIcon(@RequestParam("avatar") MultipartFile file,
			@RequestParam("uid") String uid) {
		if (file.isEmpty()) {
			return ResponseEntity.badRequest().body("圖片文件為空");
		}

		// 檢查文件類型，只允許 JPEG 和 PNG
		String fileType = file.getContentType();
		if (!fileType.equals("image/jpeg") && !fileType.equals("image/png")) {
			return ResponseEntity.badRequest().body("文件格式不支援，只支援 JPEG 和 PNG 格式");
		}

		try {
			// 調用服務層來處理圖片上傳邏輯
			memberService.uploadMembericon(uid, file);
			return ResponseEntity.ok("頭像上傳成功");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("圖片上傳失敗");
		}
	}

	@GetMapping("/geticon/{uid}")
	public ResponseEntity<String> getIcon(@PathVariable("uid") String uid) {
		System.out.println("接收到的 UID: " + uid); // 確認接收到的 UID
		try {
			// 調用服務層方法來獲取 Base64 編碼的圖片
			return ResponseEntity.ok(memberService.getMembericon(uid));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("伺服器錯誤：" + e.getMessage());
		}
	}

//	@GetMapping("/member_forum/{uid}")
//	public List<PostsDTO> getPostsByUid(@PathVariable String uid) {
//		List<Posts> posts = member_forumRepository.findByAuthorid(id);
//
//		// 使用 DTO 只返回所需的字段，包括從 Images 表中獲取圖片
//		List<PostsDTO> postsDTOs = posts.stream().map(post -> {
//			// 獲取文章的圖片（假設一篇文章對應多個圖片）
//			byte[] image = post.getImages().isEmpty() ? null : post.getImages().get(0).getImage();
//			return new PostsDTO(image, // 傳遞圖片數據
//					post.getMainTitle(), // 文章標題
//					post.getContent(), // 文章內容
//					post.getAuthor().getIcon(), // 從 `Member` 中取得會員頭像
//					post.getAuthor().getName(), // 會員名稱
//					post.getCreatedTime() // 創建時間
//			);
//		}).collect(Collectors.toList());
//
//		return postsDTOs;
//	}
	
	  @GetMapping("/member/icon/{id}")
	    public ResponseEntity<byte[]> getMemberIcon(@PathVariable Long id) {
	        Member member = memberService.findById(id);  // 使用 findById 方法查找成員
	        byte[] icon = member.getIcon();  // 從 member 中獲取 BLOB 格式的 icon
	        String mimeType = "image/png";  // 假設所有圖片都是 PNG 格式，如果沒有 mimeType，使用默認的圖片格式

	        return ResponseEntity.ok()
	            .contentType(MediaType.parseMediaType(mimeType))
	            .body(icon);  // 返回圖片的二進制數據
	    }
	    
	    
	    //新增第三方登入-10/11
	    @PostMapping("/thirdparty/login")
	    public ResponseEntity<ResponseMember> thirdPartyLogin(
	            @RequestBody ThirdPartyDTO thirdPartuDTO, HttpSession session) {

	        // 從 ThirdPartyLoginRequest 中提取數據
	        String thirdPartyId = thirdPartuDTO.getThirdPartyId();
	        String provider = thirdPartuDTO.getProvider();
	        String name = thirdPartuDTO.getName();
	        String email = thirdPartuDTO.getEmail();  // 允許為 null
	        byte[] icon = thirdPartuDTO.getIcon();    // 允許為 null

	        // 調用 Service 處理邏輯
	        ResponseMember responseMember = memberService.thirdPartyLogin(thirdPartyId, provider, name, email, icon);

	     // 如果登入成功，將信息存入 session
	        if (responseMember.getMemberStatus() == MemberStatus.LOGIN_SUCCESS || 
	            responseMember.getMemberStatus() == MemberStatus.ADD_SUCCESS) {
	            session.setAttribute("userEmail", responseMember.getMember().getEmail());
	            session.setAttribute("userUid", responseMember.getMember().getUid());
	        }
	        
	        // 返回結果
	        return ResponseEntity.ok(responseMember);
	    }
	    
	    @PostMapping("/thirdparty/delete")
	    public ResponseEntity<String> deleteThirdParty(@RequestBody ThirdPartyDTO thirdPartyDTO) {
	        // 假設 thirdPartyDTO 有必要的資料，如 thirdPartyId 和 email
	        String thirdPartyId = thirdPartyDTO.getThirdPartyId();
	        String email = thirdPartyDTO.getEmail();

	        boolean isDeleted = memberService.deleteAccountByThirdPartyId(thirdPartyId, email);
	        return isDeleted ? ResponseEntity.ok("已刪除") : ResponseEntity.status(HttpStatus.NOT_FOUND).body("未找到會員，無法刪除");
	    }
	    //新增第三方登入-10/11
}
