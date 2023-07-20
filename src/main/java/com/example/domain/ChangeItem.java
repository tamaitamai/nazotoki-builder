package com.example.domain;

public class ChangeItem {
	private Integer id;
	private Integer change;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getChange() {
		return change;
	}
	public void setChange(Integer change) {
		this.change = change;
	}
	@Override
	public String toString() {
		return "ChangeItem [id=" + id + ", change=" + change + "]";
	}
	
}
