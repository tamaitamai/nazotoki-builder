package com.example.controller;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.domain.DeleteItem;
import com.example.domain.Item;
import com.example.domain.MoveItem;
import com.example.domain.MyItem;
import com.example.domain.UnionItem;
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
	
	/**
	 * 手に入れたアイテムの情報を取得
	 * @param id
	 * @return
	 */
	@PostMapping("/itemLoad")
	@ResponseBody
	public Item itemLoad(@RequestParam("id") Integer id) {
		Item item=itemService.itemLoadById(id);
		return item;
	}
	
	@PostMapping("/itemByGenre")
	@ResponseBody
	public Item itemByGenre(@RequestParam("genre") String genre) {
		Item item=itemService.itemByGenre(genre);
		return item; 
	}
	
	@PostMapping("/unionItemLoad")
	@ResponseBody
	public UnionItem unionItemLoad(@RequestParam("id") Integer id) {
		UnionItem unionItem=itemService.unionItemLoad(id);
		return unionItem;
	}
	

	/**
	 * ページ更新時に持ち物を表示
	 * 
	 * @return
	 */
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
		Item item = itemService.itemLoadById(id);
		myItemInsert(item);
		return myItemList();
	}

	/**
	 * 使用したアイテムを持ち物リストから削除
	 * 
	 * @param itemId
	 * @return
	 */
	@PostMapping("/deleteMyItem")
	@ResponseBody
	public List<MyItem> deleteMyItem(@RequestParam("itemId") Integer itemId,
			@RequestParam("myItemId") Integer myItemId) {
		itemService.myItemDelete(myItemId);
		deleteItemInsert(itemId);
		return myItemList();
	}

	/**
	 * 画面内のアイテムの表示を隠す
	 * 
	 * @param itemId
	 */
	@PostMapping("/hideItem")
	@ResponseBody
	public void hideItem(@RequestParam("itemId") Integer itemId) {
		User user=(User) session.getAttribute("userLogin");
		boolean exists=itemService.deleteItemExists(itemId, user.getId());
		if(!exists) {
			deleteItemInsert(itemId);	
		}		
	}

	/**
	 * アイテムの結合
	 * @param unionId
	 * @param myItemId1
	 * @param myItemId2
	 * @return
	 */
	@PostMapping("/union")
	@ResponseBody
	public List<MyItem> union(@RequestParam("unionId") Integer unionId,
			@RequestParam("myItemId1") Integer myItemId1,@RequestParam("myItemId2") Integer myItemId2) {		
		UnionItem unionItem = itemService.unionItemLoad(unionId);
		MyItem myItem = new MyItem();
		BeanUtils.copyProperties(unionItem, myItem);
		User user = (User) session.getAttribute("userLogin");
		myItem.setUserId(user.getId());
		itemService.myItemInsert(myItem);
		itemService.myItemDelete(myItemId1);
		itemService.myItemDelete(myItemId2);
		return myItemList();
	}
	
	/**
	 * 結合したアイテムをもとに戻す
	 * @param unionId
	 * @param myItemId
	 * @param itemId
	 * @return
	 */
	@PostMapping("/resetUnion")
	@ResponseBody
	public List<MyItem> resetUnion(@RequestParam("unionId") Integer unionId,
			@RequestParam("myItemId") Integer myItemId){
		Item item=itemService.itemLoadByUnionId(unionId);
		itemService.myItemDelete(myItemId);
		myItemInsert(item);
		return myItemList();
	}
		
	/**
	 * アイテムを変化させる
	 * @param changeId
	 */
	@PostMapping("/changeItem")
	@ResponseBody
	public void changeItem(@RequestParam("changeId") Integer changeId) {
		User user=(User) session.getAttribute("userLogin");
		itemService.changeItemInsert(user.getId(), changeId);
	}
	
	/**
	 * 持ち物に追加
	 * @param item
	 */
	public void myItemInsert(Item item) {
		MyItem myItem = new MyItem();
		User user = (User) session.getAttribute("userLogin");
		BeanUtils.copyProperties(item, myItem);
		myItem.setItemId(item.getId());
		myItem.setUserId(user.getId());
		itemService.myItemInsert(myItem);

	}
	
	/**
	 * アイテムの移動
	 * @param itemId
	 * @param myItemId
	 * @return
	 */
	@PostMapping("/moveItem")
	@ResponseBody
	public List<MyItem> moveItem(@RequestParam("itemId") Integer itemId,
			@RequestParam("myItemId") Integer myItemId,@RequestParam("moveId") Integer moveId) {
		itemService.myItemDelete(myItemId);
		Item item=itemService.itemLoadById(itemId);
		MoveItem moveItem=new MoveItem();
		BeanUtils.copyProperties(item, moveItem);
		User user=(User) session.getAttribute("userLogin");
		moveItem.setUserId(user.getId());
		moveItem.setItemId(itemId);
		moveItem.setMoveId(moveId);
		itemService.moveItemInsert(moveItem);
		return myItemList();
	}
	
	/**
	 * 移動したアイテム
	 * @return
	 */
	@PostMapping("/getMoveItem")
	@ResponseBody
	public List<MoveItem> moveItemList(){
		User user=(User) session.getAttribute("userLogin");
		List<MoveItem> moveItemList=itemService.moveItemFindAll(user.getId());
		return moveItemList;
	}
	
	/**
	 * 移動したアイテムの情報を削除
	 * @param itemId
	 */
	@PostMapping("/moveItemDelete")
	@ResponseBody
	public void moveItemDelete(@RequestParam("id") Integer itemId) {
		User user=(User) session.getAttribute("userLogin");
		itemService.moveItemDelete(itemId, user.getId());
	}

	/**
	 * 持ち物の呼び出し
	 * 
	 * @return myItemのリスト
	 */
	public List<MyItem> myItemList() {
		List<MyItem> myItemList = null;
		if (session.getAttribute("userLogin") != null) {
			User user = (User) session.getAttribute("userLogin");
			myItemList = itemService.MyItemListByUser(user.getId());
			session.setAttribute("MyItemList", myItemList);
		}
		return myItemList;
	}

	/**
	 * アイテムを削除リストに追加
	 * 
	 * @param itemId
	 */
	public void deleteItemInsert(Integer itemId) {
		User user = (User) session.getAttribute("userLogin");
		DeleteItem deleteItem = new DeleteItem();
		deleteItem.setItemId(itemId);
		deleteItem.setUserId(user.getId());
		itemService.deleteItemInsert(deleteItem);
	}
}
