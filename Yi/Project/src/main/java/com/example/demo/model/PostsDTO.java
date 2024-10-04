package com.example.demo.model;

import java.time.LocalDateTime;

public class PostsDTO {
		private byte[] image;  // 用來存放從 Images 資料表獲取的圖片數據
		private String mainTitle;
	    private String content;
	    private byte[] authorIcon;  // 會員頭像
	    private String authorName;
	    private LocalDateTime createdTime;

	    public PostsDTO( byte[] image,String mainTitle, String content, byte[] authorIcon, String authorName, LocalDateTime createdTime) {
	    	this.image = image;
	        this.mainTitle = mainTitle;
	        this.content = content;
	        this.authorIcon = authorIcon;
	        this.authorName = authorName;
	        this.createdTime = createdTime;
	    }

		public byte[] getImage() {
			return image;
		}

		public void setImage(byte[] image) {
			this.image = image;
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

		public byte[] getAuthorIcon() {
			return authorIcon;
		}

		public void setAuthorIcon(byte[] authorIcon) {
			this.authorIcon = authorIcon;
		}

		public String getAuthorName() {
			return authorName;
		}

		public void setAuthorName(String authorName) {
			this.authorName = authorName;
		}

		public LocalDateTime getCreatedTime() {
			return createdTime;
		}

		public void setCreatedTime(LocalDateTime createdTime) {
			this.createdTime = createdTime;
		}
	    
	    
}
