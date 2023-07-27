$(function(){
    $.ajax({
        type: 'post',
        url: '/story/getCharacter',
        success: function(response){
            console.log(response);
            $('.character1').attr('src','/image/'+response[0].image);
            $('.character2').attr('src','/image/'+response[1].image);
        }
    })

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

            let currentIndex = 0;
            let interval = setInterval(function() {                
                const animatedText = commentText.slice(0, currentIndex + 1);
                $storyComment.text(animatedText);
                currentIndex++;
    
                if (currentIndex === commentText.length) {
                clearInterval(interval);
                }
            }, 30);
        }
    })

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

        let currentIndex = 0;
        let interval = setInterval(function() {                
            const animatedText = nextCommentText.slice(0, currentIndex + 1);
            $storyComment.text(animatedText);
            currentIndex++;

            if (currentIndex === nextCommentText.length) {
            clearInterval(interval);
            }
        }, 30);

    })
})