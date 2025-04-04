package com.example.domain;

public class SelectStory {
	private Integer id;
	private Integer selectId;
	private String selectComment;
	private Integer chapterId;
	private Integer selectOpenId;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getSelectId() {
		return selectId;
	}
	public void setSelectId(Integer selectId) {
		this.selectId = selectId;
	}
	public String getSelectComment() {
		return selectComment;
	}
	public void setSelectComment(String selectComment) {
		this.selectComment = selectComment;
	}
	public Integer getChapterId() {
		return chapterId;
	}
	public void setChapterId(Integer chapterId) {
		this.chapterId = chapterId;
	}
	public Integer getSelectOpenId() {
		return selectOpenId;
	}
	public void setSelectOpenId(Integer selectOpenId) {
		this.selectOpenId = selectOpenId;
	}
	@Override
	public String toString() {
		return "SelectStory [id=" + id + ", selectId=" + selectId + ", selectComment=" + selectComment + ", chapterId="
				+ chapterId + ", selectOpenId=" + selectOpenId + "]";
	}
	
}
