package tw.brad.service;

import tw.brad.model.Likes;

public interface LikesService {
	public Likes addLike (Long userId, Long postId);
	public void deleteLike (Long userId, Long postId);
}
