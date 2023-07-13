package com.example.form;

import jakarta.validation.constraints.NotBlank;

public class UserForm {
	@NotBlank(message="名前を入力してください")
	private String name;
	@NotBlank(message="メールを入力してください")
	private String mail;
	@NotBlank(message="パスワードを入力してください")
	private String password;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "UserForm [name=" + name + ", mail=" + mail + ", password=" + password + "]";
	}
}
