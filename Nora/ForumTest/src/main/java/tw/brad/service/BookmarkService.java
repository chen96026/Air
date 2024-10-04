package tw.brad.service;

import tw.brad.model.Bookmark;

public interface BookmarkService {
	public Bookmark addBookmark (String userId, Long postId);
	public void deleteBookmark (String userId, Long postId);
}
