package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SpringDocConfig {
	
	@Bean
	public OpenAPI baseOpenApI() {
		OpenAPI openApi = new OpenAPI();
		Components components = new Components();
		Info info = new Info();
		info.title("大專API").version("v1").description("API");

		openApi.info(info).components(components);

		return openApi;
	}
}
