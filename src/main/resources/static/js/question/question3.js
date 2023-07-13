$(function(){  
    $('body').hover(
        function(){
            if($('.light').css('border')=='2.66667px solid rgb(127, 255, 212)'){
                $('.cursor-light').show();
            }            
        },
        function(){
            if($('.light').css('border')=='0px none rgb(0, 0, 0)'){
                $('.cursor-light').hide();
            }            
        }
    );

    $('body').mousemove(function(e) {
        var relX = e.pageX;
        var relY = e.pageY;
    
        $(this).find('.cursor-light').css({
            top: relY + 'px',
            left: relX + 'px'
        });
    });

    $('.light').click(function(){
        if($('.light').css('border')=='2.66667px solid rgb(127, 255, 212)'){
            $('.light').css('border','none');
            $('.cursor-light').hide();
        }else{
            $('.light').css('border','3px solid aquamarine');            
            $('.cursor-light').show();
        }
        
    })
})