package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.model.Posts;

public interface HomeRepository extends JpaRepository<Posts, Long>{

	@Query(value = "SELECT * FROM posts WHERE share = 1 ORDER BY RAND() LIMIT 3", nativeQuery = true)
	List<Posts> findRandomPosts();
}
