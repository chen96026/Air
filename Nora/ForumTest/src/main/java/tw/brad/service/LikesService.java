package tw.brad.service;

import tw.brad.model.Likes;

public interface LikesService {
	public Likes addLike (String userId, Long postId);
	public void deleteLike (String userId, Long postId);
}
