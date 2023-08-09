import { changeItem, deleteItem, hideItem, itemCheck, myItemList, objectPostion } from "../main/my-item.js";
import { storySpeed } from "../main/story.js";
import { backScrean, leftScrean, rightScrean, screanCurcor, visibleIf } from "./my-question.js"

export function getItemMove(response,num){
    var ballImage=$('<img>').attr('src','/image/'+response.image).addClass('move')
    .addClass(response.genre).attr('item-id',response.itemId);
    $('.ball-set').eq(num).append(ballImage);        
}

$(function(){
    // $('.room-box2-screan').show();
    // $('.room-screan').show();

    $('.room-box1-open,.room-box2-open').hide();
    //森の画面の表示
    $('.forest-screan').eq(0).css('background-image','url(/image/main/forest.jpg)');
    $('.forest-screan').eq(1).css('background-image','url(/image/main/hole.jpg)');
    $('.forest-screan').eq(2).css('background-image','url(/image/main/home.jpg)');
    $('.forest-screan').not($('.forest-screan').eq(0)).hide();

    //部屋の画面の表示
    $('.room-screan').eq(0).css('background-image','url(/image/main/room.jpg)');
    $('.room-screan').eq(1).css('background-image','url(/image/main/barrel.jpg)');
    $('.room-screan').not($('.room-screan').eq(0)).hide();

    //オブジェクトの位置
    objectPostion('.bird',0,150,100);
    objectPostion('.bird',1,150,400);
    objectPostion('.bird',2,200,600);

    //画面を左右に遷移
    rightScrean('.forest-screan');
    leftScrean('.forest-screan');

    //色をつける
    $('.ball-color').eq(0).css('background-color','red');
    $('.ball-color').eq(1).css('background-color','blue');
    $('.ball-color').eq(2).css('background-color','yellow');

    //表示の切替
    if($('.box-change1').val()=='true'){
        $('.room-box1').hide();
        $('.room-box1-open').show();              
    }

    if($('.box-change2').val()=='true'){
        $('.room-box2').hide();
        $('.room-box2-open').show();              
    }

    if($('.forest-character-change').val()=='true'){
        $('.forest-character').hide();
    }

    // アイテムの移動情報の反映
    $.ajax({
        type: 'post',
        url: '/item/getMoveItem',
        success: function(response){
            for(let i=0;i<response.length;i++){
                if(response[i].moveId==1){                    
                    getItemMove(response[i],0);
                }else if(response[i].moveId==2){
                    getItemMove(response[i],1);
                }else if(response[i].moveId==3){
                    getItemMove(response[i],2);
                }
            }
        }
    })

    //森の画面1
    const xmin1=[500];
    const xmax1=[900];
    const ymin1=[300];
    const ymax1=[600];    
    screanCurcor('.forest-screan',0,xmin1,xmax1,ymin1,ymax1,'');
    
    $(document).on('click','.forest-screan:eq(0)', function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;        

        // クリックした位置の座標を利用して特定の範囲内の場合にのみイベントを起こす
        if (relX > 500 && relX < 900 && relY > 300 && relY < 600) {  
            if($('.forest-character').is(':visible')){
                storySpeed($('.state'),'めすがきが邪魔をして通れない...どうしよう');
                $('.state').show();               
            }else{
                var forestUrl = $('.forest-url').val();
                var form = $('<form>', {
                    'action': forestUrl
                });
    
                // サブミット
                $(document.body).append(form);
                form.submit();        
            }
        }
    });

    //森の画面2
    const xmin2=[500];
    const xmax2=[1000];
    const ymin2=[600];
    const ymax2=[700];
    const visible=['.room-screan'];
    screanCurcor('.forest-screan',1,xmin2,xmax2,ymin2,ymax2,visible);

    $(document).on('click','.forest-screan:eq(1)', function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;        

        // クリックした位置の座標を利用して特定の範囲内の場合にのみイベントを起こす
        if (relX > 500 && relX < 1000 && relY > 600 && relY < 700) {  
            if($('.item-select').hasClass('cake')){
                $('.forest-character').hide();
                storySpeed($('.state'),'ケーキにつられためすがきが穴に落ちていった...まあそこまで深くないし大丈夫だろう');
                $('.state').show();       
                deleteItem();
                changeItem(11);
            }else{
                storySpeed($('.state'),'穴だ。そこまでは深くはないようだ...');
                $('.state').show();    
            }
        }
    });

    //森の画面3
    const xmin3=[500,780,830];
    const xmax3=[550,820,900];
    const ymin3=[500,550,620];
    const ymax3=[660,660,660];
    const visible2=['.room-screan'];
    screanCurcor('.forest-screan',2,xmin3,xmax3,ymin3,ymax3,visible2);

    $(".forest-screan").eq(2).on("click", function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;        

        // クリックした位置の座標を利用して特定の範囲内の場合にのみイベントを起こす
        if(visibleIf(visible2)){            
            if (relX > 500 && relX < 550 && relY > 500 && relY < 660) {
                $('.room-screan').eq(0).show();
                $('.right-screan,.left-screan').hide();
            }else if(relX > 830 && relX < 900 && relY > 620 && relY < 660){
                $('.hammer-screan').show();
            }else if(relX > 780 && relX < 820 && relY > 550 && relY < 660){
                $('.room-screan').eq(1).show();
                $('.right-screan,.left-screan').hide();
            }
        }
    });

    //部屋の画面1
    const xminRoom1=[300,600,750,90,320];
    const xmaxRoom1=[400,670,880,200,400];
    const yminRoom1=[500,500,450,600,600];
    const ymaxRoom1=[530,540,500,700,700];
    const visibleRoom1=['.room-box1-screan','.room-box2-screan','.sky-screan'];
    screanCurcor('.room-screan',0,xminRoom1,xmaxRoom1,yminRoom1,ymaxRoom1,visibleRoom1);

    $(".room-screan").eq(0).on("click", function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;        
        
        // クリックした位置の座標を利用して特定の範囲内の場合にのみイベントを起こす
        if(visibleIf(visibleRoom1)){            
            if (relX > 300 && relX < 400 && relY > 500 && relY < 530) {
                $('.room-box1-screan').show();
            }else if(relX > 600 && relX < 670 && relY > 500 && relY < 540){
                $('.room-box2-screan').show();
            }else if(relX > 750 && relX < 880 && relY > 450 && relY < 500){
                $('.sky-screan').show();
            }else if(relX > 90 && relX < 200 && relY > 600 && relY < 700){
                $('.vase-box-screan').show();
            }else if(relX > 320 && relX < 400 && relY > 600 && relY < 700){
                $('.barrel-top-screan').show();
            }
        }        
    });

    //部屋の画面2
    const xminRoom2=[850];
    const xmaxRoom2=[1050];
    const yminRoom2=[500];
    const ymaxRoom2=[600];
    screanCurcor('.room-screan',1,xminRoom2,xmaxRoom2,yminRoom2,ymaxRoom2,'');

    $(".room-screan").eq(1).on("click", function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;        
        
        // クリックした位置の座標を利用して特定の範囲内の場合にのみイベントを起こす
        if($('.barrel-change').val()=='true'){
            $('.barrel-open-screan').show();
        }else{
            if (relX > 850 && relX < 1050 && relY > 500 && relY < 600) {
                if($('.item-select').hasClass('hammer')){
                    storySpeed($('.state'),'たるを破壊した。これで中を覗けそうだ');
                    $('.state').show();  
                    $('.barrel-change').val('true');
                    var changeId=$('.hammer').attr('change');
                    changeItem(changeId);
                }else{
                    storySpeed($('.state'),'ひびがある。衝撃があれば、壊れそうだ');
                    $('.state').show();    
                }
            }            
        }
    });

    //仕掛けの画面を閉じる
    $('.return-btn, .sky').click(function(e){
        $('.hammer-screan').hide();
        $('.room-box1-screan').hide();
        $('.room-box2-screan').hide();
        $('.sky-screan').hide();
        $('.barrel-open-screan').hide();
        $('.vase-box-screan').hide();
        $('.barrel-top-screan').hide();
        e.stopPropagation();//親要素を実行しない
    })
    
    // const newDiv = document.createElement('div');
    // newDiv.classList.add('state');
    // document.body.appendChild(newDiv);

    //邪魔をしてくるキャラクターのイベント
    $('.forest-character').click(function(){
        storySpeed($('.state'),'ここから先は通さないわよ！');
        $('.state').show();    
    })

    //箱1のパスワード入力
    $('.room-box1-number').click(function(){
        var number=parseInt($(this).text());
        if(number==9){
            $(this).text(1);
        }else{
            $(this).text(number+1);
        }

        if($('.room-box1-number').eq(0).text()==2 &&
        $('.room-box1-number').eq(1).text()==5 &&
        $('.room-box1-number').eq(2).text()==3){
            $('.room-box1').hide();
            $('.room-box1-open').show();            
            changeItem(6);
        }
    })

    //箱2の仕掛け
    $(document).on('click','.ball-set',function(){
        if($('.item-select').hasClass('ball')){
            $(this).empty();
            var selectImage=$('.item-select').attr('src');
            var selectClass=$('.item-select').attr('class');
            var itemId=$('.item-select').attr('item-id');
            var myItemId=$('.item-select').attr('my-item-id');
            var moveId=$(this).attr('moveId');
            var ballImage=$('<img>').attr('src',selectImage).addClass('move')
            .addClass(selectClass).addClass('item').attr('item-id',itemId).removeClass('item-select');
            $(this).append(ballImage);

            var postData={
                itemId: itemId,
                myItemId: myItemId,
                moveId: moveId
            };

            hideItem(itemId);

            //アイテムが移動した情報を保存
            $.ajax({
                type: 'post',
                url: '/item/moveItem',
                data: postData,
                success: function(response){
                    myItemList(response);
                    $('.item-select').hide();
                    $('.item-select').attr('class','item-select');
                    $('.get-border').css('border','none');
                    $('.get-image').attr('value',0);        
                }
            })

            //ボールの色が一致した時に解除
            if($('.ball-set img').eq(0).hasClass('ball-red') &&
            $('.ball-set img').eq(1).hasClass('ball-blue') &&
            $('.ball-set img').eq(2).hasClass('ball-yellow')){
                $('.room-box2-open').show();
                var changeId=$('.cake').attr('change');
                changeItem(changeId);
            }
        }
    })

    backScrean('.room-screan','.forest-screan');

});