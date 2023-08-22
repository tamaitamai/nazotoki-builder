package com.example.domain;

public class Story {
	private Integer id;
	private String name;
	private String comment;
	private Integer chapterId;
	private Integer characterId;
	private Integer selectId;
	private Integer selectOpenId;
	private Integer commentOpenId;
	private Integer gameOverId;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
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
	public Integer getCharacterId() {
		return characterId;
	}
	public void setCharacterId(Integer characterId) {
		this.characterId = characterId;
	}
	public Integer getSelectId() {
		return selectId;
	}
	public void setSelectId(Integer selectId) {
		this.selectId = selectId;
	}
	public Integer getSelectOpenId() {
		return selectOpenId;
	}
	public void setSelectOpenId(Integer selectOpenId) {
		this.selectOpenId = selectOpenId;
	}
	public Integer getCommentOpenId() {
		return commentOpenId;
	}
	public void setCommentOpenId(Integer commentOpenId) {
		this.commentOpenId = commentOpenId;
	}
	public Integer getGameOverId() {
		return gameOverId;
	}
	public void setGameOverId(Integer gameOverId) {
		this.gameOverId = gameOverId;
	}
	@Override
	public String toString() {
		return "Story [id=" + id + ", name=" + name + ", comment=" + comment + ", chapterId=" + chapterId
				+ ", characterId=" + characterId + ", selectId=" + selectId + ", selectOpenId=" + selectOpenId
				+ ", commentOpenId=" + commentOpenId + ", gameOverId=" + gameOverId + "]";
	}
	
}
