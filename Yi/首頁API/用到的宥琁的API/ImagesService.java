package com.example.demo.service;

import java.util.List;

import com.example.demo.model.Posts;

public interface ImagesService {
	public String getCoverImgURL (Posts post);
	public List<String> getImgURLList (Posts post);
	public void deleteImgById (Long id);
}
