package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.domain.ChapterCharacter;
import com.example.domain.Character;
import com.example.domain.HistoryStory;
import com.example.domain.SelectStory;
import com.example.domain.Story;
import com.example.repository.StoryRepository;

@Service
@Transactional
public class StoryService {
	@Autowired
	private StoryRepository storyRepository;
		
	/**
	 * characterのリスト
	 * @return
	 */
	public List<Character> characterFindAll(){
		return storyRepository.characterFindAll();
	}
	
	/**
	 * idの一致するcharacterの情報を取得
	 * @param id
	 * @return character
	 */
	public Character characterLoad(Integer id) {
		return storyRepository.characterLoad(id);
	}
	
	/**
	 * キャラクターの表情変化
	 * @param face
	 * @param characterId
	 * @return
	 */
	public String actionCharacter(String face,Integer characterId) {
		return storyRepository.actionCharacter(face, characterId);
	}

	/**
	 * idの一致するストーリー情報
	 * @param id
	 * @return
	 */
	public Story storyById(Integer id) {
		return storyRepository.storyById(id);
	}
	
	/**
	 * chapterごとのstoryのリスト
	 * @param chapterId
	 * @return
	 */
	public List<Story> storyByChapterId(Integer chapterId){
		return storyRepository.storyByChapterId(chapterId);
	}

	/**
	 * 各chapterごとに登場するキャラクター情報
	 * @param chapterId
	 * @return
	 */
	public List<ChapterCharacter> chapterCharacterLoad(Integer chapterId) {
		return storyRepository.chapterCharacterLoad(chapterId);
	}
	
	/**
	 * 選択肢の結果
	 * 
	 * @param chapterId
	 * @param selectId
	 * @return
	 */
	public List<Story> storyBySelectId(Integer chapterId, Integer selectId, Integer selectOpenId) {
		return storyRepository.storyBySelectId(chapterId, selectId, selectOpenId);
	}
	
	/**
	 * 既読済みかを判定
	 * @param userId
	 * @param chapterId
	 * @return
	 */
	public boolean readStoryLoad(Integer userId,Integer chapterId) {
		return storyRepository.readStoryLoad(userId, chapterId);
	}
	
	/**
	 * 既読をつける
	 * @param userId
	 * @param chapterId
	 */
	public void readStoryInsert(Integer userId,Integer chapterId) {
		storyRepository.readStoryInsert(userId, chapterId);
	}

	/**
	 * 各ステージの背景情報を取得
	 * @param chapterId
	 * @return
	 */
	public String backgroundStoryLoad(Integer chapterId) {
		return storyRepository.backgroundStoryLoad(chapterId);
	}
	
	/**
	 * 各ステージの選択肢一覧を確保
	 * @param chapterId
	 * @return
	 */
	public List<SelectStory> selectCommentFindAll(Integer chapterId,Integer selectOpenId){
		return storyRepository.selectCommentFindAll(chapterId,selectOpenId);
	}

	/**
	 * 会話ログに追加
	 * @param historyStory
	 */
	public void historyStoryInsert(HistoryStory historyStory) {
		storyRepository.historyStoryInsert(historyStory);
	}
	
	/**
	 * 各ステージのユーザーの履歴の表示
	 * @param chapterId
	 * @param userId
	 * @return
	 */
	public List<HistoryStory> historyStoryFindAll(Integer chapterId,Integer userId){
		return storyRepository.historyStoryFindAll(chapterId,userId);
	}

	/**
	 * 会話ログの削除
	 * @param chpaterId
	 * @param userId
	 */
	public void historyStorydelete(Integer chpaterId,Integer userId) {
		storyRepository.historyStorydelete(chpaterId, userId);
	}

}
