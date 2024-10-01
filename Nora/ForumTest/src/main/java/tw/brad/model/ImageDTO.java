package tw.brad.model;

import java.util.Base64;

public class ImageDTO {
	
	private String base64URL;
	private Long postId;
	private Long imageId;
	private String mimeType;
	
	
	public ImageDTO(Images image) {
		this.base64URL = imageToURL(image);
		this.postId = image.getPosts().getId();
		this.imageId = image.getId();
		this.mimeType = setFormattedMimeType(image.getMimeType());
	};
	

	public String getBase64URL() {
		return base64URL;
	}
	
	public void setBase64URL(String base64url) {
		this.base64URL = base64url;
	}
	
	public Long getPostId() {
		return postId;
	}
	
	public void setPostId(Long postId) {
		this.postId = postId;
	}
	
	public Long getImageId() {
		return imageId;
	}
	
	public void setImageId(Long imageId) {
		this.imageId = imageId;
	}
	
	public String getMimeType() {
		return mimeType;
	}

	public void setMimeType(String mimeType) {
		this.mimeType = mimeType;
	}


	private String imageToURL (Images image) {
		
		String base64Img = Base64.getEncoder().encodeToString(image.getImage());
		return "data:" + image.getMimeType() + ";base64," + base64Img;
		
	}
	
	private String setFormattedMimeType (String mimeType) {
		
		switch (mimeType) {
			case "image/jpeg":
	            return ".jpg";
	        case "image/png":
	            return ".png";
	        case "image/gif":
	            return ".gif";
	        case "image/webp":
	            return ".webp";
	        case "image/svg+xml":
	            return ".svg";
	        default:
	            return "";
		}
		
	}

}
