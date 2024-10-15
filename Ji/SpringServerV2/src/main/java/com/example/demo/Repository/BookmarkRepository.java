package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Bookmark;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
	
	public Bookmark findByMemberIdAndPostsId(Long userId, Long  postId);
	
}
