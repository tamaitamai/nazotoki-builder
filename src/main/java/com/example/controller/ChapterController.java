package com.example.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.domain.Chapter;
import com.example.domain.Save;
import com.example.domain.User;
import com.example.service.ChapterService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/chapter")
public class ChapterController {
	@Autowired
	private ChapterService chapterService;
	
	@Autowired
	private HttpSession session;
	
	@PostMapping("/save")
	@ResponseBody
	public void save(@RequestParam("chapterId") Integer chapterId) {
		Chapter chapter=chapterService.chapterLoad(chapterId);
		Save save=new Save();
		User user = (User) session.getAttribute("userLogin");
		BeanUtils.copyProperties(chapter, save);
		save.setUserId(user.getId());
		if(chapterService.saveLoad(user.getId())==null) {
			chapterService.saveInsert(save);
		}else {
			chapterService.saveUpdate(save);
		}
	}	
}
