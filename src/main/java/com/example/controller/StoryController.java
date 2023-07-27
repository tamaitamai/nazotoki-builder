package com.example.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.domain.ChapterCharacter;
import com.example.domain.Character;
import com.example.domain.Story;
import com.example.service.StoryService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/story")
public class StoryController {
	@Autowired
	private StoryService storyService;
	
	@Autowired
	private HttpSession session;
	
	@GetMapping("")
	public String story() {		
		return "main/story.html";
	}
	
	/**
	 * ロード画面へ遷移
	 * @return
	 */
	@GetMapping("/loading")
	public String loading() {
		return "main/loading.html";
	}
	
	/**
	 * ロード画面の画像をランダムに選択
	 * @return
	 */
	@PostMapping("/loadingSelect")
	@ResponseBody
	public List<Character> loadingSelect(){
		List<Character> characterList=storyService.characterFindAll();
		return characterList;
	}
	
	@PostMapping("/getStory")
	@ResponseBody
	public List<Story> getStory(){
		Integer chapterId=(Integer) session.getAttribute("chapterId");
		if(chapterId==null) {
			chapterId=5;
		}
		List<Story> storyList=storyService.storyByChapterId(chapterId);
		return storyList;
	}
	
	@PostMapping("/getCharacter")
	@ResponseBody
	public List<Character> getCharacter() {
		Integer chapterId=(Integer) session.getAttribute("chapterId");
		if(chapterId==null) {
			chapterId=5;
		}
		ChapterCharacter chapterCharacter=storyService.chapterCharacterLoad(chapterId);
		List<Character> characterList=new ArrayList<>();
		Character character1=storyService.characterLoad(chapterCharacter.getCharacterId1());
		characterList.add(character1);
		Character character2=storyService.characterLoad(chapterCharacter.getCharacterId2());
		characterList.add(character2);
		return characterList;
	}
}
