package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/main")
public class MainController {
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
}
