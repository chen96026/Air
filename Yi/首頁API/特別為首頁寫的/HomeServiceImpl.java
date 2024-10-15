package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.model.Member;
import com.example.demo.model.Posts;
import com.example.demo.repository.HomeRepository;
import com.example.demo.repository.MemberRepository;

public class HomeServiceImpl {

	@Autowired
	private HomeRepository forumRepository;
	
	 public List<Posts> getRandomForum() {
		 return forumRepository.findRandomPosts();
	 }
	 
}
