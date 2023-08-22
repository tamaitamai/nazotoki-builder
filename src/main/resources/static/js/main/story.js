//文字送りスピード
export function storySpeed($storyComment,commentText){
    var speedVal=parseInt($('.speed-value').val());
    if(isNaN(speedVal)){
        speedVal=30;
    }

    let currentIndex = 0;
    let interval = setInterval(function() {                
        const animatedText = commentText.slice(0, currentIndex + 1);
        $storyComment.text(animatedText);
        currentIndex++;

        if (currentIndex === commentText.length) {
            clearInterval(interval);
        }
    }, speedVal);        
};

//文字送りスピード複数
export function storySpeed2(num,$storyComment,commentText){
    var speedVal=parseInt($('.speed-value').val());
    if(isNaN(speedVal)){
        speedVal=30;
    }

    let currentIndex = 0;
    let interval = setInterval(function() {                
        const animatedText = commentText.slice(0, currentIndex + 1);
        $storyComment.eq(num).text(animatedText);
        currentIndex++;

        if (currentIndex === commentText.length) {
            clearInterval(interval);
        }
    }, speedVal);        
};

//追加するコメント
export function addState(num,comment){
    if($('.state').length==num){
        var state=$('<div>').addClass('state');
        $(document.body).append(state);                        
    }
    storySpeed2(num,$('.state'),comment);
}

//最初に表示されるコメント
export function firstState(comment){
    $('.state').not($('.state').eq(0)).removeClass('state');
    storySpeed2(0,$('.state'),comment);
    $('.state').show();              
    $('.state').not($('.state').eq(0)).hide();
}

//セリフの表示
export function storyList(response){
    for(let i=0;i<response.length;i++){
        var name=$('<p>').addClass('story-name').text(response[i].name);
        $('.story-names').append(name);
        var comment=$('<p>').addClass('story-comment').text(response[i].comment)
        .attr('select-open-id',response[i].selectOpenId).attr('select-id',response[i].selectId)
        .attr('story-id',response[i].id).attr('game-over-id',response[i].gameOverId);
        $('.story-comments').append(comment);
    }
    $('.story-comment').not($('.story-comment').eq(0)).hide();
    $('.story-name').not($('.story-name').eq(0)).hide();  
    
    var $storyComment=$('.story-comment').eq(0);
    var commentText=$('.story-comment').eq(0).text();

    storySpeed($storyComment,commentText);

}

$(function(){
    $('.select-story-screan').hide();
    $('.story-screan').css('background-image','url(/image/main/'+$('.background-story').val()+')');

    $('.skip').click(function(){
        $('.story-screan').hide();

        //既読をつける
        $.ajax({
            type: 'post',
            url: '/story/readStory'
        })
    })

    //キャラクターの確保
    $.ajax({
        type: 'post',
        url: '/story/getCharacter',
        success: function(response){
            for(let i=0;i<response.length;i++){
                var img=$('<img>').attr('src','/image/'+response[i].image).addClass('character');
                $('.character-list').append(img);
            }
            $('.character').eq(0).css({
                position: 'fixed',
                bottom: 20+'px',
                left: 200+'px'
            })

            $('.character').eq(1).css({
                position: 'fixed',
                bottom: 20+'px',
                right: 200+'px'
            })
        }
    })

    //オプション情報の入手
    $.ajax({
        type: 'post',
        url: '/option',
        success: function(response){
            var commentSpeed=response.commentSpeed;
            var level=(100-commentSpeed)/10;
            $('.option-ball').css('left',0+level*20);
            $('.speed-value').val(commentSpeed);
        }
    })

    //セリフ一覧を確保
    $.ajax({
        type: 'post',
        url: '/story/getStory',
        success: function(response){
            storyList(response);
        }
    })

    //セリフを読んでいく
    $(document).on('click', '.story-comment', function (){
        var commentNum=$('.story-comment').index($(this));   
        var nextCommentText=$(this).next().text();  
        $(this).next().text('');
        var $storyComment=$(this).next();
        var selectOpenId=$(this).attr('select-open-id');

        if($('.story-comment').length-1==commentNum && selectOpenId==0){
            if($(this).attr('game-over-id')==1){
                var form=$('<form>',{
                    'action': '/main/gameOver'
                })
                $(document.body).append(form);
                form.submit();
                
                $('.story-screan').hide();
                console.log('game-over');
            }else{
                $('.story-screan').hide();
                //既読をつける
                $.ajax({
                    type: 'post',
                    url: '/story/readStory'
                })   
            }                
        }else{
            if(selectOpenId==0){
                $(this).next().show();        
                $('.story-name').eq(commentNum).next().show();    
                $('.story-comment').not($(this).next()).hide();
                $('.story-name').not($('.story-name').eq(commentNum).next()).hide();    
            }else{
                //選択肢の情報を確保
                var postData={
                    selectOpenId: selectOpenId
                }

                $.ajax({
                    type: 'post',
                    url: '/story/selectStory',
                    data: postData,
                    success: function(response){     
                        $('.select-storys').empty();
                        $('.select-story-screan').show();
                        for(let i=0;i<response.length;i++){
                            var selectStory=$('<div>').addClass('select-story').text(response[i].selectComment)
                            .attr('select-id',response[i].selectId).attr('select-open-id',selectOpenId);
                            $('.select-storys').append(selectStory);
                        }
                    }
                })
            }
        }     
        storySpeed($storyComment,nextCommentText);
    })

    //選択肢を選ぶ
    $(document).on('click','.select-story',function(){
        $('.story-names').empty();
        $('.story-comments').empty();
        $('.select-story-screan').hide();
        var selectId=$(this).attr('select-id');
        var selectOpenId=$(this).attr('select-open-id');

        var postData={
            selectId: selectId,
            selectOpenId: selectOpenId
        }

        $.ajax({
            type: 'post',
            url: '/story/selectDesicion',
            data: postData,
            success: function(response){                
                storyList(response);
            }
        })
    })
    
})