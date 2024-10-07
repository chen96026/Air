package tw.brad.repository;

import java.lang.reflect.Member;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import tw.brad.model.Posts;

public interface PostsRepository extends JpaRepository<Posts, Long> {
	// 根據狀態查詢所有有效的文章
	public Page<Posts> findByStatus(Boolean status, Pageable pageable);
	// 城市篩選
	public Page<Posts> findByCityAndStatus(String city, Boolean status, Pageable pageable);
	// 國家篩選
	public Page<Posts> findByCountryAndStatus(String country, Boolean status, Pageable pageable);
	
	// 關鍵字篩選
	@Query("SELECT p FROM Posts p WHERE (p.mainTitle LIKE %:key% OR p.tags LIKE %:key%) AND p.status = true")
	public Page<Posts> searchByKey(@Param("key") String key, Pageable pageable);
	
	// 城市+關鍵字篩選
	@Query("SELECT p FROM Posts p WHERE p.city = :city AND (p.mainTitle LIKE %:key% OR p.tags LIKE %:key%) AND p.status = true")
	public Page<Posts> searchByCityAndKey(@Param("city") String city, @Param("key") String key, Pageable pageable);

	// 國家+關鍵字篩選
	@Query("SELECT p FROM Posts p WHERE p.country = :country AND (p.mainTitle LIKE %:key% OR p.tags LIKE %:key%) AND p.status = true")
	public Page<Posts> searchByCountryAndKey(@Param("country") String country, @Param("key") String key, Pageable pageable);
	
	
	// 照讚數排序
	@Query("SELECT p FROM Posts p LEFT JOIN p.likes l WHERE p.status = true GROUP BY p ORDER BY COUNT(l) DESC, p.createdTime DESC")
	public Page<Posts> findAllSortedBylikes(Pageable pageable);
	
	// 照讚數排序+城市篩選
	@Query("SELECT p FROM Posts p LEFT JOIN p.likes l WHERE p.city = :city AND p.status = true GROUP BY p ORDER BY COUNT(l) DESC, p.createdTime DESC")
	public Page<Posts> findByCitySortedBylikes(@Param("city") String city, Pageable pageable);
	
	// 照讚數排序+國家篩選
	@Query("SELECT p FROM Posts p LEFT JOIN p.likes l WHERE p.country = :country AND p.status = true GROUP BY p ORDER BY COUNT(l) DESC, p.createdTime DESC")
	public Page<Posts> findByCountrySortedBylikes(@Param("country") String country, Pageable pageable);
	
	// 照讚數排序+關鍵字篩選
	@Query("SELECT p FROM Posts p LEFT JOIN p.likes l WHERE (p.mainTitle LIKE %:key% OR p.tags LIKE %:key%) AND p.status = true GROUP BY p ORDER BY COUNT(l) DESC, p.createdTime DESC")
	public Page<Posts> searchByKeySortedBylikes(@Param("key") String key, Pageable pageable);
	
	// 照讚數排序+城市+關鍵字篩選
	@Query("SELECT p FROM Posts p LEFT JOIN p.likes l WHERE p.city = :city AND (p.mainTitle LIKE %:key% OR p.tags LIKE %:key%) AND p.status = true GROUP BY p ORDER BY COUNT(l) DESC, p.createdTime DESC")
	public Page<Posts> searchByCityAndKeySortedBylikes(@Param("city") String city, @Param("key") String key, Pageable pageable);
	
	// 照讚數排序+國家+關鍵字篩選
	@Query("SELECT p FROM Posts p LEFT JOIN p.likes l WHERE p.country = :country AND (p.mainTitle LIKE %:key% OR p.tags LIKE %:key%) AND p.status = true GROUP BY p ORDER BY COUNT(l) DESC, p.createdTime DESC")
	public Page<Posts> searchByCountryAndKeySortedBylikes(@Param("country") String country, @Param("key") String key, Pageable pageable);
	
	
	public List<Posts> findByAuthor(Member author);
	
}
