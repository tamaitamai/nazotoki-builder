package com.example.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import com.example.domain.Option;

@Repository
public class OptionRepository {
	@Autowired
	private NamedParameterJdbcTemplate template;
	
	private static final RowMapper<Option> OPTION_ROW_MAPPER=(rs,i)->{
		Option option=new Option();
		option.setId(rs.getInt("id"));
		option.setUserId(rs.getInt("user_id"));
		option.setCommentSpeed(rs.getInt("comment_speed"));
		option.setAutoSpeed(rs.getInt("auto_speed"));
		return option;
	};
	
	/**
	 * ユーザーのオプション情報の抜き出し
	 * @param userId
	 * @return
	 */
	public Option optionLoad(Integer userId) {
		String sql="select id,user_id,comment_speed,auto_speed from options where user_id=:userId;";
		SqlParameterSource param=new MapSqlParameterSource("userId",userId);
		List<Option> optionList=template.query(sql, param,OPTION_ROW_MAPPER);
		if(optionList.size()==0) {
			return null;
		}
		return optionList.get(0);
	}
	
	/**
	 * 初めてオプション情報が設定されたときに情報の追加
	 * @param option
	 */
	public void optionInsert(Option option) {
		String sql="INSERT INTO options(user_id,comment_speed,auto_speed)VALUES(:userId,:commentSpeed,:autoSpeed);";
		SqlParameterSource param=new BeanPropertySqlParameterSource(option);
		template.update(sql, param);
	}
	
	/**
	 * セリフのスピードの更新
	 * @param commentSpeed
	 * @param userId
	 */
	public void commentSpeedUpdate(Option option) {
		String sql="UPDATE options SET comment_speed=:commentSpeed,auto_speed=:autoSpeed WHERE user_id=:userId;";
		SqlParameterSource param=new BeanPropertySqlParameterSource(option);
		template.update(sql, param);
	}
}
