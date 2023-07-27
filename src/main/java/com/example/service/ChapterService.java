package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.domain.Chapter;
import com.example.domain.Save;
import com.example.repository.ChapterRepository;

@Service
@Transactional
public class ChapterService {
	@Autowired
	private ChapterRepository chapterRepository;
	
	/**
	 * chapter情報の取得
	 * @param chapterId
	 * @return
	 */
	public Chapter chapterLoad(Integer chapterId) {
		return chapterRepository.chapterLoad(chapterId);
	}
	
	/**
	 * 新規セーブデータ
	 * @param save
	 */
	public void saveInsert(Save save) {
		chapterRepository.saveInsert(save);
	}
	
	/**
	 * セーブデータの更新
	 * @param save
	 */
	public void saveUpdate(Save save) {
		chapterRepository.saveUpdate(save);
	}
	
	/**
	 * ユーザーのセーブデータを取り出し
	 * @param userId
	 * @return
	 */
	public Save saveLoad(Integer userId) {
		return chapterRepository.saveLoad(userId);
	}

	/**
	 * セーブデータの削除
	 * @param userId
	 */
	public void saveDelete(Integer userId) {
		chapterRepository.saveDelete(userId);
	}
}
