package com.example.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import com.example.domain.DeleteItem;
import com.example.domain.Item;
import com.example.domain.MyItem;
import com.example.domain.UnionItem;

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
		item.setChangeId(rs.getInt("change_id"));
		item.setHave(rs.getInt("have"));
		item.setGenre(rs.getString("genre"));
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
		myItem.setGenre(rs.getString("genre"));
		return myItem;
	};

	private static RowMapper<DeleteItem> DELETE_ITEM_ROW_MAPPER=(rs,i)->{
		DeleteItem deleteItem=new DeleteItem();
		deleteItem.setId(rs.getInt("id"));
		deleteItem.setItemId(rs.getInt("item_id"));
		deleteItem.setUserId(rs.getInt("user_id"));
		return deleteItem;
	};
	
	private static RowMapper<UnionItem> UNION_ITEM_ROW_MAPPER=(rs,i)->{
		UnionItem unionItem=new UnionItem();
		unionItem.setId(rs.getInt("id"));
		unionItem.setName(rs.getString("name"));
		unionItem.setImage(rs.getString("image"));
		unionItem.setExplanation(rs.getString("explanation"));
		unionItem.setUnionId(rs.getInt("union_id"));
		unionItem.setGenre(rs.getString("genre"));
		return unionItem;
	};
	
	/**
	 * 各章ごとのアイテムの一覧を入手
	 * 
	 * @param chapterId
	 * @return itemのリスト
	 */
	public List<Item> itemByChapter(Integer chapterId) {
		String sql = "select id,name,image,explanation,chapter_id,union_id,change_id,have,genre from items "
				+ "where chapter_id=:chapterId order by id;";
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
		String sql="select id,name,image,explanation,chapter_id,union_id,change_id,have,genre from items where id=:id;";
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
		String sql = "INSERT INTO my_items(user_id,name,image,explanation,union_id,item_id,genre)"
				+ "values(:userId,:name,:image,:explanation,:unionId,:itemId,:genre)";
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
		String sql = "select id,user_id,name,image,explanation,union_id,item_id,genre from my_items where user_id=:userId;";
		SqlParameterSource param = new MapSqlParameterSource("userId", userId);
		List<MyItem> myItemList = template.query(sql, param, MY_ITEM_ROW_MAPPER);
		return myItemList;
	}
	
	/**
	 * 持ち物から使用したアイテムを削除
	 * @param itemId
	 */
	public void myItemDelete(Integer id) {
		String sql="delete from my_items where id=:id";
		SqlParameterSource param=new MapSqlParameterSource("id",id);
		template.update(sql, param);
	}
	
	/**
	 * アイテムの削除リスト一覧の入手
	 * @return
	 */
	public List<DeleteItem> deleteItemFindAll(Integer userId){
		String sql="select id,item_id,user_id from delete_items where user_id=:userId;";
		SqlParameterSource param=new MapSqlParameterSource("userId",userId);
		List<DeleteItem> deleteItemList=template.query(sql,param, DELETE_ITEM_ROW_MAPPER);
		return deleteItemList;
	}
	
	/**
	 * アイテムを削除リストに追加
	 * @param delteItem
	 */
	public void deleteItemInsert(DeleteItem delteItem) {
		String sql="insert into delete_items(item_id,user_id)values(:itemId,:userId);";
		SqlParameterSource param=new BeanPropertySqlParameterSource(delteItem);
		template.update(sql, param);
	}
	
	/**
	 * ユニオンidに対応する合体後アイテムの情報を取り出し
	 * @param unionId
	 * @return
	 */
	public UnionItem unionItemLoad(Integer unionId) {
		String sql="select id,name,image,explanation,union_id,genre from union_items where union_id=:unionId;";
		SqlParameterSource param=new MapSqlParameterSource("unionId",unionId);
		UnionItem unionItem=template.queryForObject(sql, param, UNION_ITEM_ROW_MAPPER);
		return unionItem;
	}
	
	/**
	 * アイテムの変化情報
	 * @param id
	 * @return
	 */
	public Integer changeItemLoad(Integer id) {
		String sql="select change from change_items where id=:id;";
		SqlParameterSource param=new MapSqlParameterSource("id",id);
		Integer change=template.queryForObject(sql, param, Integer.class);
		return change;
	}
	
	/**
	 * 変化後のアイテムを表示できるようにする
	 * @param id
	 */
	public void changeItemUpdate(Integer id) {
		String sql="update change_items set change=1 where id=:id;";
		SqlParameterSource param=new MapSqlParameterSource("id",id);
		template.update(sql, param);
	}
}
