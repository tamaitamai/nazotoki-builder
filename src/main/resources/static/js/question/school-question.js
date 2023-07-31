import { objectPostion } from "../main/my-item.js";


$(function(){
    var bgm = $("#bgm")[0]; // <audio>要素を取得

    $("#playBtn").click(function() {
      bgm.play(); // BGM再生
    });
  
    $("#pauseBtn").click(function() {
      bgm.pause(); // BGM一時停止
    });

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

    $(".school-screan").on("mousemove", function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;

        if(!$('.timetable-question').is(':visible') &&
        !$('.timetable-hint').is(':visible') &&
        !$('.timetable-answer').is(':visible')){
            // クリックした位置の座標を利用して特定の範囲内の場合にのみイベントを起こす
            if ((relX > 1000 && relX < 1100 && relY > 80 && relY < 200) ||
            (relX > 700 && relX < 1000 && relY > 150 && relY < 300)) {
                $(this).css('cursor','pointer');
            }else{
                $(this).css('cursor','');
            }
        }else{
            $(this).css('cursor','');
        }
    });

    $(".school-screan").on("click", function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        
        if(!$('.timetable-question').is(':visible') &&
        !$('.timetable-hint').is(':visible') &&
        !$('.timetable-answer').is(':visible')){
            // クリックした位置の座標を利用して特定の範囲内の場合にのみイベントを起こす
            if (relX > 1000 && relX < 1100 && relY > 80 && relY < 200) {               
                $('.timetable-question-box').show();
            }else if(relX > 700 && relX < 1000 && relY > 150 && relY < 300){
                $('.timetable-hint-box').show();
            }
        }
    });
    

    $('.timetable-question').click(function(event){        
        $('.timetable-question-box').hide();
        event.stopPropagation();
    })

    $('.timetable-hint').click(function(event){        
        $('.timetable-hint-box').hide();
        event.stopPropagation();
    })

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
    })

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
    })

    $('.box-close').click(function(){
        $('.timetable-answer-box').show();
    })

    $('.return-btn').click(function(){
        $('.timetable-answer-box').hide();
    })
})