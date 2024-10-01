package tw.brad.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import tw.brad.model.Images;
import tw.brad.model.PostViewDTO;
import tw.brad.model.Posts;
import tw.brad.model.UserNameIconDTO;
import tw.brad.repository.ImagesRepository;
import tw.brad.repository.LikesRepository;
import tw.brad.repository.PostsRepository;
import tw.brad.repository.ReportsRepository;

@Service
public class PostsServiceImpl implements PostsService {
	
	@Autowired
	private PostsRepository postsRepository;
	
	@Autowired
	private ImagesService imagesService;
	
	@Autowired
	private ImagesRepository imagesRepository;
	
	@Autowired
	private LikesRepository likesRepository;
	
	@Autowired
	private ReportsRepository reportsRepository;
	
	
	@Override
	@Transactional
	public Posts newPost(Posts post, List<MultipartFile> images) throws Exception {

		Posts newPost = postsRepository.save(post);
		
		for (MultipartFile image : images) {
			Images img = new Images();
			
			img.setPosts(newPost);
			img.setImage(image.getBytes());
			img.setMimeType(image.getContentType());
			
			imagesRepository.save(img);
		}
		
		return newPost;
	}



	@Override
	public List<PostViewDTO> getPosts(String country, String city, String key, String sortBy, int page) {
		
		Sort sort;
		
		switch (sortBy) {
		case "postDate": {
			sort = Sort.by(Sort.Order.desc("createdTime"));
			break;
		}
		case "likes": {
			sort = Sort.by(Sort.Order.desc("likes"), Sort.Order.desc("createdTime"));
			break;
		}
		case "rating": {
			sort = Sort.by(Sort.Order.desc("rate"), Sort.Order.desc("createdTime"));
			break;
		}
		default:
			sort = Sort.by(Sort.Order.desc("createdTime"));
			break;
		}
		
		Pageable pageable = PageRequest.of(page, 6, sort);
		List<Posts> postlist;
		
		if (!"所有城市".equals(city) && !"all".equals(country)) {
	
			postlist = (key != null && !key.isEmpty())
				? postsRepository.searchByCityAndKey(city, key, pageable).getContent()
				: postsRepository.findByCity(city, pageable).getContent();
			
		} else if  (!"all".equals(country)) {
			
			postlist = (key != null && !key.isEmpty())
				? postsRepository.searchByCountryAndKey(country, key, pageable).getContent()
	            : postsRepository.findByCountry(country, pageable).getContent();
			
		} else {
			
			postlist = (key != null && !key.isEmpty())
				? postsRepository.searchByKey(key, pageable).getContent()
				: postsRepository.findAll(pageable).getContent();
	
		}
		
		List<PostViewDTO> result = new ArrayList<PostViewDTO>();
		
		for (Posts post : postlist) {
			post.setContent(post.getContent().replace("\r\n", "<br/>"));
			
			String imageURL = imagesService.getCoverImgURL(post);
			
			LocalDate createdDate = post.getCreatedTime().toLocalDate();
			
			UserNameIconDTO userNameIconDTO = new UserNameIconDTO(post.getAuthor());
			
			Long countLikes = likesRepository.countByPosts(post);
			Long countReports = reportsRepository.countByPosts(post);
			
			result.add(new PostViewDTO(post, imageURL, createdDate, userNameIconDTO, countLikes, countReports));
		}
		
		return result;
		
	}
	
	
	
	@Override
	public PostViewDTO getPostDetail(Long id) {
		
		Posts post = postsRepository.findById(id).orElse(null);
			
		LocalDate createdDate = post.getCreatedTime().toLocalDate();
		
		UserNameIconDTO userNameIconDTO = new UserNameIconDTO(post.getAuthor());
		
		List<String> imageURLlist = imagesService.getImgURLList(post);
		
		Long countLikes = likesRepository.countByPosts(post);
		Long countReports = reportsRepository.countByPosts(post);
		
		PostViewDTO result = new PostViewDTO(post, imageURLlist, createdDate, userNameIconDTO, countLikes, countReports);
		
		return result;
		
	}
	
	
	
	@Override
	@Transactional
	public Posts updatePost(Posts post, List<MultipartFile> images) throws Exception {
		
		Posts postDB = postsRepository.findById(post.getId()).orElse(null);
		
		if (postDB != null) {
			postDB.setCountry(post.getCountry());
			postDB.setCity(post.getCity());
			postDB.setStartDate(post.getStartDate());
			postDB.setEndDate(post.getEndDate());
			postDB.setMainTitle(post.getMainTitle());
			postDB.setSubTitle(post.getSubTitle());
			postDB.setTags(post.getTags());
			postDB.setRate(post.getRate());
			postDB.setShare(post.getShare());
			postDB.setContent(post.getContent());
			
			postsRepository.save(postDB);
			
			if (!images.isEmpty()) {

				for (MultipartFile image : images) {
					Images img = new Images();
					
					img.setPosts(postDB);
					img.setImage(image.getBytes());
					img.setMimeType(image.getContentType());
					
					imagesRepository.save(img);
				}
			}
			
			return postDB;
			
		} else {
			System.out.println("update false");
			return null;
		}
	}



	@Override
	public void deletePost(Long id) {
		
		postsRepository.deleteById(id);
	}
	

}
