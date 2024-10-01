package tw.brad.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import tw.brad.model.Posts;

public interface PostsRepository extends JpaRepository<Posts, Long> {
	
	public Page<Posts> findByCity(String city, Pageable pageable);
	public Page<Posts> findByCountry(String country, Pageable pageable);
	
	@Query("SELECT p FROM Posts p WHERE p.mainTitle LIKE %:key% OR p.tags LIKE %:key%")
	public Page<Posts> searchByKey(@Param("key") String key, Pageable pageable);

	@Query("SELECT p FROM Posts p WHERE p.city = :city AND (p.mainTitle LIKE %:key% OR p.tags LIKE %:key%)")
	public Page<Posts> searchByCityAndKey(@Param("city") String city, @Param("key") String key, Pageable pageable);
	
	@Query("SELECT p FROM Posts p WHERE p.country = :country AND (p.mainTitle LIKE %:key% OR p.tags LIKE %:key%)")
	public Page<Posts> searchByCountryAndKey(@Param("country") String country, @Param("key") String key, Pageable pageable);
	
}
