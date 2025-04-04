package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.domain.Option;
import com.example.domain.User;
import com.example.service.OptionService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/option")
public class OptionController {
	@Autowired
	private OptionService optionService;
	
	@Autowired
	private HttpSession session;
	
	@PostMapping("")
	@ResponseBody
	public Option option() {
		User user=(User) session.getAttribute("userLogin");
		Option option=optionService.optionLoad(user.getId());
		return option;
	}
	
	/**
	 * オプション情報の更新
	 * @param commentSpeed
	 */
	@PostMapping("/updateCommentSpeed")
	@ResponseBody
	public void commentSpeed(@RequestParam("commentSpeed") Integer commentSpeed,
			@RequestParam("autoSpeed") Integer autoSpeed) {
		User user=(User) session.getAttribute("userLogin");
		Option option=new Option();
		option.setUserId(user.getId());
		option.setCommentSpeed(commentSpeed);
		option.setAutoSpeed(autoSpeed);
		if(optionService.optionLoad(user.getId())==null) {
			optionService.optionInsert(option);
		}else {
			optionService.commentSpeedUpdate(option);
		}
	}
}
