import { chapterSave, gameOver } from "../main/save.js";
import { firstState } from "../main/story.js";
import { leftScrean, rightScrean, screanCurcor } from "./my-question.js"

//画像の移動を実行
function animateImage(move,start,end,speed) {
    $(move).css('top', start);

    // アニメーションの実行
    $(move).animate({
        top: end, 
    },speed, 

    function() {       
    $(move).animate({
        top: start,
    },speed);
    });
}

//画像の移動を繰り返す
function roopImage(move,start,end,speed,roop,callback){    
    // 一定間隔でアニメーションを繰り返す
    var timerId = setInterval(function() {
        animateImage(move,start,end,speed);
    }, roop);

    setTimeout(function() {        
        clearInterval(timerId);                
    }, roop * 3);

    setTimeout(function() {        
        callback();
    }, roop * 6);
}


function leftRightShow(){
    $('.left-screan,.right-screan,.top-screan').show();
    if($('.cave-road-screan2').eq(2).is(':visible') ||
    $('.cave-road-screan1').eq(1).is(':visible') ||
    $('.cave-road-screan3').eq(0).is(':visible')){
        $('.game-over-screan').show();
        setTimeout(function(){
            firstState('うわーーーーーーーーーーー！！！！！！！！！')            
            $('.wolf').css('top','200px');
            $('.wolf').css('left','500px');
            $('.wolf').css('width','700px');
            $('.wolf').css('height','800px');
        },100)

        setTimeout(function(){
            $('.state').hide();
            $('.blood').show();
        },7000)

        setTimeout(function(){
            gameOver();
        },10000);
    
    }
}


$(function(){
    //ゴール画面の操作
    const xminGoal=[830];
    const xmaxGoal=[1000];
    const yminGoal=[400];
    const ymaxGoal=[550];
    screanCurcor('.cave-road-goal-screan',0,xminGoal,xmaxGoal,yminGoal,ymaxGoal,'');

    $('.cave-road-goal-screan').eq(0).click(function(e){
        var parentOffset=$(this).offset();
        var relX=e.pageX-parentOffset.left;
        var relY=e.pageY-parentOffset.top;
        if(relX>830 && relX<1000 && relY>400 && relY<550){
            chapterSave(5);
            var form=$('<form>',{'action': '/question/ruins'});
            $(document.body).append(form);
            form.submit();
        }
    })

    $('.cave-road-screan1').not($('.cave-road-screan1').eq(0)).hide();

    //左右移動
    $('.left-screan,.right-screan').click(function(){ 
        $('.left-screan,.right-screan,.top-screan').hide();
        var screan='.'+$(this).parent().attr('class');
        roopImage(screan,'0px','-20px',200,400,leftRightShow);            
    })
    leftScrean();
    rightScrean();

    //上移動
    $('.top-screan').click(function(){
        if($('.cave-road-screan3').eq(1).is(':visible') ||
        $('.cave-road-screan3').eq(2).is(':visible')){            
            $('.cave-road-goal-screan').show();
        }

        var screan='.'+$(this).parent().attr('class');
        var caveRoadNum=parseInt(screan.substring(screan.length-1));  
        for(let i=0;i<$(screan).length;i++){
            if($(screan).eq(i).is(':visible')){
                var screanNum=i;
                break;
            }
        }
        $('.cave-road-screan'+caveRoadNum).hide();
        $('.cave-road-screan'+(caveRoadNum+1)).eq(screanNum).show();

        $('.left-screan,.right-screan,.top-screan').hide();
        roopImage('.cave-road-screan'+(caveRoadNum+1),'0px','-20px',200,400,leftRightShow); 

    })
    
})