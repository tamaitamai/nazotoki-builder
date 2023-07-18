$(function(){  
    $('body').hover(
        function(){
            if($('.light').attr('value')==1){
                $('.cursor-light').show();
            }            
        },
        function(){
            if($('.light').attr('value')==0){
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
        if($('.light').attr('value')==1){
            $('.light').css('border','none');
            $('.cursor-light').hide();
            $('.light').attr('value',0);
        }else{
            $('.light').css('border','3px solid aquamarine');            
            $('.cursor-light').show();
            $('.light').attr('value',1);
        }       
    })

    $('.get-image').click(function(){
        if($(this).attr('item-id')==4){
            $(this).addClass('light');
        }
    });

})