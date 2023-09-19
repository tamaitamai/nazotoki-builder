package com.example.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import com.example.domain.Chapter;
import com.example.domain.EntryCharacter;
import com.example.domain.Save;

@Repository
public class ChapterRepository {
	@Autowired
	private NamedParameterJdbcTemplate template;
	
	private static final RowMapper<Chapter> CHAPTER_ROW_MAPPER=(rs,i)->{
		Chapter chapter=new Chapter();
		chapter.setId(rs.getInt("id"));
		chapter.setName(rs.getString("name"));
		chapter.setUrl(rs.getString("url"));
		chapter.setChapterId(rs.getInt("chapter_id"));
		return chapter;
	};
	
	private static final RowMapper<Save> SAVE_ROW_MAPPER=(rs,i)->{
		Save save=new Save();
		save.setId(rs.getInt("id"));
		save.setUserId(rs.getInt("user_id"));
		save.setChapterId(rs.getInt("chapter_id"));
		save.setName(rs.getString("name"));
		save.setUrl(rs.getString("url"));
		save.setSaveDate(rs.getString("save_date"));
		return save;
	};
	
	private static final RowMapper<EntryCharacter> ENTRY_CHARACTER_ROW_MAPPER=(rs,i)->{
		EntryCharacter entryCharacter=new EntryCharacter();
		entryCharacter.setId(rs.getInt("id"));
		entryCharacter.setUserId(rs.getInt("user_Id"));
		entryCharacter.setCharacterId(rs.getInt("character_id"));
		entryCharacter.setName(rs.getString("name"));
		entryCharacter.setImage(rs.getString("image"));
		entryCharacter.setExplanation(rs.getString("explanation"));
		return entryCharacter;
	};
	
	/**
	 * chapter情報の取得
	 * @param chapterId
	 * @return
	 */
	public Chapter chapterLoad(Integer chapterId) {
		String sql="select id,name,url,chapter_id from chapters where chapter_id=:chapterId;";
		SqlParameterSource param=new MapSqlParameterSource("chapterId",chapterId);
		Chapter chapter=template.queryForObject(sql, param, CHAPTER_ROW_MAPPER);
		return chapter;
	}
	
	/**
	 * 新規セーブデータ
	 * @param save
	 */
	public void saveInsert(Save save) {
		String sql="INSERT INTO saves(user_id,chapter_id,name,url,save_date)\r\n"
				+ "VALUES(:userId,:chapterId,:name,:url,:saveDate);";
		SqlParameterSource param=new BeanPropertySqlParameterSource(save);
		template.update(sql, param);
	}
	
	/**
	 * セーブデータの更新
	 * @param save
	 */
	public void saveUpdate(Save save) {
		String sql="UPDATE saves SET chapter_id=:chapterId, name=:name, url=:url, save_date=:saveDate "
				+ "where user_id=:userId;";
		SqlParameterSource param=new BeanPropertySqlParameterSource(save);
		template.update(sql, param);		
	}
	
	/**
	 * ユーザーのセーブデータを取り出し
	 * @param userId
	 * @return
	 */
	public Save saveLoad(Integer userId) {
		String sql="select id,user_id,chapter_id,name,url,save_date from saves where user_id=:userId;";
		SqlParameterSource param=new MapSqlParameterSource("userId",userId);
		List<Save> saveList=template.query(sql, param, SAVE_ROW_MAPPER);
		if(saveList.size()==0) {
			return null;
		}
		return saveList.get(0);
	}
	
	/**
	 * セーブデータの削除
	 * @param userId
	 */
	public void saveDelete(Integer userId) {
		String sql="delete from saves where user_id=:userId;";
		SqlParameterSource param=new MapSqlParameterSource("userId",userId);
		template.update(sql, param);
	}
	
	/**
	 * キャラクターリストに追加
	 * @param entryCharacter
	 */
	public void entryCharacterInsert(EntryCharacter entryCharacter) {
		if(!(entryExists(entryCharacter.getUserId(), entryCharacter.getCharacterId()))) {
			String sql="insert into entry_characters(user_id,character_id,name,image,explanation)\r\n"
					+ "values(:userId,:characterId,:name,:image,:explanation);";		
			SqlParameterSource param=new BeanPropertySqlParameterSource(entryCharacter);
			template.update(sql, param);			
		}
	}
	
	/**
	 * 各ユーザーのキャラクターリスト
	 * @param userId
	 * @return
	 */
	public List<EntryCharacter> entryCharacterList(Integer userId){
		String sql="select id,user_id,character_id,image,name,explanation from entry_characters where user_id=:userId;";
		SqlParameterSource param=new MapSqlParameterSource("userId",userId);
		List<EntryCharacter> entryCharacterList=template.query(sql, param,ENTRY_CHARACTER_ROW_MAPPER);
		return entryCharacterList;
	}
	
	/**
	 * すでにキャラクターがリストにあるかを確認
	 * @param userId
	 * @param characterId
	 * @return
	 */
	public boolean entryExists(Integer userId,Integer characterId) {
		String sql="select exists(select * from entry_characters where user_id=:userId and character_id=:characterId);";
		SqlParameterSource param=new MapSqlParameterSource("userId",userId).addValue("characterId", characterId);
		boolean exists=template.queryForObject(sql, param, boolean.class);
		return exists;
	}
}
