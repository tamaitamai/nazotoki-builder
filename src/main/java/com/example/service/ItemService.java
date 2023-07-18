package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.domain.Item;
import com.example.domain.MyItem;
import com.example.repository.ItemRepository;

@Service
@Transactional
public class ItemService {
	@Autowired
	private ItemRepository itemRepository;
	
	/**
	 * 各章ごとのアイテムの一覧を入手
	 * 
	 * @param chapterId
	 * @return itemのリスト
	 */
	public List<Item> itemByChapter(Integer chapterId){
		return itemRepository.itemByChapter(chapterId);
	}
	
	/**
	 * idの一致するアイテムの取り出し
	 * 
	 * @param id
	 * @return
	 */
	public Item itemLoadById(Integer id) {
		return itemRepository.itemLoadById(id);
	}
	
	/**
	 * アイテムをすべて持っている状態にする
	 */
	public void itemHaveReset() {
		itemRepository.itemHaveReset();
	}
	
	/**
	 * アイテムの表示を変更
	 * 
	 * @param id
	 * @param have
	 */
	public void itemHaveUpdate(Integer id,Integer have) {
		itemRepository.itemHaveUpdate(id, have);
	}

	
	/**
	 * 各ユーザーごとのアイテムボックスに入手したアイテムを加える
	 * 
	 * @param myItem
	 */
	public void myItemInsert(MyItem myItem) {
		itemRepository.MyItemInsert(myItem);
	}
	
	/**
	 * 各ユーザーのアイテムボックスを表示
	 * 
	 * @param userId
	 * @return MyItemのリスト
	 */
	public List<MyItem> MyItemListByUser(Integer userId){
		return itemRepository.MyItemListByUser(userId);
	}

	/**
	 * 持ち物から使用したアイテムを削除
	 * @param itemId
	 */
	public void myItemDelete(Integer itemId,Integer userId) {
		itemRepository.myItemDelete(itemId,userId);
	}
}
