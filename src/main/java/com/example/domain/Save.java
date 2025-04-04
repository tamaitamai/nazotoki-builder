package com.example.domain;

public class Save {
	private Integer id;
	private Integer userId;
	private Integer chapterId;
	private String name;
	private String url;
	private String saveDate;
	
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
	public Integer getChapterId() {
		return chapterId;
	}
	public void setChapterId(Integer chapterId) {
		this.chapterId = chapterId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getSaveDate() {
		return saveDate;
	}
	public void setSaveDate(String saveDate) {
		this.saveDate = saveDate;
	}
	@Override
	public String toString() {
		return "Save [id=" + id + ", userId=" + userId + ", chapterId=" + chapterId + ", name=" + name + ", url=" + url
				+ ", saveDate=" + saveDate + "]";
	}
	
}
