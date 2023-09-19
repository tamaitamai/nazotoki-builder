$(function(){
    $.ajax({
        type: 'post',
        url: '/chapter/characterList',
        success: function(response){
            for(let i=0;i<response.length;i++){
                var characterImage=$('<img>').attr('src','/image/'+response[i].image).addClass('character-image');
                $('.character').eq(i).append(characterImage).attr('name',response[i].name)
                .attr('explanation',response[i].explanation).attr('image',response[i].image);
            }
        }
    })

    $('.character-detail').hide();

    $('.character').click(function(){
        var characterImage=$(this).attr('image');
        var characterName=$(this).attr('name');
        var characterExplanation=$(this).attr('explanation');
        $('.character-detail-image').attr('src','/image/'+characterImage);
        $('.character-detail-name').text(characterName);
        $('.character-detail-explanation').text(characterExplanation);
        $('.character-detail').show();
    })

    $('.character-detail-close').click(function(){
        $('.character-detail').hide();
    })
})