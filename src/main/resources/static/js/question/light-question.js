import { deleteItem } from '../main/delete-item.js';
import { hideItem } from '../main/my-item.js';

$(function(){  
    //オブジェクトの位置
    function objectPostion(object,num,top,left){
        $(object).eq(num).css({
            position: 'absolute',
            top: top+'px',
            left: left+'px'
        })
    }

    objectPostion('.ghost',0,170,0);
    objectPostion('.ghost',1,500,100);
    objectPostion('.ghost',2,170,1200);
    objectPostion('.ghost',3,400,1200);
    
    objectPostion('.ghost-word',0,260,40);
    objectPostion('.ghost-word',1,510,70);
    objectPostion('.ghost-word',2,180,1170);
    objectPostion('.ghost-word',3,490,1240);

    objectPostion('.open-door',0,260,400);
    objectPostion('.close-door',0,260,400);
    objectPostion('.item',0,470,430);
    objectPostion('.item',1,340,200);
    objectPostion('.item',2,350,700);
    $('.box-main').css('z-index',2);
    $('.item').eq(2).css('z-index',1);

    $('.box-main').css('position','relative');

    objectPostion('.box-btn',0,10,10);
    objectPostion('.box-btn',1,70,30);
    objectPostion('.box-btn',2,10,170);
    objectPostion('.box-btn',3,60,170);
    
    


    //かぎの箱のボタンを特定の順番で押すことで開く
    $('.box-btn').click(function(){
        var $boxBtn=$('.box-btn')
        var btnNum=$boxBtn.index($(this));
        console.log(btnNum);

        function boxBtn(){
            for(let i=0;i<$boxBtn.length;i++){
                console.log(i+'boxBtn:'+$boxBtn.eq(i).attr('value'));
            }
        }
        
        if(btnNum==0){
            $boxBtn.not($boxBtn.eq(0)).attr('value',0);
            $boxBtn.eq(0).attr('value',1);            
            boxBtn();
        }else if(btnNum==1){            
            if($boxBtn.eq(0).attr('value')==1){
                $boxBtn.eq(1).attr('value',1);
            }                        
            $boxBtn.not($boxBtn.eq(1)).attr('value',0);            
            boxBtn();
        }else if(btnNum==2){            
            if($boxBtn.eq(1).attr('value')==1){
                $boxBtn.eq(2).attr('value',1);
            }            
            $boxBtn.not($boxBtn.eq(2)).attr('value',0);  
            boxBtn();                      
        }else if(btnNum==3){
            if($boxBtn.eq(2).attr('value')==1){
                console.log('clear');
                $('.box-main').hide();    
            }
            $boxBtn.attr('value',0);  
            boxBtn();
        }
    })

    //ドアの表示
    if($('.door-change').val()==1){
        $('.close-door').hide();
        $('.open-door').show();    
    }

    //鍵を選択しているときにドアを開く
    $('.close-door').click(function(){
        for(let i=0;i<$('.get-image').length;i++){
            if($('.get-image').eq(i).attr('value')==1){
                var onNum=i;
            }
        }
        if($('.get-image').eq(onNum).hasClass('key')){
            $('.close-door').hide();
            $('.open-door').show();
            deleteItem();
            var itemId=$('.get-image').eq(onNum).attr('item-id');
            hideItem(itemId);
            var changeId=$(this).attr('change');
            
            var postData={
                changeId: changeId
            }

            $.ajax({
                type: 'post',
                url: '/item/changeItem',
                data: postData
            })
        }
    })

    //ライトの表示
    $('*').hover(
        function(){
            if($('.light').attr('value')==1){
                $('.cursor-light').show();
            }            
        },
        function(){
            if($('.light').attr('value')==0){
                $('.cursor-light').hide();
            }            
        }
    );

    $('*').mousemove(function(e) {
        var relX = e.pageX;
        var relY = e.pageY;
    
        $(this).find('.cursor-light').css({
            top: relY + 'px',
            left: relX + 'px'
        });
    });

    $('.light').click(function(){        
        if($(this).attr('value')==1){
            $('.cursor-light').hide();
            $(this).attr('value',0);
        }else{         
            $('.cursor-light').show();
            $(this).attr('value',1);
        }       
    })

})