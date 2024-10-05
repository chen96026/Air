package tw.brad.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.brad.model.Likes;

public interface LikesRepository extends JpaRepository<Likes, Long> {

	public Likes findByMemberIdAndPostsId(Long userId, Long  postId);
	
}