package com.example.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import com.example.domain.Item;
import com.example.domain.MyItem;

@Repository
public class ItemRepository {
	@Autowired
	private NamedParameterJdbcTemplate template;

	private static final RowMapper<Item> ITEM_ROW_MAPPER = (rs, i) -> {
		Item item = new Item();
		item.setId(rs.getInt("id"));
		item.setName(rs.getString("name"));
		item.setImage(rs.getString("image"));
		item.setExplanation(rs.getString("explanation"));
		item.setChapterId(rs.getInt("chapter_id"));
		item.setUnionId(rs.getInt("union_id"));
		item.setHave(rs.getInt("have"));
		return item;
	};

	private static final RowMapper<MyItem> MY_ITEM_ROW_MAPPER = (rs, i) -> {
		MyItem myItem = new MyItem();
		myItem.setId(rs.getInt("id"));
		myItem.setUserId(rs.getInt("user_id"));
		myItem.setName(rs.getString("name"));
		myItem.setImage(rs.getString("image"));
		myItem.setExplanation(rs.getString("explanation"));
		myItem.setUnionId(rs.getInt("union_id"));
		myItem.setItemId(rs.getInt("item_id"));
		return myItem;
	};

	/**
	 * 各章ごとのアイテムの一覧を入手
	 * 
	 * @param chapterId
	 * @return itemのリスト
	 */
	public List<Item> itemByChapter(Integer chapterId) {
		String sql = "select id,name,image,explanation,chapter_id,union_id,have from items where chapter_id=:chapterId;";
		SqlParameterSource param = new MapSqlParameterSource("chapterId", chapterId);
		List<Item> itemList = template.query(sql, param, ITEM_ROW_MAPPER);
		return itemList;
	}

	/**
	 * idの一致するアイテムの取り出し
	 * 
	 * @param id
	 * @return
	 */
	public Item itemLoadById(Integer id) {
		String sql="select id,name,image,explanation,chapter_id,union_id,have from items where id=:id;";
		SqlParameterSource param=new MapSqlParameterSource("id",id);
		Item item=template.queryForObject(sql, param, ITEM_ROW_MAPPER);
		return item;
	}
	
	/**
	 * アイテムをすべて持っている状態にする
	 */
	public void itemHaveReset() {
		String sql="update items set have=1;";
		template.update(sql, new MapSqlParameterSource());
	}
	
	/**
	 * アイテムの表示を変更
	 * 
	 * @param id
	 * @param have
	 */
	public void itemHaveUpdate(Integer id,Integer have) {
		String sql="update items set have=:have where id=:id;";
		SqlParameterSource param=new MapSqlParameterSource("id",id).addValue("have", have);
		template.update(sql,param);		
	}

	/**
	 * 各ユーザーごとのアイテムボックスに入手したアイテムを加える
	 * 
	 * @param myItem
	 */
	public void MyItemInsert(MyItem myItem) {
		String sql = "INSERT INTO my_items(user_id,name,image,explanation,union_id,item_id)"
				+ "values(:userId,:name,:image,:explanation,:unionId,:itemId)";
		SqlParameterSource param = new BeanPropertySqlParameterSource(myItem);
		template.update(sql, param);
	}

	/**
	 * 各ユーザーのアイテムボックスを表示
	 * 
	 * @param userId
	 * @return MyItemのリスト
	 */
	public List<MyItem> MyItemListByUser(Integer userId) {
		String sql = "select id,user_id,name,image,explanation,union_id,item_id from my_items where user_id=:userId;";
		SqlParameterSource param = new MapSqlParameterSource("userId", userId);
		List<MyItem> myItemList = template.query(sql, param, MY_ITEM_ROW_MAPPER);
		return myItemList;
	}
}
