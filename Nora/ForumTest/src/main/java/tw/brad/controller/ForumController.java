package tw.brad.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import tw.brad.model.Member;
import tw.brad.model.PostViewDTO;
import tw.brad.model.Posts;
import tw.brad.model.UserNameIconDTO;
import tw.brad.repository.BookmarkRepository;
import tw.brad.repository.LikesRepository;
import tw.brad.repository.MemberRepository;
import tw.brad.repository.PostsRepository;
import tw.brad.repository.ReportsRepository;
import tw.brad.service.PostsService;


@RequestMapping("/")
@Controller
public class ForumController {
	
	@Autowired
	private PostsService postsService;
	
	@Autowired
	private PostsRepository postsRepository;
	
	@Autowired
	private LikesRepository likesRepository;
	
	@Autowired
	private BookmarkRepository bookmarkRepository;
	
	@Autowired
	private ReportsRepository reportsRepository;
	
	@Autowired
	private MemberRepository memberRepository;

	
	@GetMapping("/forum")
	public String forum(
			@RequestParam(required = false) String country, 
			@RequestParam(required = false) String city, 
			@RequestParam(required = false) String key, Model model,
			HttpSession session) {
		
		String getSessionUid = (String) session.getAttribute("userUid");
		System.out.println(getSessionUid);
		
		model.addAttribute("country", country);
		model.addAttribute("city", city);
		model.addAttribute("key", key);
		
		return "forum";
	}
	
	
	@GetMapping("/forum/detail/{id}")
	public String postDetail(@PathVariable Long id, Model model, HttpSession session) {
		
		Posts post = postsRepository.findById(id).orElse(null);
		
		if (post != null) {
			
			PostViewDTO postViewDTO = postsService.getPostDetail(id);
			
			String tags = postViewDTO.getPost().getTags();
			List<String> tagsList = new ArrayList<String>();
			
			if (!"".equals(tags)) {
				
				tagsList = Arrays.stream(tags.split(", "))
						.map(tag -> tag.trim().substring(1)) // 去掉前面的#，並修剪空格
						.collect(Collectors.toList());
			}
			
			model.addAttribute("post", postViewDTO);
			model.addAttribute("tags", tagsList);
			
			String getSessionUid = (String) session.getAttribute("userUid");

			if (getSessionUid != null) {
				model.addAttribute("login", true);
				
				Member member = memberRepository.findByUid(getSessionUid);
				model.addAttribute("edit", post.getAuthor().equals(member));

				model.addAttribute("like", likesRepository.findByMemberIdAndPostsId(member.getId(), id) != null);	
				model.addAttribute("bookmark", bookmarkRepository.findByMemberIdAndPostsId(member.getId(), id) != null);		
				model.addAttribute("report", reportsRepository.findByMemberIdAndPostsId(member.getId(), id) != null);

				return "forum_detail";

			} else {
				model.addAttribute("login", false);
				model.addAttribute("like", false);	
				model.addAttribute("bookmark", false);	
				model.addAttribute("report", false);
				return "forum_detail";
			}
			
		} else return "forum";
		
	}

	
	@GetMapping("/forum/edit")
	public String editPost(@RequestParam(required = false) Long id, Model model, HttpSession session) {
		
		String getSessionUid = (String) session.getAttribute("userUid");
		System.out.println(getSessionUid);
		
		UserNameIconDTO userNameIcon = new UserNameIconDTO(memberRepository.findByUid(getSessionUid));
		model.addAttribute("user", userNameIcon);
		model.addAttribute("date", LocalDate.now());
		
		if (id != null) {

			Posts findPost = postsRepository.findById(id).orElse(null); 
			
			if (findPost != null && findPost.getAuthor().equals(memberRepository.findByUid(getSessionUid))) {
				PostViewDTO postViewDTO = postsService.getPostDetail(id);
				model.addAttribute("isEdit", true);
				model.addAttribute("post", postViewDTO);
				
				return "forum_edit";
			}
		}
		
		model.addAttribute("isEdit", false);
		return "forum_edit";
		
	}
	
}
