//アイテムボックスの表示用の関数
export function myItemList(response){
    $('.get-image').removeAttr('src my-item-id item-id item-union');
    var myItemSize=response.length;
    for(let i=0;i<myItemSize;i++){
        $('.get-image').eq(i).attr('src','/image/'+response[i].image);
        $('.get-image').eq(i).attr('my-item-id',response[i].id);
        $('.get-image').eq(i).attr('item-id',response[i].itemId);
        $('.get-image').eq(i).attr('item-union',response[i].unionId);
        $('.get-image').eq(i).attr('item-name',response[i].name);
        $('.get-image').eq(i).attr('item-explanation',response[i].explanation);
        $('.get-image').eq(i).addClass(response[i].genre);
    }
}

export function hideItem(itemId){
    var postData={itemId: itemId}
    $.ajax({
        type: 'post',
        url: '/item/hideItem',
        data: postData
    })
}
