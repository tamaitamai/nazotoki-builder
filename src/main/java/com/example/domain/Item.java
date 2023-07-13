package com.example.domain;

public class Item {
	private Integer id;
	private String name;
	private String image;
	private String explanation;
	private Integer chapterId;
	private Integer unionId;
	private Integer have;
	
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
	public Integer getChapterId() {
		return chapterId;
	}
	public void setChapterId(Integer chapterId) {
		this.chapterId = chapterId;
	}
	public Integer getUnionId() {
		return unionId;
	}
	public void setUnionId(Integer unionId) {
		this.unionId = unionId;
	}
	public Integer getHave() {
		return have;
	}
	public void setHave(Integer have) {
		this.have = have;
	}
	@Override
	public String toString() {
		return "Item [id=" + id + ", name=" + name + ", image=" + image + ", explanation=" + explanation
				+ ", chapterId=" + chapterId + ", unionId=" + unionId + ", have=" + have + "]";
	}

	
}
