package tw.brad.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
import tw.brad.repository.PostsRepository;

@Service
public class PostsServiceImpl implements PostsService {
	
	@Autowired
	private PostsRepository postsRepository;
	
	@Autowired
	private ImagesService imagesService;
	
	@Autowired
	private ImagesRepository imagesRepository;
	
	// 創建新文章
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

	
	// 論壇首頁卡片排序(讚數除外)
	@Override
	public Sort setSort (String sortBy) {
		
		if ("rating".equals(sortBy)) {
			return Sort.by(Sort.Order.desc("rate"), Sort.Order.desc("createdTime"));
		} else {
			return Sort.by(Sort.Order.desc("createdTime"));
		}
	}
	
	// 論壇首頁關鍵字篩選
	@Override
	public Page<Posts> findPosts (String country, String city, String key, Sort sort, int page) {
		
		Pageable pageable = PageRequest.of(page, 6, sort);	// 設定卡片讀取頁數、張數、排序
			
		if (!"所有城市".equals(city) && !"全世界".equals(country)) {
				
			return (key != null && !key.isEmpty())
				? postsRepository.searchByCityAndKey(city, key, pageable)
				: postsRepository.findByCityAndStatus(city, true, pageable);
				
		} else if  (!"全世界".equals(country)) {
				
			return (key != null && !key.isEmpty())
				? postsRepository.searchByCountryAndKey(country, key, pageable)
				: postsRepository.findByCountryAndStatus(country, true, pageable);
				
		} else {
				
			return (key != null && !key.isEmpty())
				? postsRepository.searchByKey(key, pageable)
				: postsRepository.findByStatus(true, pageable);
		}
	}		
		
		
	// 論壇首頁依讚數排序+關鍵字篩選
	@Override
	public Page<Posts> findPostsSortedByLikes (String country, String city, String key, int page) {
		
		Pageable pageable = PageRequest.of(page, 6);
			
		if (!"所有城市".equals(city) && !"全世界".equals(country)) {
				
			return (key != null && !key.isEmpty())
				? postsRepository.searchByCityAndKeySortedBylikes(city, key, pageable)
				: postsRepository.findByCitySortedBylikes(city, pageable);
				
		} else if  (!"全世界".equals(country)) {
				
			return (key != null && !key.isEmpty())
				? postsRepository.searchByCountryAndKeySortedBylikes(country, key, pageable)
				: postsRepository.findByCountrySortedBylikes(country, pageable);
				
		} else {
				
			return (key != null && !key.isEmpty())
				? postsRepository.searchByKeySortedBylikes(key, pageable)
				: postsRepository.findAllSortedBylikes(pageable);
		}
			
	}
		
	
	// 取得論壇首頁卡片資料
	@Override
	public List<PostViewDTO> getPosts (List<Posts> postlist) {
		
		List<PostViewDTO> result = new ArrayList<PostViewDTO>();
		
		for (Posts post : postlist) {
			post.setContent(post.getContent().replace("\r\n", "<br/>"));
			
			String imageURL = imagesService.getCoverImgURL(post);
			
			LocalDate createdDate = post.getCreatedTime().toLocalDate();
			
			UserNameIconDTO userNameIconDTO = new UserNameIconDTO(post.getAuthor());
			
			Long countLikes = post.getLikesCount();
			Long countReports = post.getReportsCount();
			
			result.add(new PostViewDTO(post, imageURL, createdDate, userNameIconDTO, countLikes, countReports));
		}
		
		return result;
	}
	
	
	// 論壇文章完整內容
	@Override
	public PostViewDTO getPostDetail(Long id) {
		
		Posts post = postsRepository.findById(id).orElse(null);
		post.setContent(post.getContent().replace("\r\n", "<br/>"));
			
		LocalDate createdDate = post.getCreatedTime().toLocalDate();
		
		UserNameIconDTO userNameIconDTO = new UserNameIconDTO(post.getAuthor());
		
		List<String> imageURLlist = imagesService.getImgURLList(post);
		
		Long countLikes = post.getLikesCount();
		Long countReports = post.getReportsCount();
		
		PostViewDTO result = new PostViewDTO(post, imageURLlist, createdDate, userNameIconDTO, countLikes, countReports);

		return result;
		
	}
	
	
	// 更新文章
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
			
			if (images != null && !images.isEmpty()) {

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


	// 刪除文章
	@Override
	public void deletePost(Long id) {
		
		postsRepository.deleteById(id);
	}


	// 後臺管理 暫時被下架的文章列表
	@Override
	public Page<Posts> findReportedPosts(int page) {
		
		Pageable pageable = PageRequest.of(page, 10);
		
		return postsRepository.findByStatus(false, pageable);
	}

}