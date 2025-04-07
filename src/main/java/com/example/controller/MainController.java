package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.domain.User;
import com.example.service.ChapterService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/main")
public class MainController {
	@Autowired
	private ChapterService chapterService;
	
	@Autowired
	private HttpSession session;
	
	@GetMapping("")
	public String main() {		
		return "main/header-footer.html";
	}
	
	@GetMapping("/home")
	public String home() {
		return "main/home.html";
	}
	
	@GetMapping("/gameOver")
	public String gameOver() {
		return "/main/game-over.html";
	}
	
	@GetMapping("/gameClear")
	public String gameClear(){
		return "/main/game-clear.html";
	}
	
	@GetMapping("/characterList")
	public String characterList() {
		return "main/character.html";
	}
}
