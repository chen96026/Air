package tw.brad.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.brad.model.Posts;
import tw.brad.model.Reports;

public interface ReportsRepository extends JpaRepository<Reports, Long> {
	
	public Long countByPosts(Posts post);
	
	public Reports findByUserIdAndPostsId(Long userId, Long postId);
}
