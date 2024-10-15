package com.example.demo.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Member;
import com.example.demo.model.Posts;

public interface PostsRepository extends JpaRepository<Posts, Long>{
	
	public List<Posts> findByAuthor(Member author);

}
