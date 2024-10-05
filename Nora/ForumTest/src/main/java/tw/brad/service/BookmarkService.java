package tw.brad.service;

import tw.brad.model.Bookmark;

public interface BookmarkService {
	public Bookmark addBookmark (Long userId, Long postId);
	public void deleteBookmark (Long userId, Long postId);
}
