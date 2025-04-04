package com.example.domain;

public class MoveItem {
	private Integer id;
	private String name;
	private String image;
	private String explanation;
	private Integer chapterId;
	private Integer unionId;
	private Integer changeId;
	private Integer have;
	private String genre;
	private Integer userId;
	private Integer itemId;
	private Integer moveId;
	
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
	public Integer getChangeId() {
		return changeId;
	}
	public void setChangeId(Integer changeId) {
		this.changeId = changeId;
	}
	public Integer getHave() {
		return have;
	}
	public void setHave(Integer have) {
		this.have = have;
	}
	public String getGenre() {
		return genre;
	}
	public void setGenre(String genre) {
		this.genre = genre;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Integer getItemId() {
		return itemId;
	}
	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}
	public Integer getMoveId() {
		return moveId;
	}
	public void setMoveId(Integer moveId) {
		this.moveId = moveId;
	}
	@Override
	public String toString() {
		return "MoveItem [id=" + id + ", name=" + name + ", image=" + image + ", explanation=" + explanation
				+ ", chapterId=" + chapterId + ", unionId=" + unionId + ", changeId=" + changeId + ", have=" + have
				+ ", genre=" + genre + ", userId=" + userId + ", itemId=" + itemId + ", moveId=" + moveId + "]";
	}
	

}
