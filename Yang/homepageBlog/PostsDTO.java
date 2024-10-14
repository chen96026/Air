package com.example.demo.model;

import java.time.LocalDateTime;
import java.util.List;

public class PostsDTO {
		private List<String> imageUrls;
		private Long id;
		private String mainTitle;
		private String content;
		private String memberIconUrl;
		private String memberName;
		private LocalDateTime createdTime;
		private String tags;
		public String getTags() {
			return tags;
		}
		public void setTags(String tags) {
			this.tags = tags;
		}
		public List<String> getImageUrls() {
			return imageUrls;
		}
		public void setImageUrls(List<String> imageUrls) {
			this.imageUrls = imageUrls;
		}
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getMainTitle() {
			return mainTitle;
		}
		public void setMainTitle(String mainTitle) {
			this.mainTitle = mainTitle;
		}
		public String getContent() {
			return content;
		}
		public void setContent(String content) {
			this.content = content;
		}
		public String getMemberIconUrl() {
			return memberIconUrl;
		}
		public void setMemberIconUrl(String memberIconUrl) {
			this.memberIconUrl = memberIconUrl;
		}
		public String getMemberName() {
			return memberName;
		}
		public void setMemberName(String memberName) {
			this.memberName = memberName;
		}
		public LocalDateTime getCreatedTime() {
			return createdTime;
		}
		public void setCreatedTime(LocalDateTime createdTime) {
			this.createdTime = createdTime;
		}
}
