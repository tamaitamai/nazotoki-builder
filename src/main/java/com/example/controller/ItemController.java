package com.example.controller;

import java.util.List;

import org.springframework.beans.BeanUtils;
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
import com.example.service.ItemService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/item")
public class ItemController {
	@Autowired
	private HttpSession session; 
	
	@Autowired
	private ItemService itemService;
	
	@GetMapping("")
	public String item() {	
		itemService.itemHaveReset();
		List<Item> itemList=itemService.itemByChapter(0);		
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

		itemList=itemService.itemByChapter(0);	
		session.setAttribute("itemList", itemList);
		return "main/move.html";
	}
	
	@PostMapping("/add")
	@ResponseBody
	public List<MyItem> add() {
		List<MyItem> myItemList=null;
		if(session.getAttribute("userLogin")!=null) {
			User user=(User) session.getAttribute("userLogin");
			myItemList=itemService.MyItemListByUser(user.getId());
			session.setAttribute("MyItemList", myItemList);
		}
		return myItemList;
	}
	
	@PostMapping("/addMyItem")
	@ResponseBody
	public List<MyItem> addMyItem(@RequestParam("id") Integer id) {
		Item item=itemService.itemLoadById(id);
		MyItem myItem=new MyItem();
		User user=(User) session.getAttribute("userLogin");
		
		BeanUtils.copyProperties(item, myItem);
		myItem.setItemId(id);
		myItem.setUserId(user.getId());
		
		itemService.myItemInsert(myItem);
		List<MyItem> myItemList=itemService.MyItemListByUser(user.getId());
		session.setAttribute("MyItemList", myItemList);
				
		for(int i=0;i<myItemList.size();i++) {
			if(myItemList.get(i).getItemId()==item.getId()) {
				
			}			
		}
		
		return myItemList;
	}
}
