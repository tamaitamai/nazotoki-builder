package com.example.domain;

public class Option {
	private Integer id;
	private Integer userId;
	private Integer commentSpeed;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Integer getCommentSpeed() {
		return commentSpeed;
	}
	public void setCommentSpeed(Integer commentSpeed) {
		this.commentSpeed = commentSpeed;
	}
	@Override
	public String toString() {
		return "Option [id=" + id + ", userId=" + userId + ", commentSpeed=" + commentSpeed + "]";
	}
	
	
}
