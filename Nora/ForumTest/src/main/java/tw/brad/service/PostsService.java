package tw.brad.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import tw.brad.model.PostViewDTO;
import tw.brad.model.Posts;

public interface PostsService {
	public List<PostViewDTO> getPosts(String country, String city, String key, String sortBy, int page);
	public PostViewDTO getPostDetail(Long id);
	public Posts newPost (Posts post, List<MultipartFile> images) throws Exception;
	public Posts updatePost (Posts post, List<MultipartFile> images) throws Exception;
	public void deletePost (Long id);
}
