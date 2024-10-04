package tw.brad.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.brad.model.Bookmark;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
	
	public Bookmark findByMemberUidAndPostsId(String memberUid, Long postId);
	
}
