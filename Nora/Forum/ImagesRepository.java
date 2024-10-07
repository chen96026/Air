package tw.brad.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.brad.model.Images;
import tw.brad.model.Posts;

public interface ImagesRepository extends JpaRepository<Images, Long> {
	public Images findFirstByPosts(Posts posts);
	public List<Images> findByPosts(Posts posts);
}
