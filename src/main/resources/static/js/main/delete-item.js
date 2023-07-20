import {myItemList} from './my-item.js';
let deleteNum='';
function deleteItem(){
    for(let i=0;i<$('.get-image').length;i++){
        if($('.get-image').eq(i).attr('value')==1){
            var itemId=$('.get-image').eq(i).attr('item-id');
            var myItemId=$('.get-image').eq(i).attr('my-item-id');
            deleteNum=i;
            $('.get-border').eq(i).css('border','none');
            $('.get-image').eq(i).attr('value',0);
        }
    }
    
    var postData={
        itemId: itemId,
        myItemId: myItemId
    }
    
    $.ajax({
        type: 'post',
        url: '/item/deleteMyItem',
        data: postData,
        success: function(response){ 
            myItemList(response);
        }
    })
}

export {deleteNum,deleteItem};
