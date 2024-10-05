package tw.brad.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
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

import jakarta.servlet.http.HttpSession;
import tw.brad.model.Bookmark;
import tw.brad.model.ImageDTO;
import tw.brad.model.Images;
import tw.brad.model.Likes;
import tw.brad.model.Member;
import tw.brad.model.PostViewDTO;
import tw.brad.model.Posts;
import tw.brad.model.Reports;
import tw.brad.repository.ImagesRepository;
import tw.brad.repository.LikesRepository;
import tw.brad.repository.MemberRepository;
import tw.brad.repository.PostsRepository;
import tw.brad.service.BookmarkService;
import tw.brad.service.ImagesService;
import tw.brad.service.LikesService;
import tw.brad.service.PostsService;
import tw.brad.service.ReportsService;

@RequestMapping("/forum/api")
@RestController
public class ForumAPIController {

	@Autowired
	private PostsService postsService;
	
	@Autowired
	private PostsRepository postsRepository;
	
	@Autowired
	private ImagesService imagesService;
	
	@Autowired
	private ImagesRepository imagesRepository;
	
	@Autowired
	private LikesService likesService;
	
	@Autowired
	private BookmarkService bookmarkService;
	
	@Autowired
	private ReportsService reportsService;
	
	@Autowired
	private MemberRepository memberRepository;

	
	@GetMapping("/loadCards")
	public List<PostViewDTO> loadCards(
			@RequestParam(required = false) String country,
			@RequestParam(required = false) String city,
			@RequestParam(required = false) String key,
			@RequestParam(defaultValue = "postDate") String sortBy,
			@RequestParam(defaultValue = "0") int page,
			Model model) {
		
		List<Posts> postlist = new ArrayList<Posts>();
		
		if ("likes".equals(sortBy)) {
			postlist = postsService.findPostsSortedByLikes(country, city, key, page);
		} else {
			Sort sort = postsService.setSort(sortBy);
			postlist = postsService.findPosts(country, city, key, sort, page);	// 關鍵字篩選
		}
		
		List<PostViewDTO> posts = postsService.getPosts(postlist);
		
		model.addAttribute("posts", posts);
		
		return posts;
	}
	
	@PostMapping("/editPost")
	public Posts newPost (
			@RequestParam String country,
			@RequestParam String city,
			@RequestParam(required = false) LocalDate startDate,
			@RequestParam(required = false) LocalDate endDate,
			@RequestParam String mainTitle,
			@RequestParam String subTitle,
			@RequestParam String tags,
			@RequestParam Integer rate,
			@RequestParam(required = false) Boolean share,
			@RequestParam String content,
			@RequestParam List<MultipartFile> images,
			HttpSession session) {
		
		Posts post = new Posts();
		post.setCountry(country);
		post.setCity(city);
		post.setStartDate(startDate);
		post.setEndDate(endDate);
		post.setMainTitle(mainTitle);
		post.setSubTitle(subTitle);
		post.setTags(tags);
		post.setRate(rate);
		post.setContent(content);
		post.setCreatedTime(LocalDateTime.now());
		
		if (share != null) {
			post.setShare(share);			
		} else {
			post.setShare(false);
		}
		
		String getSessionUid = (String) session.getAttribute("userUid");
		Member author = memberRepository.findByUid(getSessionUid);
		System.err.println(author);
		post.setAuthor(author);
		
		try {
			Posts newPost = postsService.newPost(post, images);		
			return newPost;
		} catch (Exception e) {
			return null;
		}			
	}
	
	@PutMapping("/editPost")
	public Posts update (
			@RequestParam Long id,
			@RequestParam String country,
			@RequestParam String city,
			@RequestParam(required = false) LocalDate startDate,
			@RequestParam(required = false) LocalDate endDate,
			@RequestParam String mainTitle,
			@RequestParam String subTitle,
			@RequestParam String tags,
			@RequestParam Integer rate,
			@RequestParam(required = false) Boolean share,
			@RequestParam String content,
			@RequestParam(required = false) List<MultipartFile> images) {
		System.out.println("Update1");
		Posts post = new Posts();
		post.setId(id);
		post.setCountry(country);
		post.setCity(city);
		post.setStartDate(startDate);
		post.setEndDate(endDate);
		post.setMainTitle(mainTitle);
		post.setSubTitle(subTitle);
		post.setTags(tags);
		post.setRate(rate);
		post.setContent(content); 
		
		if (share != null) {
			post.setShare(share);			
		} else {
			post.setShare(false);
		}
		
		Posts updatePosts = new Posts();
		
		try {
			updatePosts = postsService.updatePost(post, images);
			System.out.println("updateOK");
			return updatePosts;
		} catch (Exception e) {
			System.err.println("updateXXX");
			System.err.println(e);
			return null;
		}			
	}

	@GetMapping("/getImg")
	public List<ImageDTO> getImg(@RequestParam Long id) {
		
		Posts post = postsRepository.findById(id).orElse(null);
		
		List<Images> imageList = imagesRepository.findByPosts(post);
		List<ImageDTO> imageDTOlist = new ArrayList<ImageDTO>();
		
		for (Images image : imageList) {
			ImageDTO imageDTO = new ImageDTO(image);
			imageDTOlist.add(imageDTO);
		}
		
		return imageDTOlist;
	}
	
	@DeleteMapping("/deleteImg")
	public ResponseEntity<Void> deleteImg(@RequestBody List<Long> imageIds) {
		System.out.println(imageIds);
		for (Long imageId : imageIds) {
			imagesService.deleteImgById(imageId);
		}
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/like")
	public Likes addLike(@RequestBody Long id, HttpSession session) {
		
		String getSessionUid = (String) session.getAttribute("userUid");
		Member member = memberRepository.findByUid(getSessionUid);
		
		return likesService.addLike(member.getId(), id);
	}
	
	@DeleteMapping("/like")
	public ResponseEntity<Void> deleteLike(@RequestBody Long id, HttpSession session) {
		
		String getSessionUid = (String) session.getAttribute("userUid");
		Member member = memberRepository.findByUid(getSessionUid);
		likesService.deleteLike(member.getId(), id);
		
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/countLikes/{id}")
	public Long countLikes(@PathVariable Long id) {
		
		System.out.println("count");
		Posts post = postsRepository.findById(id).orElse(null);
		
		return post.getLikesCount();
	}
	
	@PostMapping("/bookmark")
	public Bookmark addBookmark(@RequestBody Long id, HttpSession session) {
		
		String getSessionUid = (String) session.getAttribute("userUid");
		Member member = memberRepository.findByUid(getSessionUid);
		
		return bookmarkService.addBookmark(member.getId(), id);
	}
	
	@DeleteMapping("/bookmark")
	public ResponseEntity<Void> deleteBookmark(@RequestBody Long id, HttpSession session) {
		
		String getSessionUid = (String) session.getAttribute("userUid");
		Member member = memberRepository.findByUid(getSessionUid);
		bookmarkService.deleteBookmark(member.getId(), id);
		
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/report")
	public Reports addReport(@RequestBody Long id, HttpSession session) {
		
		String getSessionUid = (String) session.getAttribute("userUid");
		Member member = memberRepository.findByUid(getSessionUid);
		
		return reportsService.addReport(member.getId(), id);
		
	}
	
	@DeleteMapping("/deletePost")
	public ResponseEntity<Void> deletePost(@RequestBody Long id) {
		
		postsService.deletePost(id);
		
		return ResponseEntity.noContent().build();
	}
	
	
}
