package com.example.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.domain.User;

@Repository
public class MainRepository {
	@Autowired
	private NamedParameterJdbcTemplate template;
	
	private static final RowMapper<User> USER_ROW_MAPPER=(rs,i)->{
		User user=new User();
		user.setId(rs.getInt("id"));
		user.setName(rs.getString("name"));
		return user;
	};
	
	public List<User> findAll(){
		String sql="select id,name from users;";
		List<User> userList=template.query(sql, USER_ROW_MAPPER);
		return userList;		
	}
}
