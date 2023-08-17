package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.domain.ChapterCharacter;
import com.example.domain.DeleteItem;
import com.example.domain.Item;
import com.example.domain.MyItem;
import com.example.domain.User;
import com.example.service.ItemService;
import com.example.service.StoryService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/question")
public class QuestionController {
	@Autowired
	private HttpSession session;
	
	@Autowired
	private ItemService itemService;
	
	@Autowired
	private StoryService storyService;
	
	@GetMapping("")
	public String question() {
		itemList(3);
		return "question/light-question";
	}
	
	//学校ステージ
	@GetMapping("/school")
	public String schoolQuestion() {
		itemList(1);
		changeItem("boxChange",2);
		changeItem("lockerChange",3);
		changeItem("boxChange2",4);
		changeItem("doorChange",5);
		return "question/school-question";
	}
	
	//森林ステージ
	@GetMapping("/forest")
	public String forestQuestion() {
		session.setAttribute("character", storyService.characterLoad(6));
		itemList(2);
		changeItem("boxChange1", 6);
		changeItem("barrelChange", 9);
		changeItem("boxChange2", 10);
		changeItem("forestCharacterChange", 11);
		return "question/forest-question";
	}
	
	//暗闇ステージ
	@GetMapping("/light")
	public String question3() {
		itemList(3);		
		changeItem("doorChange", 1);
		changeItem("boxChange1", 12);
		changeItem("boxChange2", 13);
		changeItem("jewelChange", 14);
		return "question/light-question";
	}
	
	//氷ステージ
	@GetMapping("/ice")
	public String iceQuestion() {		
		itemList(5);
		return "question/ice-question";
	}
	
	/**
	 * アイテムリストを呼び出し
	 * @param num
	 */
	public void itemList(Integer num) {
		itemService.itemHaveReset();
		List<Item> itemList=itemService.itemByChapter(num);		
		session.setAttribute("itemList", itemList);
		
		List<MyItem> myItemList=null;
		if(session.getAttribute("userLogin")!=null) {
			User user=(User) session.getAttribute("userLogin");
			myItemList=itemService.MyItemListByUser(user.getId());
			List<DeleteItem> deleteItemList=itemService.deleteItemFindAll(user.getId());
			for(int i=0;i<itemList.size();i++) {
				for(int j=0;j<myItemList.size();j++) {					
					if(itemList.get(i).getId()==myItemList.get(j).getItemId()) {
						itemService.itemHaveUpdate(itemList.get(i).getId(), 0);	
					}					
				}
				
				for(int j=0;j<deleteItemList.size();j++) {					
					if(itemList.get(i).getId()==deleteItemList.get(j).getItemId()) {
						itemService.itemHaveUpdate(itemList.get(i).getId(), 0);	
					}					
				}
			}
		}

		itemList=itemService.itemByChapter(num);
		User user=(User) session.getAttribute("userLogin");
		boolean read=storyService.readStoryLoad(user.getId(), num);
		session.setAttribute("read", read);
		session.setAttribute("itemList", itemList);
		session.setAttribute("chapterId", num);
		
		String backgroundStory=storyService.backgroundStoryLoad(num);
		session.setAttribute("backgroundStory", backgroundStory);
	}
	
	/**
	 * 持ち物の呼び出し
	 * @return myItemのリスト
	 */
	public List<MyItem> myItemList() {
		List<MyItem> myItemList=null;
		if(session.getAttribute("userLogin")!=null) {
			User user=(User) session.getAttribute("userLogin");
			myItemList=itemService.MyItemListByUser(user.getId());
			session.setAttribute("MyItemList", myItemList);
		}
		return myItemList;
	}
	
	/**
	 * アイテムの変化情報の読み取り
	 * @param changeName
	 * @param changeId
	 */
	public void changeItem(String changeName,Integer changeId) {
		User user=(User) session.getAttribute("userLogin");
		boolean change=itemService.changeExists(user.getId(), changeId);
		session.setAttribute(changeName, change);
	}
}
