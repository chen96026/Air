package com.example.demo.Controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Model.tempImg;
import com.example.demo.Repository.tempImgR;

@RequestMapping("/temp")
@RestController
public class tempImgC {
	
	@Autowired
	private tempImgR tempImgR;
	
	@PostMapping("/img")
	public void img(
			@RequestParam("file") MultipartFile file
			) throws IOException {
		tempImg img = new tempImg();
		img.setImage(file.getBytes());
		tempImgR.save(img);
	}

}
