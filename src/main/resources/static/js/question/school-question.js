import { changeItem, hideItem, objectPostion, deleteItem} from "../main/my-item.js";
import { storySpeed } from "../main/story.js";

export function boxOpen(){
    var ballTop=220;
    var ballAdd=50;
    if(parseInt($('.ball').eq(0).css('top'))==ballTop &&
    parseInt($('.ball').eq(1).css('top'))==ballTop-ballAdd &&
    parseInt($('.ball').eq(2).css('top'))==ballTop-2*ballAdd &&
    parseInt($('.ball').eq(3).css('top'))==ballTop-3*ballAdd &&
    parseInt($('.ball').eq(4).css('top'))==ballTop-4*ballAdd){
        $('.box-open').show();
        var changeId=$('.box-locker').attr('change');
        changeItem(changeId);
    }
}

$(function(){
    $('.school-screan').eq(0).css('background-image','url(/image/main/school-room-main.jpg)');
    $('.school-screan').eq(1).css('background-image','url(/image/main/school-room-main2.jpg)');
    $('.school-screan').not($('.school-screan').eq(0)).hide();

    objectPostion('.item',0,70,200);
    objectPostion('.item',1,70,200);

    objectPostion('.stick',0,20,50);
    objectPostion('.stick',1,20,150);
    objectPostion('.stick',2,20,250);
    objectPostion('.stick',3,20,350);
    objectPostion('.stick',4,20,450);

    objectPostion('.ball',0,220,50);
    objectPostion('.ball',1,220,150);
    objectPostion('.ball',2,220,250);
    objectPostion('.ball',3,220,350);
    objectPostion('.ball',4,220,450);

    if($('.box-change').val()==1){
        $('.box-open').show();   
    }

    if($('.box-change2').val()==1){
        $('.box-open2').show();   
    }

    //画面1の場合
    $(".school-screan").eq(0).on("mousemove", function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;

        if(!$('.timetable-question').is(':visible') &&
        !$('.timetable-hint').is(':visible') &&
        !$('.timetable-answer').is(':visible')){
            if ((relX > 1000 && relX < 1100 && relY > 80 && relY < 200) ||
            (relX > 800 && relX < 1000 && relY > 150 && relY < 300)) {
                $(this).css('cursor','pointer');
            }else{
                $(this).css('cursor','');
            }
        }else{
            $(this).css('cursor','');
        }
    });

    $(".school-screan").eq(0).on("click", function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        
        if(!$('.timetable-question').is(':visible') &&
        !$('.timetable-hint').is(':visible') &&
        !$('.timetable-answer').is(':visible')){
            // クリックした位置の座標を利用して特定の範囲内の場合にのみイベントを起こす
            if (relX > 1000 && relX < 1100 && relY > 80 && relY < 200) {  
                $('.timetable-question-box').show();
            }else if(relX > 800 && relX < 1000 && relY > 150 && relY < 300){
                $('.timetable-hint-box').show();
            }
        }
    });
    
    //画面2の場合
    $(".school-screan").eq(1).on("mousemove", function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;

        if(!$('.locker-question').is(':visible') &&
        !$('.locker-hint').is(':visible') &&
        !$('.locker-answer').is(':visible')){
            if ((relX > 320 && relX < 400 && relY > 300 && relY < 500) ||
            (relX > 220 && relX < 280 && relY > 300 && relY < 500) ||
            (relX > 550 && relX < 850 && relY > 270 && relY < 400)) {
                $(this).css('cursor','pointer');
            }else{
                $(this).css('cursor','');
            }
        }else{
            $(this).css('cursor','');
        }
    });

    $(document).on('click','.school-screan:eq(1)', function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        
        if(!$('.locker-question').is(':visible') &&
        !$('.locker-hint').is(':visible') &&
        !$('.locker-answer').is(':visible')){
            // クリックした位置の座標を利用して特定の範囲内の場合にのみイベントを起こす
            if ((relX > 300 && relX < 500 && relY > 300 && relY < 500)) {//ロッカーのイベント 
                if($('.locker-change').val()==1){
                    $('.locker-question-box').show();
                }else{
                    if($('.item-select').hasClass('locker-key')){
                        storySpeed($('.state'),'鍵が開いた');
                        $('.state').show();        
                        var changeId=$('.locker-key').attr('change');
                        changeItem(changeId);  
                        $('.locker-change').val(1);
                    }else{
                        storySpeed($('.state'),'ローカーには鍵が掛かっているようだ');
                        $('.state').show();                                                
                    }
                }
            }else if((relX > 220 && relX < 280 && relY > 300 && relY < 500)){//ドアのイベント
                if($('.door-change').val()==1){
                    storySpeed($('.state'),'ここから出られる');
                    $('.state').show();   
                    var dataUrl = $('.door-url').val();
                    var form = $('<form>', {
                        'action': dataUrl
                    });
        
                    // サブミット
                    $(document.body).append(form);
                    form.submit();        
                }else{
                    if($('.item-select').hasClass('door-key')){
                        storySpeed($('.state'),'ドアの鍵が開いた');
                        $('.state').show();   
                        $('.door-change').val(1);
                        var changeId=$('.door-key').attr('change');
                        changeItem(changeId);  
                    }else{
                        storySpeed($('.state'),'ここから出られそうだ。なんとかして開けられないだろうか');
                        $('.state').show();
                    }
                }
            }else if((relX > 550 && relX < 850 && relY > 270 && relY < 400)){//黒板の表示
                $('.locker-hint-box').show();
            }
        }
    });

    //表示した画面を閉じる
    $('.timetable-question,.timetable-hint, .locker-hint,.locker-question').click(function(event){        
        $('.timetable-question-box').hide();
        $('.timetable-hint-box').hide();
        $('.locker-hint-box').hide();
        $('.locker-question-box').hide();
        event.stopPropagation();//親要素を実行しない
    })

    //ボールをクリックしたときにボールを動かす。
    $(document).on('click','.ball',function(){
        var ballTop=$(this).css('top');
        var moveBallTop=parseInt(ballTop)-50;        
        var stickNum=$('.stick').index(this);
        var stickTop=$('.stick').eq(stickNum).css('top');
        var stickMoveTop=parseInt(stickTop)-50;
        if(moveBallTop!=stickMoveTop){
            $(this).css('top',moveBallTop+'px');
        }else{
            $(this).css('top',moveBallTop+250+'px')
        }
        boxOpen();
    })

    //棒をクリックしたときにボールを動かす。
    $(document).on('click','.stick',function(){
        var stickNum=$('.stick').index(this);
        var ballTop=$('.ball').eq(stickNum).css('top');
        var moveBallTop=parseInt(ballTop)-50;          
        var stickTop=$(this).css('top');
        var stickMoveTop=parseInt(stickTop)-50;
        if(moveBallTop!=stickMoveTop){
            $('.ball').eq(stickNum).css('top',moveBallTop+'px');
        }else{
            $('.ball').eq(stickNum).css('top',moveBallTop+250+'px')
        }
        boxOpen();
    })

    //パネルを押したときに色を変える
    $('.stick-btn').click(function(){
        var color=$(this).css('background-color');
        if(color=='rgb(0, 128, 0)'){
            $(this).css('background-color','white');
        }else{
            $(this).css('background-color','green');
        }      
        if($('.stick-btn').eq(1).css('background-color')=='rgb(0, 128, 0)' &&
        $('.stick-btn').eq(7).css('background-color')=='rgb(0, 128, 0)' &&
        $('.stick-btn').eq(10).css('background-color')=='rgb(0, 128, 0)' &&
        $('.stick-btn').eq(15).css('background-color')=='rgb(0, 128, 0)' &&
        $('.stick-btn').eq(16).css('background-color')=='rgb(0, 128, 0)')  {
            $('.box-open2').show();
            var changeId=$('.box-door').attr('change');
            changeItem(changeId);    
        }
    })

    //箱の仕掛け表示
    $('.box-locker').click(function(){
        $('.timetable-answer-box').show();
    })

    $('.box-door').click(function(){
        $('.locker-answer-box').show();
    })

    //仕掛けの画面を閉じる
    $('.return-btn').click(function(){
        $('.timetable-answer-box').hide();
        $('.locker-answer-box').hide();
    })

    //右側のスクリーンにスクロール
    $('.right-screan').click(function(){
        var screanNum='';
        var screanLength=$('.school-screan').length;
        console.log(screanLength);
        for(let i=0;i<screanLength;i++){
            if($('.school-screan').eq(i).is(':visible')){
                if(i==screanLength-1){
                    screanNum=0;
                }else{
                    screanNum=i+1;
                }                
                break;
            }
        }       
        $('.school-screan').hide();
        $('.school-screan').eq(screanNum).show();
    })

    //左側のスクリーンにスクロール
    $('.left-screan').click(function(){
        var screanNum='';
        var screanLength=$('.school-screan').length;
        console.log(screanLength);
        for(let i=0;i<screanLength;i++){
            if($('.school-screan').eq(i).is(':visible')){
                if(i==0){
                    screanNum=screanLength-1;
                }else{
                    screanNum=i-1;
                }                
                break;
            }
        }       
        $('.school-screan').hide();
        $('.school-screan').eq(screanNum).show();
    })

})