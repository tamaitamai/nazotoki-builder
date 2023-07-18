//アイテムボックスの表示用の関数
export function myItemList(response){
    console.log('myItemList');
    console.log(response);
    $('.get-image').removeAttr('src item-id item-genre');
    var myItemSize=response.length;
    for(let i=0;i<myItemSize;i++){
        $('.get-image').eq(i).attr('src','/image/'+response[i].image);
        $('.get-image').eq(i).attr('item-id',response[i].itemId);
        $('.get-image').eq(i).attr('item-genre',response[i].genre);
        $('.get-image').eq(i).addClass(response[i].genre);
    }
}
