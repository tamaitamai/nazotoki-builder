package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.domain.Item;
import com.example.domain.MyItem;
import com.example.domain.User;
import com.example.repository.ItemRepository;
import com.example.service.ItemService;

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
		return "question/question4";
	}
	
	//暗闇ステージ
	@GetMapping("/3")
	public String question3() {
		itemList(3);
		return "question/question3";
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
			for(int i=0;i<itemList.size();i++) {
				for(int j=0;j<myItemList.size();j++) {					
					if(itemList.get(i).getId()==myItemList.get(j).getItemId()) {
						itemService.itemHaveUpdate(itemList.get(i).getId(), 0);	
					}					
				}
			}
		}

		itemList=itemService.itemByChapter(num);	
		session.setAttribute("itemList", itemList);
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
