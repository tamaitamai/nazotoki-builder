$(function(){
    $('.return').click(function(){
        $('.check-screan').hide();
    })

    $('.reset-btn').click(function(){
        $('.check-screan').show();
    })
    
    var bgm = $('.decision-bgm')[0];
    $('.reset-btn').click(function(){
        bgm.play();
    })

    $('.load-btn').click(function(){
        bgm.play();
    })

})

