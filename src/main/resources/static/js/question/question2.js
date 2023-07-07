$(function(){ 
    $('.action-select').click(function(){
        var selectNum=$('.action-select').index($(this));
        var $actionOrder=$('.action-order').eq(selectNum)

        if($actionOrder.hasClass('action-open')){
            $actionOrder.hide();
            $actionOrder.removeClass('action-open');
            $('.action-select span').eq(selectNum).text('+');
            $('.action-list').eq(selectNum).css('height','70px');
        }else if(!$actionOrder.hasClass('action-open')){
            $actionOrder.show();
            $actionOrder.addClass('action-open');
            $('.action-select span').eq(selectNum).text('-');
            $('.action-list').eq(selectNum).css('height','140px');
        }
    })

    $('.cat').click(function(){
        var catVal=$('.catCount').val();
        $('.catCount').val(parseInt(catVal)+1);
    })

    $('.dog').click(function(){
        if($('.catCount').val()==3){
            var dogVal=$('.dogCount').val();
            $('.dogCount').val(parseInt(dogVal)+1);
            console.log($('.dogCount').val());
        }
    })

    $('.zou').click(function(){
        if($('.dogCount').val()==2){
            var zouVal=$('.zouCount').val();
            $('.zouCount').val(parseInt(zouVal)+1);
            console.log($('.zouCount').val());        
        }

        if($('.zouCount').val()==1){
            $('.door').fadeIn();
        }
    })

})