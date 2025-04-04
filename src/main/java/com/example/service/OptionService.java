package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.domain.Option;
import com.example.repository.OptionRepository;

@Service
@Transactional
public class OptionService {
	@Autowired
	private OptionRepository optionRepository;
	
	/**
	 * ユーザーのオプション情報の抜き出し
	 * @param userId
	 * @return
	 */
	public Option optionLoad(Integer userId) {
		return optionRepository.optionLoad(userId);
	}
	
	/**
	 * 初めてオプション情報が設定されたときに情報の追加
	 * @param option
	 */
	public void optionInsert(Option option) {
		optionRepository.optionInsert(option);
	}
	
	/**
	 * セリフのスピードの更新
	 * @param commentSpeed
	 * @param userId
	 */
	public void commentSpeedUpdate(Option option) {
		optionRepository.commentSpeedUpdate(option);
	}

}
