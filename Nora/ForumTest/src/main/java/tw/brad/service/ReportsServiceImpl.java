package tw.brad.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tw.brad.model.Reports;
import tw.brad.repository.PostsRepository;
import tw.brad.repository.ReportsRepository;
import tw.brad.repository.UserRepository;

@Service
public class ReportsServiceImpl implements ReportsService{
	
	@Autowired
	private ReportsRepository reportsRepository;
	
	@Autowired
	private PostsRepository postsRepository;
	
	@Autowired
	private UserRepository userRepository;
	

	@Override
	public Reports addReport(Long userId, Long postId) {
		
		if (userId != null && postId != null) {
			
			Reports report = new Reports();
			report.setUser(userRepository.findById(userId).orElse(null));
			report.setPosts(postsRepository.findById(postId).orElse(null));

			return reportsRepository.save(report);
	
		} else return null;

	}

}
