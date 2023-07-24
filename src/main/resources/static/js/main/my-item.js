//アイテムボックスの表示用の関数
export function myItemList(response){
    console.log('myItem:');
    console.log(response);
    // $('.get-image').removeAttr('src my-item-id item-id item-union item-name item-explanation');
    $('.get-image').hide();
    var myItemSize=response.length;
    for(let i=0;i<myItemSize;i++){
        $('.get-image').eq(i).show();
        $('.get-image').eq(i).attr('src','/image/'+response[i].image);
        $('.get-image').eq(i).attr('my-item-id',response[i].id);
        $('.get-image').eq(i).attr('item-id',response[i].itemId);        
        $('.get-image').eq(i).attr('item-union',response[i].unionId);                
        $('.get-image').eq(i).attr('item-name',response[i].name);
        $('.get-image').eq(i).attr('item-explanation',response[i].explanation);
        $('.get-image').eq(i).addClass(response[i].genre);
    }
}

//画面内の削除したアイテムの情報更新(表示を隠す)
export function hideItem(itemId){
    var postData={itemId: itemId}
    $.ajax({
        type: 'post',
        url: '/item/hideItem',
        data: postData
    })
}

//手に入れたアイテムの詳細を表示する
export function itemCheck(id,url){
    var postData={
        id: id
    }

    $.ajax({
        type: "post",
        url: url,
        data: postData,
        success: function(response){
            $('.check-image').attr('src','/image/'+response.image);
            $('.check-name').text(response.name);
            $('.check-list').show();
            // $('.check-background').show();
        }
    })
}

//オブジェクトの位置調整
export function objectPostion(object,num,top,left){
    $(object).eq(num).css({
        position: 'absolute',
        top: top+'px',
        left: left+'px'
    })
}

//オブジェクトを二つ同時に動かす場合の位置調整
export function DoubleObjectPosition(object,object2,num,top,left){
    $(object).eq(num).css({
        position: 'absolute',
        top: top+'px',
        left: left+'px'
    });

    $(object2).eq(num).css({
        position: 'absolute',
        top: top+'px',
        left: left+'px'
    });
}

//オブジェクトの画像のサイズ
export function objectSize(object,num,width,height){
    $(object).eq(num).css({
        width: width+'px',
        height: height+'px'
    })    
}

//オブジェクト非表示用
export function objectHide(object){
    for(let i=0;i<$(object).length;i++){
        if($(object).eq(i).attr('value')==0){
            $(object).eq(i).hide();
        }
    }    
}
