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

$(function(){
    //キャラクターの確保
    $.ajax({
        type: 'post',
        url: '/story/getCharacter',
        success: function(response){
            console.log(response);
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
            for(let i=0;i<response.length;i++){
                var name=$('<p>').addClass('story-name').text(response[i].name);
                $('.story-names').append(name);
                var comment=$('<p>').addClass('story-comment').text(response[i].comment);
                $('.story-comments').append(comment);
            }
            $('.story-comment').not($('.story-comment').eq(0)).hide();
            $('.story-name').not($('.story-name').eq(0)).hide();  
            
            var $storyComment=$('.story-comment').eq(0);
            var commentText=$('.story-comment').eq(0).text();

            storySpeed($storyComment,commentText)
        }
    })

    //セリフを読んでいく
    $(document).on('click', '.story-comment', function (){
        var commentNum=$('.story-comment').index($(this));   
        var nextCommentText=$(this).next().text();  
        $(this).next().text('');
        var $storyComment=$(this).next();

        if($('.story-comment').length-1==commentNum){
            $('.story-screan').hide();
        }else{
            $(this).next().show();        
            $('.story-name').eq(commentNum).next().show();    
            $('.story-comment').not($(this).next()).hide();
            $('.story-name').not($('.story-name').eq(commentNum).next()).hide();
        }     

        storySpeed($storyComment,nextCommentText);
    })
})