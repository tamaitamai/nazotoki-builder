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
        var ballLeft=$('.option-ball').css('left');
        var moveBallLeft=parseInt(ballLeft)-20;
        if(moveBallLeft>=0){
            $('.option-ball').css('left',moveBallLeft);
        }        
    })

    //スピードを上げる
    $('.option-up').click(function(){
        var ballLeft=$('.option-ball').css('left');
        var moveBallLeft=parseInt(ballLeft)+20;
        if(moveBallLeft<=180){
            $('.option-ball').css('left',moveBallLeft);
        }        
    })

    //スピードデータを取得
    $.ajax({
        type: 'post',
        url: '/option',
        success: function(response){
            var commentSpeed=response.commentSpeed;
            var level=(100-commentSpeed)/10;
            $('.option-ball').css('left',0+level*20);
        }
    })

    //変更結果を更新
    $(document).on('click','.option-update',function(){
        var ballLeft=$('.option-ball').css('left');
        var optionLevel=parseInt(ballLeft)/20;
        var newCommentSpeed=100-10*optionLevel;
        
        var postData={
            commentSpeed:newCommentSpeed
        }

        $.ajax({
            type: 'post',
            url: '/option/updateCommentSpeed',
            data: postData
        })

        $('.option-screan').hide();
        $('.menu-screan').show();
 
    })

    //状態表示を閉じる
    $('.state-box').click(function(){
        $('.state-box').hide();
    })
})