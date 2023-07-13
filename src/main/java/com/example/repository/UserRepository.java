package com.example.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import com.example.domain.User;

@Repository
public class UserRepository {
	@Autowired
	private NamedParameterJdbcTemplate template; 
	
	private static final RowMapper<User> USER_ROW_MAPPER = (rs, i) -> {
		User user = new User();
		user.setId(rs.getInt("id"));
		user.setName(rs.getString("name"));
		user.setMail(rs.getString("mail"));
		user.setPassword(rs.getString("password"));
		return user;
	};

	public void userInsert(User user) {
		String sql="INSERT INTO users(name,mail,password) values(:name,:mail,:password);";
		SqlParameterSource param=new BeanPropertySqlParameterSource(user);
		template.update(sql, param);
	}
	
	public User userLoad(String mail,String password) {
		String sql="select id,name,mail,password from users where mail=:mail and password=:password;";
		SqlParameterSource param=new MapSqlParameterSource("mail",mail).addValue("password", password);
		List<User> userList=template.query(sql, param, USER_ROW_MAPPER);
		if(userList.size()==0) {
			return null;
		}
		return userList.get(0);
	}
}
