package tw.brad.service;

import java.util.List;

import tw.brad.model.Posts;

public interface ImagesService {
	public String getCoverImgURL (Posts post);
	public List<String> getImgURLList (Posts post);
	public void deleteImgById (Long id);
}
