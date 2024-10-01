package tw.brad.model;

import java.io.File;
import java.nio.file.Files;
import java.util.Base64;

public class UserNameIconDTO {
	
	private String username;
	private String iconURL;
	
	public UserNameIconDTO(User user) {
		this.username = user.getUsername();
		this.iconURL = setUserIcon(user);
	}


	public String getUsername() {
		return username;
	}

	public String getIconURL() {
		return iconURL;
	}
	
	
	private String setUserIcon(User user) {
		
		String base64Img;
		String mimeType;
		
		if (user.getUserIcon() != null) {
			base64Img = Base64.getEncoder().encodeToString(user.getUserIcon());
			mimeType = user.getMimeType();
		} else {
			base64Img = setDefaultIcon();
			mimeType = "image/svg+xml";
		}
		
		return "data:" + mimeType + ";base64," + base64Img;
	}
	
	private String setDefaultIcon() {
		
		try {		
			
			File file = new File("src/main/resources/static/img/icon/account_circle.svg");
			byte[] defaltIconByte = Files.readAllBytes(file.toPath());
			
			return Base64.getEncoder().encodeToString(defaltIconByte);

		} catch (Exception e) {
			
			System.out.println(e);
			return null;
			
		}
		
	}

}
