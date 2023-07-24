import {deleteItem} from '../main/delete-item.js';
import {hideItem,objectPostion,DoubleObjectPosition,objectSize,itemCheck,
    myItemList,objectHide} from '../main/my-item.js';
$(function(){
    objectHide('.ice');
    objectHide('.fire');
    objectHide('.item');

    objectSize('.fire',2,100,100);
    objectSize('.fire',3,200,200);
    objectSize('.fire',4,100,100);
    objectSize('.fire',5,150,150);
    objectSize('.ice',5,70,70);
    objectSize('.use-fire-off',0,100,100);

    $('.ice-word').eq(5).css('color','black');
    
    $('.ice-word').eq(0).text(1);
    $('.ice-word').eq(1).text(2);
    $('.ice-word').eq(2).text(3);
    $('.ice-word').eq(3).text(4);
    $('.ice-word').eq(4).text(5);
    $('.ice-word').eq(5).text('Z');

    DoubleObjectPosition('.ice','.ice-word',0,50,20);
    DoubleObjectPosition('.ice','.ice-word',1,350,20);
    DoubleObjectPosition('.ice','.ice-word',2,200,400);
    DoubleObjectPosition('.ice','.ice-word',3,50,800);
    DoubleObjectPosition('.ice','.ice-word',4,350,800);
    DoubleObjectPosition('.ice','.ice-word',5,-85,580);

    objectPostion('.fire',0,110,-300);
    objectPostion('.fire',1,110,1000);
    objectPostion('.fire',2,350,400);
    objectPostion('.fire',3,0,400);
    objectPostion('.fire',4,170,620);
    objectPostion('.fire',5,150,120);
    objectPostion('.use-fire-off',0,350,200);

    //持ち物を選択したときにfireクラスを持っていたら氷を溶かせるようにする
    $('.get-image').click(function(){
        if($(this).hasClass('use-fire-on')){
            $('.fire-on').val(1);
        }else{
            $('.fire-on').val(0);
        }
    })

    //氷をクリックしたときにfireクラスの持ち物を選択していたら、氷を溶かす
    $('.ice').click(function(){
        if($('.fire-on').val()==1){
            $(this).hide();
            deleteItem();            
            $('.fire-on').val(0);

            var itemId=$(this).attr('item-id');
            hideItem(itemId);
            $('.item-select').hide();
        }
    })

    $('.ice-button').click(function(){
        if($('.ice-answer').val()=='12345'){
            $('.ice-door').show();
        }
    })

    $('.fire').click(function(){
        if($('.item-select').hasClass('use-fire-off')){
            var unionId=$('.item-select').attr('item-union');
            var myItemId=$('.item-select').attr('my-item-id');
            var itemId=$('.item-select').attr('item-id');
            var thisId=$(this).attr('item-id');
            console.log('unionId:'+unionId+'myItemId:'+myItemId+'itemId:'+thisId);

            var postData={
                unionId: unionId,
                myItemId1: myItemId,
                myItemId2: 0
            };

            $.ajax({
                type: 'post',
                url: '/item/union',
                data: postData,
                success: function(response){
                    itemCheck(unionId,'/item/unionItemLoad');//合成後のアイテムの詳細を表示
                    $('.item-list').hide();
                    $('.item-select').hide();
                    myItemList(response);
                    console.log(response);
                }
            })

            hideItem(thisId);
            hideItem(itemId)
            $(this).hide();
        }
    })
})

