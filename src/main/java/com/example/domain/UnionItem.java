package com.example.domain;

public class UnionItem {
	private Integer id;
	private String name;
	private String image;
	private String explanation;
	private Integer unionId;
	private String genre;
	
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
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getExplanation() {
		return explanation;
	}
	public void setExplanation(String explanation) {
		this.explanation = explanation;
	}
	public Integer getUnionId() {
		return unionId;
	}
	public void setUnionId(Integer unionId) {
		this.unionId = unionId;
	}
	public String getGenre() {
		return genre;
	}
	public void setGenre(String genre) {
		this.genre = genre;
	}
	@Override
	public String toString() {
		return "UnionItem [id=" + id + ", name=" + name + ", image=" + image + ", explanation=" + explanation
				+ ", unionId=" + unionId + ", genre=" + genre + "]";
	}
	
	
	
}
