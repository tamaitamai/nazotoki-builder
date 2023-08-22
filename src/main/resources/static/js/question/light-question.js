import { changeItem, hideItem ,objectPostion, deleteItem, myItemList, objectHide, itemCheck, getItem} from '../main/my-item.js';
import { chapterSave } from '../main/save.js';
import { addState, firstState, storySpeed } from '../main/story.js';
import { backAdd, backScrean, expand, leftAndRigntAdd, leftScrean, rightScrean, screanCurcor, visibleIf } from './my-question.js';

$(function(){  
    $('.box-open,.box-open2').hide();

    // $('.fireprice-screan').show();
    // $('.fireprice-desk-screan').show();
    // $('.fire-screan').show();
    
    $('.light-screan').eq(0).css('background-image','url(/image/main/dark-home.jpg)');
    $('.light-screan').eq(1).css('background-image','url(/image/main/dark-home2.jpg)');
    $('.light-screan').eq(2).css('background-image','url(/image/main/dark-forest.jpg)');
    $('.light-screan').not($('.light-screan').eq(0)).hide();

    $('.fireprice-screan').eq(0).css('background-image','url(/image/main/fireprice.jpg)');
    $('.fireprice-screan').eq(1).css('background-image','url(/image/main/dark-home-room.jpg)');
    $('.fireprice-screan').eq(2).css('background-image','url(/image/main/dark-home-chair.jpg)');
    $('.fireprice-screan').not($('.fireprice-screan').eq(1)).hide();

    //オブジェクトの非表示
    objectHide('.pig');

    //ドアの表示
    if($('.door-change').val()=='true'){
        $('.close-door').hide();
        $('.open-door').show();    
    }

    //箱1の表示
    if($('.box-change1').val()=='true'){
        $('.box-open').show();
    }

    //箱2の表示
    if($('.box-change2').val()=='true'){
        $('.box-open2').show();
    }    

    if($('.jewel-change').val()=='true'){
        $('.magic-circle').show();
    }

    // オブジェクト配置
    objectPostion('.ghost',0,170,0);
    objectPostion('.ghost',1,500,100);
    objectPostion('.ghost',2,170,1200);
    objectPostion('.ghost',3,400,1200);
    
    objectPostion('.ghost-word',0,260,40);
    objectPostion('.ghost-word',1,510,70);
    objectPostion('.ghost-word',2,180,1170);
    objectPostion('.ghost-word',3,490,1240);

    objectPostion('.open-door',0,260,600);
    objectPostion('.close-door',0,260,600);

    objectPostion('.box-btn',0,20,20);
    objectPostion('.box-btn',1,200,50);
    objectPostion('.box-btn',2,20,470);
    objectPostion('.box-btn',3,180,470);

    objectPostion('.girl-ghost',0,200,500);
    objectPostion('.girl-fox',0,280,470);
    objectPostion('.pig',0,450,900);
    objectPostion('.flashlight',0,590,370);
    objectPostion('.magic-circle',0,300,700);

    //外の画面1
    const xmin1=[700];
    const xmax1=[800];
    const ymin1=[400];
    const ymax1=[500];
    screanCurcor('.light-screan',0,xmin1,xmax1,ymin1,ymax1,'');

    $(document).on('click','.light-screan:eq(0)', function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;        

        // クリックした位置の座標を利用して特定の範囲内の場合にのみイベントを起こす
        if (relX > 700 && relX < 800 && relY > 400 && relY < 500) {             
            $('.dark-screan').show();
            $('.left-screan,.right-screan').hide();
        }
    });

    //外の画面2
    const xmin2=[830];
    const xmax2=[950];
    const ymin2=[400];
    const ymax2=[600];
    const visible2=['.fireprice-screan'];
    screanCurcor('.light-screan',1,xmin2,xmax2,ymin2,ymax2,visible2);
    
    $(document).on('click','.light-screan:eq(1)', function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;        

        // クリックした位置の座標を利用して特定の範囲内の場合にのみイベントを起こす
        if(visibleIf(visible2)){
            if (relX > 830 && relX < 950 && relY > 400 && relY < 600) {                  
                $('.fireprice-screan').eq(0).show();
                $('.left-screan,.right-screan').hide();
                leftAndRigntAdd('.fireprice-screan');
            }    
        }
    });

    // 部屋の画面1
    const xminRoom1=[500,670,800];
    const xmaxRoom1=[1200,880,900];
    const yminRoom1=[600,400,320];
    const ymaxRoom1=[800,550,370];
    const visibleRoom1=['.fireprice-desk-screan','.fire-screan','.box-screan'];
    screanCurcor('.fireprice-screan',0,xminRoom1,xmaxRoom1,yminRoom1,ymaxRoom1,visibleRoom1);

    $(document).on('click','.fireprice-screan:eq(0)', function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;        

        // クリックした位置の座標を利用して特定の範囲内の場合にのみイベントを起こす
        if(visibleIf(visibleRoom1)){
            if (relX > 500 && relX < 1200 && relY > 600 && relY < 800) {  
                expand('.fireprice-desk-screan');
            }else if(relX > 670 && relX < 880 && relY > 400 && relY < 550){
                expand('.fire-screan');
            }else if(relX > 800 && relX < 900 && relY > 320 && relY < 370){
                $('.box-screan').show();
            }
        }
    });

    //部屋1の拡大画面1
    const xminExpand1=[1000];
    const xmaxExpand1=[1200];
    const yminExpand1=[600];
    const ymaxExpand1=[800];
    screanCurcor('.fireprice-desk-screan',0,xminExpand1,xmaxExpand1,yminExpand1,ymaxExpand1,'');

    $(document).on('click','.fireprice-desk-screan:eq(0)', function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;        

        // クリックした位置の座標を利用して特定の範囲内の場合にのみイベントを起こす        
        if (relX > 1000 && relX < 1200 && relY > 600 && relY < 800) {  
            $('.chair-bottom-screan').show();
        }
        
    });

    //部屋1の拡大画面2
    const xminExpand2=[500];
    const xmaxExpand2=[1000];
    const yminExpand2=[200];
    const ymaxExpand2=[750];
    screanCurcor('.fire-screan',0,xminExpand2,xmaxExpand2,yminExpand2,ymaxExpand2,'');

    $(document).on('click','.fire-screan:eq(0)', function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;        

        // クリックした位置の座標を利用して特定の範囲内の場合にのみイベントを起こす        
        if (relX > 500 && relX < 1000 && relY > 200 && relY < 750) {  
            if($('.item-select').hasClass('raw-meat')){
                getItem(17);
            }else{
                firstState('何かを焼くのに使えそうだ');
            }
        }        
    });    

    //部屋2の画面
    const xminRoom2=[1000,1350,700];
    const xmaxRoom2=[1300,1400,870];
    const yminRoom2=[500,320,250];
    const ymaxRoom2=[600,380,470];
    const visibleRoom2=['.box-screan2','.chair-bottom-screan2'];
    screanCurcor('.fireprice-screan',1,xminRoom2,xmaxRoom2,yminRoom2,ymaxRoom2,visibleRoom2);

    $(document).on('click','.fireprice-screan:eq(1)', function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;        

        // クリックした位置の座標を利用して特定の範囲内の場合にのみイベントを起こす        
        if(visibleIf(visibleRoom2)){
            if (relX > 1000 && relX < 1300 && relY > 500 && relY < 600) {  
                $('.chair-bottom-screan2').show();
            }else if(relX > 1350 && relX < 1400 && relY > 320 && relY < 380){
                $('.box-screan2').show();
            }else if(relX > 700 && relX < 870 && relY > 250 && relY < 470){//ステージ移動
                if($('.item-select').hasClass('jewel')){
                    changeItem(14);
                    $('.jewel-change').val('true');
                    $('.magic-circle').show();
                }else{
                    firstState('ここから不思議な感覚がする...');
                }    
            }    
        }
    });    

    //部屋3の画面
    const xminRoom3=[1000,250];
    const xmaxRoom3=[1400,420];
    const yminRoom3=[500,300];
    const ymaxRoom3=[600,370];
    const visibleRoom3=['.chair-bottom-screan3','.wardrobe-screan']
    screanCurcor('.fireprice-screan',2,xminRoom3,xmaxRoom3,yminRoom3,ymaxRoom3,visibleRoom3);

    $(document).on('click','.fireprice-screan:eq(2)', function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;        

        // クリックした位置の座標を利用して特定の範囲内の場合にのみイベントを起こす        
        if(visibleIf(visibleRoom3)){
            if (relX > 1000 && relX < 1400 && relY > 500 && relY < 600) {  
                $('.chair-bottom-screan3').show();
            }else if (relX > 250 && relX < 420 && relY > 300 && relY < 370) {
                $('.wardrobe-screan').show();
            }    
        }
    });    

    //箱の回転イベント(箱1の仕掛け)
    $('.rotate-ball').click(function(){
        var rotate=parseInt($(this).css('rotate'));
        if(isNaN(rotate)){
            rotate=0;
        }
        rotate+=90;        
        if(rotate>=360){
            rotate-=360;
        }
        $(this).css('rotate',rotate+'deg');        

        if($('.rotate-ball').eq(0).css('rotate')=='90deg' &&
        $('.rotate-ball').eq(1).css('rotate')=='180deg' &&
        $('.rotate-ball').eq(2).css('rotate')=='180deg' &&
        $('.rotate-ball').eq(3).css('rotate')=='270deg' &&
        $('.rotate-ball').eq(4).css('rotate')=='90deg' &&
        $('.rotate-ball').eq(5).css('rotate')=='90deg'){
            $('.box-open').show();
            changeItem(12);
        }
    })
    
    //特定の順番で押すこと箱が開く(箱2の仕掛け)
    $('.box-btn').click(function(){
        var $boxBtn=$('.box-btn')
        var btnNum=$boxBtn.index($(this));
        console.log(btnNum);

        if(btnNum==0){
            $boxBtn.not($boxBtn.eq(0)).attr('value',0);
            $boxBtn.eq(0).attr('value',1);            
        }else if(btnNum==1){            
            if($boxBtn.eq(0).attr('value')==1){
                $boxBtn.eq(1).attr('value',1);
            }                        
            $boxBtn.not($boxBtn.eq(1)).attr('value',0);            
        }else if(btnNum==2){            
            if($boxBtn.eq(1).attr('value')==1){
                $boxBtn.eq(2).attr('value',1);
            }            
            $boxBtn.not($boxBtn.eq(2)).attr('value',0);  
        }else if(btnNum==3){
            if($boxBtn.eq(2).attr('value')==1){   
                $('.box-open2').show();
                changeItem(13);
            }
            $boxBtn.attr('value',0);  
        }
    })

    //鍵を選択しているときにドアを開く
    $('.close-door').click(function(){
        if($('.item-select').hasClass('key')){
            $('.close-door').hide();
            $('.open-door').show();
            var changeId=$(this).attr('change');            
            deleteItem();                 
            changeItem(changeId);
        }
    })

    //ライトの表示
    $('*').hover(
        function(){
            if($('.light').attr('value')==1){
                $('.cursor-light').show();
            }            
        },
        function(){
            if($('.light').attr('value')==0){
                $('.cursor-light').hide();
            }            
        }
    );

    // マウスの移動位置
    $('*').mousemove(function(e) {
        var relX = e.pageX;
        var relY = e.pageY;
    
        $(this).find('.cursor-light').css({
            top: relY + 'px',
            left: relX + 'px'
        });
    });

    // 懐中電灯のonとoff
    $('.light').click(function(){        
        if($('.light').attr('value')==1){
            $('.cursor-light').hide();
            $('.light').attr('value',0);
        }else{         
            $('.cursor-light').show();
            $('.light').attr('value',1);
        }       
    })

    //ドアを開く
    $('.open-door').click(function(){
        $('.ghost-room').show();
    })

    //幽霊少女のイベント
    $('.girl-ghost').click(function(){
        if($('.item-select').hasClass('bill')){
            getItem(20);
        }else{
            firstState('見つかった！！でも捕まえれるもんなら捕まえてみろ～');
        }
    })

    //狐耳の女のイベント
    $('.girl-fox').click(function(){
        if($('.item-select').hasClass('fire-meat')){
            getItem(19);
        }else{
            firstState('おばけを倒すのに必要なアイテムを探しています。何か知りませんか？');
            addState(1,'アイテムを渡してもいいぞ？だが、ただではやらん！！ちょうど腹が減ったところだ...なにか持ってくるがいい！');
            addState(2,'食べ物か...この辺の動物でも捕まえようか...');
        }
    })

    //豚のイベント
    $('.pig').click(function(){
        if($('.item-select').hasClass('knife')){
            getItem(16);
            var itemId=$(this).attr('item-id');
            hideItem(itemId);
            $('.pig').hide();
        }else{
            firstState('こいつはうまそうだ...何か狩りをできそうなものはないだろうか？');
        }
    })

    //仕掛けの画面を閉じる
    $('.return-btn').click(function(e){
        $('.chair-bottom-screan').hide();
        $('.chair-bottom-screan2').hide();
        $('.chair-bottom-screan3').hide();
        $('.wardrobe-screan').hide();
        $('.box-screan').hide();
        $('.box-screan2').hide();
        e.stopPropagation();//親要素を実行しない
    })

    leftScrean();
    rightScrean();

    backScrean(0,'.ghost-room','.dark-screan',0);
    backScrean(1,'.dark-screan','.light-screan',0);
    backScrean(2,'.fireprice-desk-screan','.fireprice-screan',0);
    backScrean(3,'.fire-screan','.fireprice-screan',0);
    backScrean(4,'.fireprice-screan','.light-screan',1);
    backScrean(5,'.fireprice-screan','.light-screan',1);
    backScrean(6,'.fireprice-screan','.light-screan',1);
    
})