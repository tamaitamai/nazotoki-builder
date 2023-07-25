package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.domain.DeleteItem;
import com.example.domain.Item;
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
	 * ユニオンidに対応する合体後アイテムの情報を取り出し
	 * @param unionId
	 * @return
	 */
	public UnionItem unionItemLoad(Integer unionId) {
		return itemRepository.unionItemLoad(unionId);
	}
	
	/**
	 * アイテムの変化情報
	 * @param id
	 * @return
	 */
	public Integer changeItemLoad(Integer id) {
		return itemRepository.changeItemLoad(id);
	}
	
	/**
	 * 変化後のアイテムを表示できるようにする
	 * @param id
	 */
	public void changeItemUpdate(Integer id) {
		itemRepository.changeItemUpdate(id);
	}

}
