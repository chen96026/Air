package tw.brad.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tw.brad.model.Bookmark;
import tw.brad.repository.BookmarkRepository;
import tw.brad.repository.PostsRepository;
import tw.brad.repository.UserRepository;

@Service
public class BookmarkServiceImpl implements BookmarkService{
	
	@Autowired
	private BookmarkRepository bookmarkRepository;
	
	@Autowired
	private PostsRepository postsRepository;
	
	@Autowired
	private UserRepository userRepository;

	
	@Override
	public Bookmark addBookmark(Long userId, Long postId) {
		
		if (userId != null && postId != null) {
		
		Bookmark bookmark = new Bookmark();
		bookmark.setUser(userRepository.findById(userId).orElse(null));
		bookmark.setPosts(postsRepository.findById(postId).orElse(null));
		
		return bookmarkRepository.save(bookmark);
		
		} else return null;
	}

	@Override
	public void deleteBookmark(Long userId, Long postId) {
		
		Bookmark bookmark = bookmarkRepository.findByUserIdAndPostsId(userId, postId);
		
		if (bookmark != null) bookmarkRepository.delete(bookmark);
		
	}

}
