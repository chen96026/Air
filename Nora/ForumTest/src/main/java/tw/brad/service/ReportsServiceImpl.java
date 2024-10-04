package tw.brad.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	public Reports addReport(String userId, Long postId) {
		
		if (userId != null && postId != null) {
			
			if (reportsRepository.findByMemberUidAndPostsId(userId, postId) == null) {
				
				Reports report = new Reports();
				report.setMember(memberRepository.findByUid(userId));
				report.setPosts(postsRepository.findById(postId).orElse(null));
				
				return reportsRepository.save(report);

			} else {
				System.err.println("Reported!");
				return null;
			}
			
		} else {
			System.err.println("Not found this User or this Post");
			return null;
		}

	}

}
