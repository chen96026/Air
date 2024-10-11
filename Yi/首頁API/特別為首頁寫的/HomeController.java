package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.ImageDTO;
import com.example.demo.model.Images;
import com.example.demo.model.Member;
import com.example.demo.model.Posts;
import com.example.demo.model.PostsDTO;
import com.example.demo.repository.HomeRepository;
import com.example.demo.repository.ImagesRepository;
import com.example.demo.repository.PostsRepository;
import com.example.demo.service.MemberService;

@RequestMapping("/home")
@RestController
public class HomeController {

	@Autowired
	private MemberService memberService;

	@Autowired
	private HomeRepository member_forumRepository;

	@Autowired
	private ImagesRepository imagesRepository;

	//首頁精選貼文隨機挑選三張論壇貼文
	@GetMapping("/randompost")
	public List<PostsDTO> getRandomPosts() {
		List<Posts> posts = member_forumRepository.findRandomPosts();

		return posts.stream().map(post -> {
		    PostsDTO postDto = new PostsDTO();
		    postDto.setId(post.getId());
		    postDto.setMainTitle(post.getMainTitle());
		    postDto.setContent(post.getContent());
		    postDto.setCreatedTime(post.getCreatedTime());

		    // 設置圖片 URL
		    List<String> imageUrls = post.getImages() != null && !post.getImages().isEmpty()
		            ? post.getImages().stream().map(image -> "getImg/" + image.getId()) // 構造圖片 URL
		                    .collect(Collectors.toList())
		            : new ArrayList<>(); // 如果沒有圖片，返回空列表
		    postDto.setImageUrls(imageUrls);

		    // 檢查發文者是否存在，避免空指針異常
		    if (post.getAuthor() != null) {
		        postDto.setMemberName(post.getAuthor().getName());
		        postDto.setMemberIconUrl("icon/" + post.getAuthor().getId()); // 頭像 URL
		    } else {
		        postDto.setMemberName("未知作者");
		        postDto.setMemberIconUrl("/img/logo.png"); // 預設頭像 URL
		    }
		    return postDto;
		}).collect(Collectors.toList());
	}

	//首頁精選貼文找到貼文照片
	@GetMapping("/getImg/{id}")
	public  ResponseEntity<byte[]> getImg(@PathVariable("id") Long id) {
		 Images image = imagesRepository.findById(id).orElse(null);
		 if (image == null || image.getImage() == null) {
		        return ResponseEntity.notFound().build();  // 如果圖片未找到，返回 404
		    }
		 
		 // 檢查圖片數據並設置 MIME 類型
		    String mimeType = image.getMimeType(); // 確保這裡返回的是正確的 MIME 類型
		    if (mimeType == null || !mimeType.contains("/")) {
		        // 如果 mimeType 不正確，使用預設的 MIME 類型
		        mimeType = "application/octet-stream"; // 預設的 MIME 類型
		    }
		 
		 // 返回圖片的二進制數據並設置正確的 MIME 類型
		    return ResponseEntity.ok()
		        .contentType(MediaType.parseMediaType(mimeType))  // 使用正確的 MIME 類型
		        .body(image.getImage());  // 返回圖片的二進制數據
		}
	
	//首頁精選貼文找到member頭像
	@GetMapping("/icon/{id}")
	public ResponseEntity<byte[]> getMemberIcon(@PathVariable("id") Long id) {  // 明確指定參數名稱
	    Member member = memberService.findById(id);
	    if (member == null) {
	        return ResponseEntity.notFound().build();
	    }

	    byte[] icon = member.getIcon();
	    if (icon != null) {
	        return ResponseEntity.ok()
	            .contentType(MediaType.IMAGE_JPEG)
	            .body(icon);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}
}
