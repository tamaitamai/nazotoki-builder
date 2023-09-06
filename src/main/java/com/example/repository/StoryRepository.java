package com.example.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import com.example.domain.ChapterCharacter;
import com.example.domain.Character;
import com.example.domain.SelectStory;
import com.example.domain.Story;
import com.example.domain.HistoryStory;

@Repository
public class StoryRepository {
	@Autowired
	private NamedParameterJdbcTemplate template;

	private static final RowMapper<Character> CHARACTER_ROW_MAPPER = (rs, i) -> {
		Character character = new Character();
		character.setId(rs.getInt("id"));
		character.setName(rs.getString("name"));
		character.setImage(rs.getString("image"));
		character.setExplanation(rs.getString("explanation"));
		return character;
	};

	private static final RowMapper<Story> STORY_ROW_MAPPER = (rs, i) -> {
		Story story = new Story();
		story.setId(rs.getInt("id"));
		story.setName(rs.getString("name"));
		story.setComment(rs.getString("comment"));
		story.setChapterId(rs.getInt("chapter_id"));
		story.setCharacterId(rs.getInt("character_id"));
		story.setSelectId(rs.getInt("select_id"));
		story.setSelectOpenId(rs.getInt("select_open_id"));
		story.setCommentOpenId(rs.getInt("comment_open_id"));
		story.setGameOverId(rs.getInt("game_over_id"));
		story.setActionId(rs.getInt("action_id"));
		story.setFace(rs.getString("face"));
		return story;
	};

	private static final RowMapper<ChapterCharacter> CHAPTER_CHARACTER_ROW_MAPPER = (rs, i) -> {
		ChapterCharacter chapterCharacter = new ChapterCharacter();
		chapterCharacter.setId(rs.getInt("id"));
		chapterCharacter.setCharacterId(rs.getInt("character_id"));
		chapterCharacter.setChapterId(rs.getInt("chapter_id"));
		return chapterCharacter;
	};

	private static final RowMapper<SelectStory> SELECT_COMMENT_ROW_MAPPER = (rs, i) -> {
		SelectStory selectStory = new SelectStory();
		selectStory.setSelectComment(rs.getString("select_comment"));
		selectStory.setSelectId(rs.getInt("select_id"));
		return selectStory;
	};
	
	public static final RowMapper<HistoryStory> HISTOROY_STORY_ROW_MAPPER=(rs,i)->{
		Integer id=rs.getInt("id");
		String name=rs.getString("name");
		String comment=rs.getString("comment");
		Integer chapterId=rs.getInt("chapter_id");
		Integer userId=rs.getInt("user_id");
		HistoryStory historyStory=new HistoryStory(id,name,comment,chapterId,userId);
		return historyStory;
	};

	/**
	 * characterの全情報の取得
	 * 
	 * @return characterのリスト
	 */
	public List<Character> characterFindAll() {
		String sql = "select id,name,image,explanation from characters;";
		List<Character> characterList = template.query(sql, CHARACTER_ROW_MAPPER);
		return characterList;
	}

	/**
	 * idの一致するcharacterの情報を取得
	 * 
	 * @param id
	 * @return character
	 */
	public Character characterLoad(Integer id) {
		String sql = "select id,name,image,explanation from characters where id=:id;";
		SqlParameterSource param = new MapSqlParameterSource("id", id);
		Character character = template.queryForObject(sql, param, CHARACTER_ROW_MAPPER);
		return character;
	}
	
	/**
	 * キャラクターの表情変化
	 * @param face
	 * @param characterId
	 * @return
	 */
	public String actionCharacter(String face,Integer characterId) {
		String sql="select image from action_characters where image like :face and character_id=:characterId;";
		SqlParameterSource param=new MapSqlParameterSource("face","%"+face+"%").addValue("characterId", characterId);
		String image=template.queryForObject(sql, param, String.class);
		return image;
	}
	
	/**
	 * idの一致するストーリー情報
	 * @param id
	 * @return
	 */
	public Story storyById(Integer id) {
		String sql = "select id,name,comment,chapter_id,character_id,select_id,select_open_id,comment_open_id,game_over_id,action_id,face"
				+ " from storys where id=:id;";
		SqlParameterSource param=new MapSqlParameterSource("id",id);
		Story story=template.queryForObject(sql, param, STORY_ROW_MAPPER);
		return story;
	}

	/**
	 * chapterごとのstoryのリスト
	 * 
	 * @param chapterId
	 * @return
	 */
	public List<Story> storyByChapterId(Integer chapterId) {
		String sql = "select id,name,comment,chapter_id,character_id,select_id,select_open_id,comment_open_id,game_over_id,action_id,face"
				+ " from storys where chapter_id=:chapterId;";
		SqlParameterSource param = new MapSqlParameterSource("chapterId", chapterId);
		List<Story> storyList = template.query(sql, param, STORY_ROW_MAPPER);
		return storyList;
	}

	/**
	 * 選択肢の結果
	 * 
	 * @param chapterId
	 * @param selectId
	 * @return
	 */
	public List<Story> storyBySelectId(Integer chapterId, Integer selectId, Integer selectOpenId) {
		String sql = "select id,name,comment,chapter_id,character_id,select_id,select_open_id,comment_open_id,game_over_id,action_id,face"
				+ " from storys where chapter_id=:chapterId and select_id=:selectId and comment_open_id=:selectOpenId;";
		SqlParameterSource param = new MapSqlParameterSource("chapterId", chapterId).addValue("selectId", selectId)
				.addValue("selectOpenId", selectOpenId);
		List<Story> storyList = template.query(sql, param, STORY_ROW_MAPPER);
		return storyList;
	}
	
	/**
	 * 各chapterごとに登場するキャラクター情報
	 * 
	 * @param chapterId
	 * @return
	 */
	public List<ChapterCharacter> chapterCharacterLoad(Integer chapterId) {
		String sql = "select id,character_id,chapter_id from chapter_characters where chapter_id=:chapterId;";
		SqlParameterSource param = new MapSqlParameterSource("chapterId", chapterId);
		List<ChapterCharacter> chapterCharacterList = template.query(sql, param, CHAPTER_CHARACTER_ROW_MAPPER);
		return chapterCharacterList;
	}

	/**
	 * 既読済みかを判定
	 * 
	 * @param userId
	 * @param chapterId
	 * @return
	 */
	public boolean readStoryLoad(Integer userId, Integer chapterId) {
		String sql = "select exists(select from read_storys where user_id=:userId and chapter_id=:chapterId);";
		SqlParameterSource param = new MapSqlParameterSource("userId", userId).addValue("chapterId", chapterId);
		boolean exists = template.queryForObject(sql, param, boolean.class);
		return exists;
	}

	/**
	 * 既読をつける
	 * 
	 * @param userId
	 * @param chapterId
	 */
	public void readStoryInsert(Integer userId, Integer chapterId) {
		String sql = "insert into read_storys(user_id,chapter_id)values(:userId,:chapterId);";
		SqlParameterSource param = new MapSqlParameterSource("userId", userId).addValue("chapterId", chapterId);
		template.update(sql, param);
	}

	/**
	 * 各ステージの背景情報を取得
	 * 
	 * @param chapterId
	 * @return
	 */
	public String backgroundStoryLoad(Integer chapterId) {
		String sql = "select image from background_storys where chapter_id=:chapterId;";
		SqlParameterSource param = new MapSqlParameterSource("chapterId", chapterId);
		String image = template.queryForObject(sql, param, String.class);
		return image;
	}

	/**
	 * 各ステージの選択肢一覧を確保
	 * 
	 * @param chapterId
	 * @return
	 */
	public List<SelectStory> selectCommentFindAll(Integer chapterId, Integer selectOpenId) {
		String sql = "select select_id,select_comment from select_storys where chapter_id=:chapterId and select_open_id=:selectOpenId;";
		SqlParameterSource param = new MapSqlParameterSource("chapterId", chapterId).addValue("selectOpenId",
				selectOpenId);
		List<SelectStory> selectCommentList = template.query(sql, param, SELECT_COMMENT_ROW_MAPPER);
		return selectCommentList;
	}
	
	/**
	 * 会話ログに追加
	 * @param historyStory
	 */
	public void historyStoryInsert(HistoryStory historyStory) {
		if(!(historyStoryExists(historyStory.getUserId(),historyStory.getStoryId()))) {
			String sql="INSERT INTO history_storys(name,comment,chapter_id,user_id,story_id)\r\n"
					+ "VALUES(:name,:comment,:chapterId,:userId,:storyId);\r\n"
					+ "";
			SqlParameterSource param=new BeanPropertySqlParameterSource(historyStory);
			template.update(sql, param);			
			
		}
	}
	
	/**
	 * 各ステージのユーザーの履歴の表示
	 * @param chapterId
	 * @param userId
	 * @return
	 */
	public List<HistoryStory> historyStoryFindAll(Integer chapterId,Integer userId){
		String sql="select id,name,comment,chapter_id,user_id from history_storys where chapter_id=:chapterId and user_id=:userId;";
		SqlParameterSource param=new MapSqlParameterSource("chapterId",chapterId).addValue("userId", userId);
		List<HistoryStory> historyStoryList=template.query(sql, param,HISTOROY_STORY_ROW_MAPPER);
		return historyStoryList;
	}
	
	/**
	 * すでに履歴に存在するかを判定
	 * @param userId
	 * @param storyId
	 * @return
	 */
	public boolean historyStoryExists(Integer userId,Integer storyId) {
		String sql="SELECT EXISTS(SELECT FROM history_storys where user_id=:userId and story_id=:storyId);";
		SqlParameterSource param=new MapSqlParameterSource("userId",userId).addValue("storyId", storyId);
		boolean exists=template.queryForObject(sql, param, boolean.class);
		return exists;
	}
	
	/**
	 * 会話ログの削除
	 * @param chpaterId
	 * @param userId
	 */
	public void historyStorydelete(Integer chpaterId,Integer userId) {
		String sql="delete from history_storys where chapter_id=:chapterId and user_id=:userId;";
		SqlParameterSource param=new MapSqlParameterSource("chapterId",chpaterId).addValue("userId", userId);
		template.update(sql, param);
	}
}
