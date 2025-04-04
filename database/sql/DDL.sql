DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS union_items;
DROP TABLE IF EXISTS my_items;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS saves;
DROP TABLE IF EXISTS chapters;
DROP TABLE IF EXISTS entry_characters;
DROP TABLE IF EXISTS read_storys;
DROP TABLE IF EXISTS history_storys;
DROP TABLE IF EXISTS move_items;
DROP TABLE IF EXISTS change_items;
DROP TABLE IF EXISTS delete_items;
DROP TABLE IF EXISTS options;
DROP TABLE IF EXISTS select_storys;
DROP TABLE IF EXISTS background_storys;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS storys;
DROP TABLE IF EXISTS action_characters;
DROP TABLE IF EXISTS chapter_characters;

-- ユーザーテーブル --
CREATE TABLE users(
	id serial,
	name text,
	mail text,
	password text
);


-- アイテムテーブル --
CREATE TABLE items(
	id serial,
	name text,
	image text,
	explanation text,
	chapter_id Integer,
	union_id Integer,
	change_id Integer,
	have Integer,
	genre text
);

--union_items_table--
CREATE TABLE union_items(
	id serial,
	name text,
	image text,
	explanation text,
	union_id Integer,
	genre text
);

-- チャプターテーブル --
CREATE TABLE chapters(
	id serial,
	name text,
	url text,
	chapter_id Integer
);

-- セーブテーブル --
CREATE TABLE saves(
	id serial,
	user_id Integer,
	chapter_id Integer,
	name text,
	url text,
	save_date text
);

-- 既読テーブル --
CREATE TABLE read_storys(
	id serial,
	user_id Integer,
	chapter_id Integer
);

-- 履歴テーブル --
CREATE TABLE history_storys(
	id serial,
	name text,
	comment text,
	chapter_id Integer,
	user_id Integer,
	story_id Integer
);

-- キャラクターリストテーブル --
CREATE TABLE entry_characters(
	id serial,
	user_id Integer,
	character_id Integer,
	name text,
	image text,
	explanation text	
);

-- 削除リストテーブル --
CREATE TABLE delete_items(
	id serial,
	item_id Integer,
	user_id Integer
);

-- 持ち物テーブル --	
CREATE TABLE my_items(
	id serial,
	user_id Integer,
	name text,
	image text,
	explanation text,
	union_id Integer,
	item_id Integer,
	genre text
);

-- アイテム変化テーブル --
CREATE TABLE change_items(
	id serial,
	user_id Integer,	
	change_id Integer
);

-- 移動用テーブル --
CREATE TABLE move_items(
	id serial,
	name text,
	image text,
	explanation text,
	chapter_id Integer,
	union_id Integer,
	change_id Integer,
	have Integer,
	genre text,
	user_id Integer,
	item_id Integer,
	move_id Integer
);

-- オプションテーブル --
CREATE TABLE options(
	id serial,
	user_id Integer,
	comment_speed Integer,
	auto_speed Integer
);

-- キャラクターの一覧テーブル
CREATE TABLE characters(
	id serial,
	name text,
	image text,
	explanation text
);

-- 各ステージのキャラクターのテーブル
CREATE TABLE chapter_characters(
	id serial,
	character_id Integer,
	chapter_id Integer
);

-- キャラクターの表情変化テーブル
CREATE TABLE action_characters(
	id serial,
	image text,
	character_id Integer
);

-- 各ステージのストーリーのテーブル
CREATE TABLE storys(
	id serial,
	name text,
	comment text,
	chapter_id Integer,
	character_id Integer,
	select_id Integer,
	select_open_id Integer,
	comment_open_id Integer,
	game_over_id Integer,
	action_id Integer,
	face text
);

-- 各ステージの背景のテーブル
CREATE TABLE background_storys(
	id serial,
	chapter_id Integer,
	image text
);

-- 選択肢のテーブル
CREATE TABLE select_storys(
	id serial,
	select_id Integer,
	select_comment text,
	chapter_id Integer,
	select_open_id Integer
);
