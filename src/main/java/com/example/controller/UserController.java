package com.example.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.domain.Chapter;
import com.example.domain.Save;
import com.example.domain.User;
import com.example.form.UserForm;
import com.example.service.ChapterService;
import com.example.service.UserService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private ChapterService chapterService;

	@Autowired
	private HttpSession session;

	@GetMapping("/toLogin")
	public String toLogin(UserForm userForm) {
		return "user/login.html";
	}

	@PostMapping("login")
	public String login(UserForm userForm,RedirectAttributes redirect) {
		User user = userService.userLoad(userForm.getMail(), userForm.getPassword());
		if (user == null) {
			redirect.addFlashAttribute("loginError", "存在しないユーザーです");
			return "redirect:/user/toLogin";
		}
		session.setAttribute("userName", user.getName());
		session.setAttribute("userLogin", user);
		Save save=chapterService.saveLoad(user.getId());
		if(save==null) {
			return "redirect:/question/light";	
		}else {
			return "redirect:/question/"+save.getUrl();
		}		
	}

	@GetMapping("/toInsert")
	public String toInsert(UserForm userForm) {
		return "user/insert.html";
	}

	@PostMapping("/insert")
	public String insert(@Validated UserForm userForm, BindingResult result) {

		if (result.hasErrors()) {
			return toInsert(userForm);
		}

		User user = new User();
		BeanUtils.copyProperties(userForm, user);
		userService.userInsert(user);
		return "user/login.html";
	}

	@PostMapping("logOut")
	public String logOut() {
		session.removeAttribute("userLogin");
		return "main/home.html";
	}
}
