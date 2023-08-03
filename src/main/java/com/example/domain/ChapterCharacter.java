package com.example.domain;

public class ChapterCharacter {
	private Integer id;
	private Integer characterId;
	private Integer chapterId;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getCharacterId() {
		return characterId;
	}
	public void setCharacterId(Integer characterId) {
		this.characterId = characterId;
	}
	public Integer getChapterId() {
		return chapterId;
	}
	public void setChapterId(Integer chapterId) {
		this.chapterId = chapterId;
	}
	@Override
	public String toString() {
		return "ChapterCharacter [id=" + id + ", characterId=" + characterId + ", chapterId=" + chapterId + "]";
	}
	
}
