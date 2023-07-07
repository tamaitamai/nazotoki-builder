$(function(){
    $('.next-question').hide();
    $('.hidden-word').hide();

    //解答ボタンを押したときの処理
    $('.answer-btn').click(function(){
        var answerBtn=$('.answer-btn').index($(this));//問題番号
        var answerBox=$('.answer-box').eq(answerBtn).val();//記入した内容
        var questionAnswer=$('.question-answer').eq(answerBtn).val();//解答   

        for(let i=0;i<$('.question-box').length;i++){
            if($('.question-box').eq(i).hasClass('open-question')){
                var questionNum=i;
                break;
            }
        }

        var nextIf=$('.next-if').eq(questionNum).val();
        if(answerBox==questionAnswer){//記入した内容と解答が一致したら色を変える
            if($('.question-list').eq(answerBtn).css('background-color')!='rgb(169, 169, 169)'){
                $('.question-list').eq(answerBtn).css('background-color','darkgrey')
                $('.next-if').eq(questionNum).val(parseInt(nextIf)+1);    
            }
        }
        nextIf=$('.next-if').eq(questionNum).val();
        if(nextIf==3){
            $('.hidden-word').eq(questionNum).show();
        }        
    });

    //矢印を押したときの移動
    $('.question-move').click(function(){
        var boxNum=$('.question-box').length;
        
        for(let i=0;i<boxNum;i++){
            if($('.question-box').eq(i).hasClass('open-question')){
                if($(this).hasClass('right-move')){
                    if(i==boxNum-1){
                        $('.open-question').removeClass('open-question');
                        $('.question-box').eq(0).addClass('open-question');        
                    }else{
                        $('.open-question').removeClass('open-question');
                        $('.question-box').eq(i).next().addClass('open-question');        
                    }
                }else if($(this).hasClass('left-move')){
                    if(i==0){
                        $('.open-question').removeClass('open-question');
                        $('.question-box').eq(boxNum-1).addClass('open-question');        
                    }else{
                        $('.open-question').removeClass('open-question');
                        $('.question-box').eq(i).prev().addClass('open-question');        
                    }
                }
                break;
            }
        }
    })

    //問題番号を押したときのページの移動
    $('.question-level').click(function(){
        var $questionBox=$('.question-box')
        var boxLength=$questionBox.length;
        
        var questionLevel=$('.question-level').index($(this));
        for(let i=0;i<boxLength;i++){
            if($questionBox.eq(i).hasClass('open-question')){
                questionLevel-=i*3;
                break;
            }
        }
        $('.open-question').removeClass('open-question');
        $('.question-box').eq(questionLevel).addClass('open-question');
    })

    //次の問題へ行くための処理
    $('.dog').click(function(){
        var nextValue=0;
        if($('.dog').index($(this))==2){
            nextValue=parseInt($('.next-value').val());
            $('.next-value').val(nextValue+1);
        }

        console.log(nextValue);
        if(nextValue==2){
            $('.next-question').show();
        }
    })
})