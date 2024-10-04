package tw.brad.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.brad.model.Likes;
import tw.brad.model.Posts;

public interface LikesRepository extends JpaRepository<Likes, Long> {

	public Long countByPosts(Posts post);
	
	public Likes findByMemberUidAndPostsId(String memberUid, Long postId);
	
}