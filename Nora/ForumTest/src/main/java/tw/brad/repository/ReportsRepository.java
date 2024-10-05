package tw.brad.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.brad.model.Reports;

public interface ReportsRepository extends JpaRepository<Reports, Long> {
	
	public Reports findByMemberIdAndPostsId(Long userId, Long  postId);
}
