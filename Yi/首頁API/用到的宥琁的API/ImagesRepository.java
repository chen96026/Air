package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Images;
import com.example.demo.model.Posts;

public interface ImagesRepository extends JpaRepository<Images, Long> {
	public Images findFirstByPosts(Posts posts);
	public List<Images> findByPosts(Posts posts);
}