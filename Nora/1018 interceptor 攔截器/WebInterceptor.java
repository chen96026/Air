package com.example.demo.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class WebInterceptor implements HandlerInterceptor{

	// 進入 Controller 之前執行，是否能進入頁面或跳轉都在這裡設定
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		
		String getSessionUid = (String) request.getSession().getAttribute("userUid");
		System.out.println("攔截器");
		System.out.println(getSessionUid);
		
//		// 不分路徑
//		if (getSessionUid == null) {
//			response.sendRedirect("/login");
//			return false;
//		} else {
//			return true;
//		}
		
		// 分路徑
		String requestURI = request.getRequestURI();
		
		// startsWith 可以抓 /forum/edit 和 /forum/edit?id=5 & /forum/edit 開頭的所有其他路徑，需要完美匹配特定路徑可以用 requestURI.equals("/login")
		if (requestURI.startsWith("/forum/edit") && getSessionUid == null) {
			response.sendRedirect("/login");
			return false;	// 攔截進入 /forum/edit
		} else {
			return true;	// 進入 /forum/edit
		} 
		
	}

	// 進入 Controller 之後執行，在視圖被渲染前調用
	@Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		
	}
	
	// 整個請求結束之後，視圖渲染完成後執行
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

	}
	
}
