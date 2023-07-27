package com.example.domain;

public class ChapterCharacter {
	private Integer id;
	private Integer characterId1;
	private Integer characterId2;
	private Integer chapterId;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getCharacterId1() {
		return characterId1;
	}
	public void setCharacterId1(Integer characterId1) {
		this.characterId1 = characterId1;
	}
	public Integer getCharacterId2() {
		return characterId2;
	}
	public void setCharacterId2(Integer characterId2) {
		this.characterId2 = characterId2;
	}
	public Integer getChapterId() {
		return chapterId;
	}
	public void setChapterId(Integer chapterId) {
		this.chapterId = chapterId;
	}
	@Override
	public String toString() {
		return "ChapterCharacter [id=" + id + ", characterId1=" + characterId1 + ", characterId2=" + characterId2
				+ ", chapterId=" + chapterId + "]";
	}
	
	
}
