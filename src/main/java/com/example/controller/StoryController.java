package com.example.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.domain.ChapterCharacter;
import com.example.domain.Character;
import com.example.domain.SelectStory;
import com.example.domain.Story;
import com.example.domain.User;
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
	
	/**
	 * ストーリー情報の確保
	 * @return
	 */
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
	
	/**
	 * 選択肢の決定
	 * @param selectOpenId
	 * @return
	 */
	@PostMapping("/selectStory")
	@ResponseBody
	public List<SelectStory> selectStory(@RequestParam("selectOpenId") Integer selectOpenId){
		Integer chapterId=(Integer) session.getAttribute("chapterId");
		List<SelectStory> selectList=storyService.selectCommentFindAll(chapterId,selectOpenId);
		return selectList;
	}
	
	/**
	 * 選択肢のあとの文章
	 * @param selectId
	 * @param selectOpenId
	 * @return
	 */
	@PostMapping("/selectDesicion")
	@ResponseBody
	public List<Story> selectDesicion(@RequestParam("selectId") Integer selectId,
			@RequestParam("selectOpenId") Integer selectOpenId){
		Integer chapterId=(Integer) session.getAttribute("chapterId");
		List<Story> storyList=storyService.storyBySelectId(chapterId, selectId, selectOpenId);
		return storyList;
	}
	
	/**
	 * キャラクター情報の確保
	 * @return
	 */
	@PostMapping("/getCharacter")
	@ResponseBody
	public List<Character> getCharacter() {
		Integer chapterId=(Integer) session.getAttribute("chapterId");
		if(chapterId==null) {
			chapterId=5;
		}
		List<Character> characterList=new ArrayList<>();
		List<ChapterCharacter> chapterCharactersList=storyService.chapterCharacterLoad(chapterId);
		for(int i=0;i<chapterCharactersList.size();i++) {
			characterList.add(storyService.characterLoad(chapterCharactersList.get(i).getCharacterId()));
		}
		return characterList;
	}
	
	/**
	 * 既読をつける
	 */
	@PostMapping("/readStory")
	@ResponseBody
	public void readStory() {
		User user=(User) session.getAttribute("userLogin");
		Integer chapterId=(Integer) session.getAttribute("chapterId");
		storyService.readStoryInsert(user.getId(), chapterId);
	}
}
