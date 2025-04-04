INSERT INTO users(name,mail,password)
VALUES('a','a','a'),
	('b','b','b'),
	('c','c','c');

INSERT INTO chapters(name,url,chapter_id)
VALUES('学校ステージ','school',1),
	('森林ステージ','forest',2),
	('光ステージ','light',3),
	('洞窟ステージ','caveRoad',4),
	('氷ステージ','ruins',5);

INSERT INTO items(name,image,explanation,chapter_id,have)
VALUES('犬', 'dog.png', 'どこかの鍵', 0,1),
	('鍵', 'key.png', '何かに使えそう', 0,1);
	
--chapter1--
INSERT INTO items(name,image,explanation,chapter_id,change_id,have,genre)	
VALUES('箱', 'box-close.png', '鍵がかかって開かないようだ', 1,2,1,'box-locker'),
	('ロッカーの鍵', 'locker-key.png', 'どこかのロッカーの鍵みたいだ', 1,3,1,'locker-key item'),
	('箱2', 'box-close.png', '鍵がかかって開かないようだ', 1,4,1,'box-door'),
	('ドアの鍵', 'door-key.png', 'ドアの鍵だ。これで部屋から出られそうだ', 1,5,1,'door-key item');
	
--chapter2--
INSERT INTO items(name,image,explanation,chapter_id,change_id,have,genre)	
VALUES('赤玉', 'ball-red.png', '赤色の玉、どこかにはまりそうだ', 2,6,1,'ball ball-red item'),
	('青玉', 'ball-blue.png', '青色の玉、どこかにはまりそうだ', 2,7,1,'ball ball-blue item'),	
	('黄玉','ball-yellow.png','黄色の玉、どこかにはまりそうだ', 2,8,1,'ball ball-yellow item'),
	('ケーキ','cake.png','うまそうなケーキだ', 2,10,1,'cake item'),
	('ハンマー', 'hammer.png', 'なにかを壊すのに使えそうだ', 2,9,1,'hammer item');

--chapter3--
INSERT INTO items(name,image,explanation,chapter_id,union_id,have,genre)	
VALUES('ライト', 'light-off.png', '電池が入ってない。このままでは使えない', 3,1,1,'item flashlight'),
	('電池', 'battery.png', '単三', 3,1,1,'item battery');

INSERT INTO items(name,image,explanation,chapter_id,have,genre)
VALUES('鍵', 'key.png', 'どこかの鍵', 3,1,'item key'),
	('ナイフ','knife.png','サバイバルナイフ。動物をさばくのに使えそう',3,1,'item knife'),
	('生肉','raw-meat.png','生肉だ、ちゃんと焼いて食べよう',3,1,'raw-meat'),
	('調理済み肉','fire-meat.png','上手に焼けました！！',3,1,'fire-meat'),
	('豚','pig.png','おいしそう',3,1,'pig forest-area'),
	('お札','bill.png','おばけに強い',3,1,'bill'),
	('青い宝石','jewel-blue.png','異次元の扉を開く宝石。どこか不思議な力がある場所はあるだろうか？',3,1,'jewel');
	
INSERT INTO items(name,image,explanation,chapter_id,change_id,have,genre)	
VALUES('閉まるドア', 'close-door.png', 'ひらかないようだ', 3,1,1,'close-door dark-room');

--chapter5--
INSERT INTO items(name,image,explanation,chapter_id,have,genre)
VALUES('氷', 'ice.png', '氷1', 5,1,'ice'),
	('氷', 'ice.png', '氷5', 5,1,'ice'),
	('拳銃','gun.png','拳銃だ...たまは一発しか入ってないようだ...',5,1,'gun item'),
	('毛皮','fur.png','あったかそうだ',5,1,'fur');

INSERT INTO items(name,image,explanation,chapter_id,have,genre)
VALUES('ランタン', 'ranntann.png', '光っている', 5,1,'fire ruins-item1'),
	('焚火', 'burning-fire.png', '焚火', 5,1,'fire ruins-item3 burning-fire');
	

INSERT INTO items(name,image,explanation,chapter_id,union_id,have,genre)
VALUES('使用松明', 'use-torch.png', '火をつければ使えそう', 5,2,1,'item use-fire-off');
	
--union_items_table--
DROP TABLE IF EXISTS union_items;
CREATE TABLE union_items(
	id serial,
	name text,
	image text,
	explanation text,
	union_id Integer,
	genre text
);

INSERT INTO union_items(name,image,explanation,union_id,genre)
VALUES('懐中電灯','light-on.png','光る',1,'light'),
	('火のついた松明','use-torch-fire.png',
	 '火をつけることに成功した。ただ、一回使うとまた火をつけないといけないようだ',2,'use-fire-on');

-- 会話の背景
INSERT INTO background_storys(chapter_id,image)
VALUES(1,'school-room-main.jpg'),
	(2,'forest.jpg'),
	(3,'dark-home.jpg'),
	(4,'cave-road.jpg'),
	(5,'cave.jpg');

-- キャラクターの一覧
INSERT INTO characters(name,image,explanation)
VALUES('氷の少女','girl-ice.png','氷属性の魔法を使える。寒がり'),
	('炎の少女','girl-red.png','炎属性の魔法を使える。強い'),
	('りすの少女','girl-brown.png','異世界に飛ばされた少女。異世界に飛ばされたときになんか耳としっぽが生えた'),
	('悪魔の少女','girl-devil.png','異世界の案内人'),
	('幽霊の少女','girl-ghost.png','ふわふわ浮いている'),
	('いたずら少女','girl-enemy.png','いたずら好きの女の子。ちょくちょく邪魔をしている'),
	('狐耳の少女','girl-fox.png','幽霊についてくわしい'),
	('狼男','wolf.png','洞窟で獲物を狙っている');
	
INSERT INTO action_characters(image,character_id)
values('girl-red-happy.png',2),
('girl-red-regret.png',2),
('girl-brown-happy.png',3),
('girl-brown-regret.png',3);

-- 各ステージのキャラクター
INSERT INTO chapter_characters(character_id,chapter_id)
VALUES(3,1),
	(3,2),
	(6,2),
	(3,3),
	(5,3),
	(2,3),
	(3,4),
	(8,4),
	(3,5),
	(1,5);

-- ステージ1
INSERT INTO storys(name,comment,chapter_id,character_id)
VALUES('りす','やばい。放課後だ！寝過ごした！',1,3),
	('りす','え？とびらに鍵がかかっている',1,3);
	
-- ステージ2
INSERT INTO storys(name,comment,chapter_id,select_open_id,character_id)
VALUES('りす','ここから先を行けばいいのか...おや？誰かいる。',2,0,3),
	('めすがき','ここから先は通さないわよ！',2,0,6),
	('りす','ここで倒そうか、どうしようか',2,1,3);

INSERT INTO storys(name,comment,chapter_id,select_id,select_open_id,comment_open_id,game_over_id,character_id,action_id)
VALUES('いたずら好きの少女','くらえ！',2,1,0,1,0,6,1),
	('りす','なんて魔法だ！！こっちが負ける',2,1,0,1,1,3,1),
	('りす','いや、やめておこう...',2,2,0,1,0,3,2),
	('りす','別ルートをいこうかな...',2,2,2,1,0,3,2),
	('りす','ここで倒していこう',2,3,0,1,0,3,1),
	('りす','どけい！！',2,3,0,1,0,3,1),
	('いたずら好きの少女','くらえ！',2,3,0,1,1,6,0);
	
INSERT INTO storys(name,comment,chapter_id,select_id,select_open_id,comment_open_id,character_id)
VALUES('りす','なんだこの道は！！',2,1,3,2,3),
	('りす','ここで探索しながら方法を考えよう',2,2,0,2,3),
	('りす','なにかいいものは',2,2,0,2,3);
	
INSERT INTO storys(name,comment,chapter_id,select_id,select_open_id,comment_open_id,game_over_id,character_id,face)
VALUES('りす','道がくずれる！！',2,1,0,3,0,3,'happy'),
	('りす','やっぱり危ない道はだめだった...',2,1,0,3,1,3,'regret'),
	('りす','やはりあっちで探索したほうがいいな...',2,2,0,3,0,3,'');

-- ステージ3
INSERT INTO storys(name,comment,chapter_id,character_id,action_id,face)
VALUES('りす','暗い！！何も見えない',3,3,1,''),	
	('幽霊ちゃん','こっちだよ～',3,5,1,''),	
	('ファイアー','暗いところは炎で明かりをつけよう～',3,2,1,''),	
	('りす','館の中に逃げ込まれてしまった...',3,3,1,'regret'),
	('ファイアー','明る～い',3,2,4,'happy'),
	('幽霊ちゃん','へへん、ここまではこれないね～',3,5,2,'');
	
-- ステージ4
INSERT INTO storys(name,comment,chapter_id,character_id)
VALUES('てき','ぐおおおおおおお！！',4,8),
	('りす','なんだあいつは！！やばい！逃げよう...',4,3);

-- ステージ5
INSERT INTO storys(name,comment,chapter_id,character_id)
VALUES('りす','あそこに焚火で温まる女の子がいる。話を聞いてみよう。',5,3),
	('アイス','寒いよ～',5,1),
	('りす','話どころではなさそうだな...とりあえず洞窟を探索してみよう',5,3);

-- ステージ2選択肢
INSERT INTO select_storys(select_id,select_comment,chapter_id,select_open_id)
VALUES(1,'戦う',2,1),
	(2,'やめておく',2,1),
	(3,'しばく',2,1),
	(1,'別の道に行く',2,2),
	(2,'探索する',2,2),
	(1,'そのまま行く',2,3),
	(2,'引き返す',2,3);
	
