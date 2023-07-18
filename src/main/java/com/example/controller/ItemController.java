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
		itemList(0);
		return "main/move.html";
	}
	
	@PostMapping("/add")
	@ResponseBody
	public List<MyItem> add() {
		return myItemList();
	}
	/**
	 * 画面内のアイテムを持ち物に加える
	 * 
	 * @param id
	 * @return
	 */
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
						
		return myItemList;
	}
	
	/**
	 * 使用したアイテムを持ち物リストから削除
	 * 
	 * @param itemId
	 * @return
	 */
	@PostMapping("/deleteMyItem")
	@ResponseBody
	public List<MyItem> deleteMyItem(@RequestParam("itemId") Integer itemId) {		
		User user=(User) session.getAttribute("userLogin");
		itemService.myItemDelete(itemId,user.getId());
		return myItemList();
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
