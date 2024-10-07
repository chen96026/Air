package tw.brad.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tw.brad.model.ImageDTO;
import tw.brad.model.Images;
import tw.brad.model.Posts;
import tw.brad.repository.ImagesRepository;
import tw.brad.repository.PostsRepository;

@Service
public class ImagesServiceImpl implements ImagesService{
	
	@Autowired
	ImagesRepository imagesRepository;
	
	@Autowired
	PostsRepository postsRepository;
	

	@Override
	public String getCoverImgURL(Posts post) {
		
		Images firstImg = imagesRepository.findFirstByPosts(post);
		ImageDTO imageDTO = new ImageDTO(firstImg);
		
		return imageDTO.getBase64URL();
	}
	
	
	@Override
	public List<String> getImgURLList (Posts post) {
		
		List<String> imageURLlist = new ArrayList<String>();
		
		for (Images image : imagesRepository.findByPosts(post)) {
			ImageDTO imageDTO = new ImageDTO(image);
			imageURLlist.add(imageDTO.getBase64URL());
		}
		
		return imageURLlist;
	}


	@Override
	public void deleteImgById(Long id) {
		
		imagesRepository.deleteById(id);
	}


	
}
