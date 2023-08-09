import {hideItem,objectPostion,DoubleObjectPosition,objectSize,
    myItemList,objectHide,unionSelect} from '../main/my-item.js';
import { chapterSave } from '../main/save.js';
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

    //氷をクリックしたときにfireクラスの持ち物を選択していたら、氷を溶かす
    $('.ice').click(function(){
        if($('.item-select').hasClass('use-fire-on')){
            $(this).hide();
            // deleteItem();            
            $('.fire-on').val(0);

            var itemId=$(this).attr('item-id');
            hideItem(itemId);
            $('.item-select').hide();            

            var postData={
                unionId: $('.item-select').attr('item-union'),
                myItemId: $('.item-select').attr('my-item-id')
            }

            //アイテムを合成前に戻す(松明の火を消す)
            $.ajax({
                type: 'post',
                url: '/item/resetUnion',
                data: postData,
                success: function(response){
                    //持ち物の選択をリセット
                    for(let i=0;i<$('.get-image').length;i++){
                        $('.get-image').eq(i).attr('value',0);
                        $('.get-border').eq(i).css('border','none');    
                    }
                    myItemList(response);
                    unionSelect(2);
                }
            })
        }
    })

    //解答が正しいときに扉が出てくる
    $('.ice-button').click(function(){
        if($('.ice-answer').val()=='12345'){
            $('.ice-door').show();
        }
    })

    $('.ice-door').click(function(){
        chapterSave(5);
    })

    //松明を選択していて火がついていないときに火をつける
    $('.fire').click(function(){
        if($('.item-select').hasClass('use-fire-off')){            
            var unionId=$('.item-select').attr('item-union');
            var myItemId=$('.item-select').attr('my-item-id');
            var itemId=$('.item-select').attr('item-id');
            var thisId=$(this).attr('item-id');

            var postData={
                unionId: unionId,
                myItemId1: myItemId,
                myItemId2: 0
            };

            //アイテムを合成(松明に火をつける)
            $.ajax({
                type: 'post',
                url: '/item/union',
                data: postData,
                success: function(response){
                    // itemCheck(unionId,'/item/unionItemLoad');//合成後のアイテムの詳細を表示
                    $('.item-list').hide();
                    $('.item-select').hide();
                    //持ち物の選択をリセット
                    for(let i=0;i<$('.get-image').length;i++){
                        $('.get-image').eq(i).attr('value',0);
                        $('.get-border').eq(i).css('border','none');    
                    }                                        
                    myItemList(response);
                    unionSelect(2);
                }
            })

            hideItem(thisId);
            hideItem(itemId)
            $(this).hide();
        }
    })
})

