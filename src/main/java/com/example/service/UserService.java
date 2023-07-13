package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.domain.User;
import com.example.repository.UserRepository;

@Service
@Transactional
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	public void userInsert(User user) {
		userRepository.userInsert(user);
	}
	
	public User userLoad(String mail,String password) {
		return userRepository.userLoad(mail, password);
	}
}
