import {myItemList,hideItem,itemCheck} from './my-item.js';
$(function(){
    $('.item-list').hide();
    $('.item-image').hide();
    $('.item-detail').hide();
    $('.check-list').hide();
    $('.check-background').hide();
    $('.item-select').hide();

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
            $('.item-image').hide();
            $('.item-detail').hide();
            $('.check-background').hide();
            $('.search').css('background-color','');
            $('.search').attr('value',0);
        }else{
            $('.item-list').show();
            $('.check-background').show();
        }        
    })

    //アイテム確認画面を閉じる
    $('.check-list').click(function(){
        if($('.check-image').is(':visible')){
            $(this).hide();
            $('.check-background').hide();
        }
    })

    //サーチボタンの操作
    $('.search').click(function(){        
        if($('.search').attr('value')==1){
            $('.search').css('background-color','');
            $('.search').attr('value',0);
            $('.item-image').hide();
            $('.item-detail').hide();
        }else{
            $('.search').css('background-color','white');
            $('.search').attr('value',1);
            for(let i=0;i<$('.get-image').length;i++){
                if($('.get-image').eq(i).attr('value')==1){
                    //アイテムの詳細表示
                    $('.item-image').attr('src',$('.get-image').eq(i).attr('src'));
                    $('.item-name').text($('.get-image').eq(i).attr('item-name'));
                    $('.item-explanation').text($('.get-image').eq(i).attr('item-explanation'));
                    $('.item-image').show();
                    $('.item-detail').show();
                    break;
                }
            }
        }        
    })

    //アイテムの詳細を表示
    $('.get-image').click(function(){
        $('.get-border').css('border','none');//枠の状態のリセット
        //アイテム合成
        for(let i=0;i<$('.get-image').length;i++){
            if($('.get-image').eq(i).attr('value')==1){
                var onNum=i;
            }
        }//一つ前の選択アイテムの番号を入手

        if($('.get-image').eq(onNum).attr('item-union')==$(this).attr('item-union') && 
        $('.get-image').eq(onNum).attr('item-id')!=$(this).attr('item-id') &&
        $('.get-image').eq(onNum).attr('item-union')!=0){
            console.log('union');
            var myItemId1=$('.get-image').eq(onNum).attr('my-item-id');
            var myItemId2=$(this).attr('my-item-id');
            var unionId=$(this).attr('item-union');
            console.log('unionId:'+unionId);
            var postData={
                myItemId1: myItemId1,
                myItemId2: myItemId2,
                unionId: unionId
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
                }
            })

            var itemId=$('.get-image').eq(onNum).attr('item-id');
            hideItem(itemId);

            itemId=$(this).attr('item-id');
            hideItem(itemId);

            $('.get-image').not(this).attr('value',0);
            $('.item-image').hide();
            $('.item-detail').hide();
            return false;
        }
        //合成ここまで

        $('.get-image').not(this).attr('value',0);//選択したアイテム以外の状態をリセット

        if($(this).attr('value')==0){
            $(this).attr('value',1);
            var getNum=$('.get-image').index($(this));

            var imageDetail=$(this).attr('src');
            var myItemIdDetail=$(this).attr('my-item-id');
            var itemIdDetail=$(this).attr('item-id');
            var itemUnionDetail=$(this).attr('item-union');
            var itemNameDetail=$(this).attr('item-name');
            var itemExplanationDetail=$(this).attr('item-explanation');
            var itemClassDetail=$(this).attr('class');
            $('.item-select').show();
            $('.item-select').attr('src',imageDetail);//選択したアイテムの画像をかばんの上に表示
            $('.item-select').attr('my-item-id',myItemIdDetail);
            $('.item-select').attr('item-id',itemIdDetail);
            $('.item-select').attr('item-union',itemUnionDetail);
            $('.item-select').attr('item-name',itemNameDetail);
            $('.item-select').attr('item-explanation',itemExplanationDetail);
            $('.item-select').attr('num',getNum);
            $('.item-select').attr('class','item-select '+itemClassDetail);
            $('.item-select').removeClass('item get-image');
            $('.item-select').removeClass('light');

            if($('.search').attr('value')==1){
                //アイテムの詳細表示
                $('.item-image').attr('src',imageDetail);
                $('.item-name').text($(this).attr('item-name'));
                $('.item-explanation').text($(this).attr('item-explanation'));     
                $('.item-image').show();
                $('.item-detail').show();
            }
            $('.get-border').eq(getNum).css('border','3px solid yellow');    
        }else{
            $('.item-select').hide();
            $('.item-select').attr('class','item-select');
            $(this).attr('value',0);
            var getNum=$('.get-image').index($(this));
            $('.item-image').hide();
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

    $(document).on('click','.item',function(){
        var id=$(this).attr('item-id');
    
        $(this).hide();
        
        var postData={
            id: id
        }

        itemCheck(id,'/item/itemLoad');

        $.ajax({
            type: "post",
            url: "/item/addMyItem",
            data: postData,
            success: function(response){
                myItemList(response);
            }
        })

        if($(this).hasClass('move')){                        
            $(this).removeClass('move');
            $.ajax({
                type: 'post',
                url: '/item/moveItemDelete',
                data: postData             
            })
        }

        hideItem(id);
    });
})
