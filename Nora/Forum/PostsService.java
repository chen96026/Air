package tw.brad.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartFile;

import tw.brad.model.PostViewDTO;
import tw.brad.model.Posts;

public interface PostsService {
	public Sort setSort (String sortBy);
	public Page<Posts> findPosts (String country, String city, String key, Sort sort, int page);
	public Page<Posts> findPostsSortedByLikes (String country, String city, String key, int page);
	public List<PostViewDTO> getPosts(List<Posts> postlist);
	
	public PostViewDTO getPostDetail(Long id);
	public Posts newPost (Posts post, List<MultipartFile> images) throws Exception;
	public Posts updatePost (Posts post, List<MultipartFile> images) throws Exception;
	
	public void deletePost (Long id);
	
	public Page<Posts> findReportedPosts (int page);
}
