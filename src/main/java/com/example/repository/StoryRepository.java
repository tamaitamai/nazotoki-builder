package com.example.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import com.example.domain.ChapterCharacter;
import com.example.domain.Character;
import com.example.domain.Story;

@Repository
public class StoryRepository {
	@Autowired
	private NamedParameterJdbcTemplate template;
	
	private static final RowMapper<Character> CHARACTER_ROW_MAPPER=(rs,i)->{
		Character character=new Character();
		character.setId(rs.getInt("id"));
		character.setName(rs.getString("name"));
		character.setImage(rs.getString("image"));
		character.setExplanation(rs.getString("explanation"));
		return character;
	};
	
	private static final RowMapper<Story> STORY_ROW_MAPPER=(rs,i)->{
		Story story=new Story();
		story.setId(rs.getInt("id"));
		story.setName(rs.getString("name"));
		story.setComment(rs.getString("comment"));
		story.setChapterId(rs.getInt("chapter_id"));
		story.setCharacterId(rs.getInt("character_id"));
		return story;
	};
	
	private static final RowMapper<ChapterCharacter> CHAPTER_CHARACTER_ROW_MAPPER=(rs,i)->{
		ChapterCharacter chapterCharacter=new ChapterCharacter();
		chapterCharacter.setId(rs.getInt("id"));
		chapterCharacter.setCharacterId(rs.getInt("character_id"));
		chapterCharacter.setChapterId(rs.getInt("chapter_id"));
		return chapterCharacter;
	};
	
	/**
	 * characterの全情報の取得
	 * @return characterのリスト
	 */
	public List<Character> characterFindAll(){
		String sql="select id,name,image,explanation from characters;";
		List<Character> characterList=template.query(sql, CHARACTER_ROW_MAPPER);
		return characterList;
	}
	
	/**
	 * idの一致するcharacterの情報を取得
	 * @param id
	 * @return character
	 */
	public Character characterLoad(Integer id) {
		String sql="select id,name,image,explanation from characters where id=:id;";
		SqlParameterSource param=new MapSqlParameterSource("id",id);
		Character character=template.queryForObject(sql, param, CHARACTER_ROW_MAPPER);
		return character;
	}
	
	/**
	 * chapterごとのstoryのリスト
	 * @param chapterId
	 * @return
	 */
	public List<Story> storyByChapterId(Integer chapterId){
		String sql="select id,name,comment,chapter_id,character_id from storys where chapter_id=:chapterId;";
		SqlParameterSource param=new MapSqlParameterSource("chapterId",chapterId);
		List<Story> storyList=template.query(sql, param,STORY_ROW_MAPPER);
		return storyList;
	}
	
	/**
	 * 各chapterごとに登場するキャラクター情報
	 * @param chapterId
	 * @return
	 */
//	public ChapterCharacter chapterCharacterLoad(Integer chapterId) {
//		String sql="select id,character_id1,character_id2,chapter_id from chapter_characters where chapter_id=:chapterId;";
//		SqlParameterSource param=new MapSqlParameterSource("chapterId",chapterId);
//		ChapterCharacter chapterCharacter=template.queryForObject(sql, param, CHAPTER_CHARACTER_ROW_MAPPER);
//		return chapterCharacter;
//	}
	public List<ChapterCharacter> chapterCharacterLoad(Integer chapterId) {
		String sql="select id,character_id,chapter_id from chapter_characters where chapter_id=:chapterId;";
		SqlParameterSource param=new MapSqlParameterSource("chapterId",chapterId);
		List<ChapterCharacter> chapterCharacterList=template.query(sql, param, CHAPTER_CHARACTER_ROW_MAPPER);
		return chapterCharacterList;
	}

}
