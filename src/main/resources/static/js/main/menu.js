$(function(){
    // $('.option-screan').show();
    //メニュー画面の表示
    $('.menu-box').click(function(){
        if($('.menu-screan').is(':visible')){
            $('.menu-screan').hide();
        }else{
            $('.menu-screan').show();
        }        
    })  

    //メニュー画面を閉じる
    $('.close-menu').click(function(){
        $('.menu-screan').hide();
    })

    //オプションの表示
    $('.option').click(function(){
        $('.option-screan').show();
        $('.menu-screan').hide();
    })

    //オプション画面を閉じる
    $('.return-menu-btn').click(function(){
        $('.option-screan').hide();
        $('.menu-screan').show();
    })

    //スピードを下げる
    $('.option-down').click(function(){
        var optionParent='.'+$(this).parent().attr('class');
        var ballLeft=$(optionParent).find('.option-ball').css('left');
        var moveBallLeft=parseInt(ballLeft)-20;
        if(moveBallLeft>=0){
            $(optionParent).find('.option-ball').css('left',moveBallLeft);
        }        
    })

    //スピードを上げる
    $('.option-up').click(function(){
        var optionParent='.'+$(this).parent().attr('class');
        var ballLeft=$(optionParent).find('.option-ball').css('left');
        var moveBallLeft=parseInt(ballLeft)+20;
        if(moveBallLeft<=180){
            $(optionParent).find('.option-ball').css('left',moveBallLeft);
        }        
    })

    //オプション情報のデータを取得
    $.ajax({
        type: 'post',
        url: '/option',
        success: function(response){
            //コメントスピードのメーター位置
            var commentSpeed=response.commentSpeed;
            var commentLevel=(100-commentSpeed)/10;
            $('.comment-speed').find('.option-ball').css('left',0+commentLevel*20);
            $('.comment-speed-value').val(commentSpeed);

            //autoスピードのメーター位置
            var autoSpeed=response.autoSpeed;
            var autoLevel=(4000-autoSpeed)/200;
            $('.auto-speed').find('.option-ball').css('left',autoLevel*20);
            $('.auto-speed-value').val(autoSpeed);
        }
    })

    //オプションの更新
    function newSpeed(speed){
        var speedLeft=$(speed).find('.option-ball').css('left');
        var optionLevel=parseInt(speedLeft)/20;
        var newSpeed=100-10*optionLevel;
        return newSpeed;
    }

    //変更結果を更新
    $(document).on('click','.option-update',function(){
        //コメントのスピード
        var commentSpeedLeft=$('.comment-speed').find('.option-ball').css('left');
        var optionCommentLevel=parseInt(commentSpeedLeft)/20;
        var newCommentSpeed=100-10*optionCommentLevel;

        //autoのスピード
        var autoSpeedLeft=$('.auto-speed').find('.option-ball').css('left');
        var optionAutoLevel=parseInt(autoSpeedLeft)/20;
        var newAutoSpeed=4000-200*optionAutoLevel;

        var postData={
            commentSpeed: newCommentSpeed,
            autoSpeed: newAutoSpeed
        }

        $.ajax({
            type: 'post',
            url: '/option/updateCommentSpeed',
            data: postData
        })

        $('.option-screan').hide();
        $('.menu-screan').show();
        $('.comment-speed-value').val(newCommentSpeed);
        $('.auto-speed-value').val(newAutoSpeed);
    })

})