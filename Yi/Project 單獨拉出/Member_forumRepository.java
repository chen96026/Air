package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Posts;

public interface Member_forumRepository extends JpaRepository<Posts, Long>{

	 List<Posts> findByAuthorUid(String uid);
}
