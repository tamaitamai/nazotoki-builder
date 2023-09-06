package com.example.domain;

public class HistoryStory {
	private Integer id;
	private String name;
	private String comment;
	private Integer chapterId;
	private Integer userId;
	private Integer storyId;
	
	public HistoryStory() {
		super();
		// TODO Auto-generated constructor stub
	}

	public HistoryStory(String name, String comment, Integer chapterId, Integer userId) {
		super();
		this.name = name;
		this.comment = comment;
		this.chapterId = chapterId;
		this.userId = userId;
	}
	
	public HistoryStory(Integer id, String name, String comment, Integer chapterId, Integer userId) {
		super();
		this.id = id;
		this.name = name;
		this.comment = comment;
		this.chapterId = chapterId;
		this.userId = userId;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public Integer getStoryId() {
		return storyId;
	}

	public void setStoryId(Integer storyId) {
		this.storyId = storyId;
	}

	public void setName(String name) {
		this.name = name;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public Integer getChapterId() {
		return chapterId;
	}
	public void setChapterId(Integer chapterId) {
		this.chapterId = chapterId;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	@Override
	public String toString() {
		return "historyStory [id=" + id + ", name=" + name + ", comment=" + comment + ", chapterId=" + chapterId
				+ ", userId=" + userId + "]";
	}
	
}
