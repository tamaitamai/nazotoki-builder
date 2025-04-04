package com.example.domain;

public class DeleteItem {
	private Integer id;
	private Integer itemId;
	private Integer userId;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getItemId() {
		return itemId;
	}
	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	@Override
	public String toString() {
		return "DeleteItem [id=" + id + ", itemId=" + itemId + ", userId=" + userId + "]";
	}
	
	
}
