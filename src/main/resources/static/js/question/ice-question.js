import {deleteNum,deleteItem} from '../main/delete-item.js';
$(function(){
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

    $('.fire').eq(2).css({
        width: 100+'px',
        height: 100+'px'
    })

    icePosition(0,50,20);
    icePosition(1,350,20);
    icePosition(2,200,400);
    icePosition(3,50,800);
    icePosition(4,350,800);

    firePosition(0,110,-300);
    firePosition(1,110,1000);
    firePosition(2,350,400);

    $('.get-image').click(function(){
        if($(this).hasClass('fire') && $('.fire-on').val()==0){
            $('.fire-on').val(1);
        }else{
            $('.fire-on').val(0);
        }
    })

    $('.ice').click(function(){
        if($('.fire-on').val()==1){
            $(this).hide();
            deleteItem();
            $('.get-image').eq(deleteNum).removeClass('fire');
            $('.fire-on').val(0);

        }
    })
})

