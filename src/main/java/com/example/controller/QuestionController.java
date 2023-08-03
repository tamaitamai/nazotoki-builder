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
	
	@GetMapping("")
	public String question() {
		itemList(3);
		return "question/light-question";
	}
	
	//移動確認用
	@GetMapping("/move")
	public String item() {
		itemList(0);
		return "main/move.html";
	}

	//学校ステージ
	@GetMapping("/school")
	public String schoolQuestion() {
		itemList(1);
		Integer change=itemService.changeItemLoad(2);
		session.setAttribute("boxChange", change);
		change=itemService.changeItemLoad(3);
		session.setAttribute("lockerChange", change);
		change=itemService.changeItemLoad(4);
		session.setAttribute("boxChange2", change);
		change=itemService.changeItemLoad(5);
		session.setAttribute("doorChange", change);

		return "question/school-question";
	}
	
	//暗闇ステージ
	@GetMapping("/light")
	public String question3() {
		itemList(3);
		Integer change=itemService.changeItemLoad(1);
		session.setAttribute("doorChange", change);
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
		session.setAttribute("itemList", itemList);
		session.setAttribute("chapterId", num);
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
}
