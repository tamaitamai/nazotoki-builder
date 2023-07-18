import {myItemList} from './my-item.js';
$(function(){
    $('.item-list').hide();
    $('.item-detail').hide();

    //持ち物にあるアイテムの表示を隠す
    for(let i=0;i<$('.item').length;i++){
        if($('.item').eq(i).attr('value')==0){
            $('.item').eq(i).hide();
        }
    }
   
    //かばんをクリックしたときにアイテムボックスを表示
    $('.item-bag').click(function(){
        if($('.item-list').is(':visible')){
            $('.item-list').hide();
            $('.item-detail').hide();
            $('.search').css('background-color','');
            $('.search').attr('value',0);
        }else{
            $('.item-list').show();
        }        
    })

    //サーチボタンの操作
    $('.search').click(function(){        
        if($('.search').attr('value')==1){
            $('.search').css('background-color','');
            $('.search').attr('value',0);
            $('.item-detail').hide();
        }else{
            $('.search').css('background-color','white');
            $('.search').attr('value',1);
            for(let i=0;i<$('.get-image').length;i++){
                if($('.get-image').eq(i).attr('value')==1){
                    $('.item-detail').attr('src',$('.get-image').eq(i).attr('src'));            
                    $('.item-detail').show();
                    break;
                }
            }
        }        
    })

    //アイテムの詳細を表示
    $('.get-image').click(function(){
        $('.get-border').css('border','none');
        $('.get-image').not(this).attr('value',0);
        if($(this).attr('value')==0){
            $(this).attr('value',1);
            var getNum=$('.get-image').index($(this));
            var imageDetail=$(this).attr('src');
            if($('.search').attr('value')==1){
                $('.item-detail').attr('src',imageDetail);            
                $('.item-detail').show();
            }
            $('.get-border').eq(getNum).css('border','3px solid yellow');    
        }else{
            $(this).attr('value',0);
            var getNum=$('.get-image').index($(this));
            $('.item-detail').hide();
            $('.get-border').eq(getNum).css('border','none');
        }
    })

    //画面更新時の表示用
    $.ajax({
        type: "post",
        url: "/item/add",
        success: function(response){
            myItemList(response);
        }
    })

    //新しくアイテムを手に入れたときの表示用
    $('.item').click(function(){
        var itemNum=$('.item').index($(this));
        var itemId=$('.item-id').eq(itemNum).val();
        var id=$(this).attr('item-id');
    
        $(this).hide();
        
        var postData={
            id: id
        }

        $.ajax({
            type: "post",
            url: "/item/addMyItem",
            data: postData,
            success: function(response){
                myItemList(response);
            }
        })
    });
    
})
