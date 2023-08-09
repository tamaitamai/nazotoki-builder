package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.domain.DeleteItem;
import com.example.domain.Item;
import com.example.domain.MoveItem;
import com.example.domain.MyItem;
import com.example.domain.UnionItem;
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
	 * unionIdの一致するアイテムの取り出し
	 * @param unionId
	 * @return
	 */
	public Item itemLoadByUnionId(Integer unionId) {
		return itemRepository.itemLoadByUnionId(unionId);
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
	public void myItemDelete(Integer id) {
		itemRepository.myItemDelete(id);
	}
	
	/**
	 * アイテムの削除リスト一覧の入手
	 * @return
	 */
	public List<DeleteItem> deleteItemFindAll(Integer userId){
		return itemRepository.deleteItemFindAll(userId);
	}
	
	/**
	 * アイテムを削除リストに追加
	 * @param delteItem
	 */
	public void deleteItemInsert(DeleteItem delteItem) {
		itemRepository.deleteItemInsert(delteItem);
	}
	
	/**
	 * アイテム削除リストにあるかの判別
	 * @param itemId
	 * @param userId
	 */
	public boolean deleteItemExists(Integer itemId,Integer userId) {
		return itemRepository.deleteItemExists(itemId, userId);
	}
	
	/**
	 * ユニオンidに対応する合体後アイテムの情報を取り出し
	 * @param unionId
	 * @return
	 */
	public UnionItem unionItemLoad(Integer unionId) {
		return itemRepository.unionItemLoad(unionId);
	}
	
	/**
	 * 変化情報を新しく加える
	 * @param userId
	 * @param changeId
	 */
	public void changeItemInsert(Integer userId,Integer changeId) {
		itemRepository.changeItemInsert(userId, changeId);
	}
	
	/**
	 * 変化情報があるか判別
	 * @param userId
	 * @param changeId
	 * @return
	 */
	public boolean changeExists(Integer userId, Integer changeId) {
		return itemRepository.changeExists(userId, changeId);
	}

	/**
	 * アイテムの移動保存テーブル
	 * @param item
	 */
	public void moveItemInsert(MoveItem moveItem) {
		itemRepository.moveItemInsert(moveItem);
	}
	
	/**
	 * 移動したアイテムの一覧
	 * @param userId
	 * @return
	 */
	public List<MoveItem> moveItemFindAll(Integer userId){
		return itemRepository.moveItemFindAll(userId);
	}

	/**
	 * 移動アイテムの削除
	 * @param itemId
	 * @param userId
	 */
	public void moveItemDelete(Integer itemId,Integer userId) {
		itemRepository.moveItemDelete(itemId, userId);
	}
}
