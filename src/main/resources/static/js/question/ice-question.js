import {deleteNum,deleteItem} from '../main/delete-item.js';
import {hideItem} from '../main/my-item.js';
$(function(){
    //氷の表示を隠す
    for(let i=0;i<$('.ice').length;i++){
        if($('.ice').eq(i).attr('value')==0){
            $('.ice').eq(i).hide();
        }
    }

    //氷の位置の調整
    function icePosition(num,top,left){
        $('.ice').eq(num).css({
            position: 'absolute',
            top: top+'px',
            left: left+'px'
        });

        $('.ice-word').eq(num).css({
            position: 'absolute',
            top: top+'px',
            left: left+'px'
        });
    }

    //火の位置の調整
    function firePosition(num,top,left){
        $('.fire').eq(num).css({
            position: 'absolute',
            top: top+'px',
            left: left+'px'
        });
    }

    //火の画像のサイズ
    function fireSize(num,width,height){
        $('.fire').eq(num).css({
            width: width+'px',
            height: height+'px'
        })    
    }
    fireSize(2,100,100);
    fireSize(3,200,200);
    fireSize(4,100,100);
    fireSize(5,150,150);

    $('.ice').eq(5).css({
        width: 70+'px',
        height: 70+'px'
    })

    $('.ice-word').eq(5).css('color','black');
    
    $('.ice-word').eq(0).text(1);
    $('.ice-word').eq(1).text(2);
    $('.ice-word').eq(2).text(3);
    $('.ice-word').eq(3).text(4);
    $('.ice-word').eq(4).text(5);
    $('.ice-word').eq(5).text('Z');

    icePosition(0,50,20);
    icePosition(1,350,20);
    icePosition(2,200,400);
    icePosition(3,50,800);
    icePosition(4,350,800);
    icePosition(5,-85,580);

    firePosition(0,110,-300);
    firePosition(1,110,1000);
    firePosition(2,350,400);
    firePosition(3,0,400);
    firePosition(4,170,620);
    firePosition(5,150,120);

    //持ち物を選択したときにfireクラスを持っていたら氷を溶かせるようにする
    $('.get-image').click(function(){
        if($(this).hasClass('fire') && $('.fire-on').val()==0){
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
            $('.get-image').eq(deleteNum).removeClass('fire');
            $('.fire-on').val(0);

            var itemId=$(this).attr('item-id');
            hideItem(itemId);
        }
    })

    $('.ice-button').click(function(){
        if($('.ice-answer').val()=='12345'){
            $('.ice-door').show();
        }
    })
})

