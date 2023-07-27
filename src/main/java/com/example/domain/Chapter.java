package com.example.domain;

public class Chapter {
	private Integer id;
	private String name;
	private String url;
	private Integer chapterId;
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
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Integer getChapterId() {
		return chapterId;
	}
	public void setChapterId(Integer chapterId) {
		this.chapterId = chapterId;
	}
	@Override
	public String toString() {
		return "Chapter [id=" + id + ", name=" + name + ", url=" + url + ", chapterId=" + chapterId + "]";
	}
	
	
}
