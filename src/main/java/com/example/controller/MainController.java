package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.repository.MainRepository;

@Controller
@RequestMapping("main")
public class MainController {
	@Autowired
	MainRepository mainRepository;
	
	@GetMapping("")
	public String main() {
		mainRepository.findAll().forEach(System.out::println);
		return "question/question1.html";
	}
}
