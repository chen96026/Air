package tw.brad.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tw.brad.model.Posts;
import tw.brad.model.Reports;
import tw.brad.repository.MemberRepository;
import tw.brad.repository.PostsRepository;
import tw.brad.repository.ReportsRepository;

@Service
public class ReportsServiceImpl implements ReportsService{
	
	@Autowired
	private ReportsRepository reportsRepository;
	
	@Autowired
	private PostsRepository postsRepository;
	
	@Autowired
	private MemberRepository memberRepository;
	

	@Override
	@Transactional
	public Reports addReport(Long userId, Long postId) {
		
		if (userId != null && postId != null) {
			
			if (reportsRepository.findByMemberIdAndPostsId(userId, postId) == null) {
				
				Reports report = new Reports();
				report.setMember(memberRepository.findById(userId).orElse(null));
				report.setPosts(postsRepository.findById(postId).orElse(null));
				
				Reports saveReport = reportsRepository.save(report);
				
				updatePostStatus(postId);
				
				return saveReport;

			} else {
				System.err.println("Reported!");
				return null;
			}
			
		} else {
			System.err.println("Not found this User or this Post");
			return null;
		}

	}


	@Override
	public void deleteAllReports(Long postId) {
		
		List<Reports> reportsList = reportsRepository.findByPostsId(postId);
		
		reportsRepository.deleteAll(reportsList);
		updatePostStatus(postId);
		
	}
	
	
	private void updatePostStatus (Long postId) {
		
		Posts post = postsRepository.findById(postId).orElse(null);
		
		if (post.getReportsCount() >= 5) {
			post.setStatus(false);
		} else {
			post.setStatus(true);
		}
		postsRepository.save(post);
	}

}