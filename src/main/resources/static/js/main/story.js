import { gameOver } from "./save.js";

//文字送りスピード
export function storySpeed($storyComment,commentText){
    var speedVal=parseInt($('.comment-speed-value').val());
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
    var speedVal=parseInt($('.comment-speed-value').val());
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

//ゲームオバー時のコメント
export function gameOverState(comment){
    storySpeed2(0,$('.game-over-state'),comment);
    $('.game-over-state').show();              
}

//セリフの表示
export function storyList(response){
    for(let i=0;i<response.length;i++){
        var name=$('<p>').addClass('story-name').text(response[i].name);
        $('.story-names').append(name);
        //表示するセリフに情報の追加
        var comment=$('<p>').addClass('story-comment').text(response[i].comment)
        .attr('select-open-id',response[i].selectOpenId).attr('select-id',response[i].selectId)
        .attr('story-id',response[i].id).attr('game-over-id',response[i].gameOverId)
        .attr('character-id',response[i].characterId).attr('action-id',response[i].actionId)
        .attr('face',response[i].face).attr('comment-open-id',response[i].commentOpenId);
        $('.story-comments').append(comment);
    }
    $('.story-comment').not($('.story-comment').eq(0)).hide();
    $('.story-name').not($('.story-name').eq(0)).hide();  
    
    var $storyComment=$('.story-comment').eq(0);
    var commentText=$('.story-comment').eq(0).text();
    var commentOpenId=$('.story-comment').eq(0).attr('comment-open-id');

    $('.story-comment').eq(0).text('');
    if(commentOpenId==0){
        setTimeout(function(){
            storySpeed($storyComment,commentText);    
        },2200)        
    }else{
        storySpeed($storyComment,commentText);
    }

}

//探索中の追加選択肢
export function selectSearchAdd(searchText,searchClass){
    $('.select-searchs').empty();
    for(let i=0;i<searchText.length;i++){
        var selectSearch=$('<div>').addClass('select-search').text(searchText[i]).addClass(searchClass[i]);
        $('.select-searchs').append(selectSearch);    
    }
    $('.select-search-screan').show();
}

//キャラクターの情報の確保
export function character(characterId,num){
    if($('.story-screan').is(':visible')){
        var postData={
            characterId: characterId
        };
        $.ajax({
            type: 'post',
            url: '/story/character',
            data: postData,
            success: function(response){
                var img=$('<img>').attr('src','/image/'+response.image).addClass('character'+num)
                .attr('character-id',characterId);
                $('.character-list').append(img);
            }
        });   
        
        //キャラクターをリストに追加
        $.ajax({
            type: 'post',
            url: '/chapter/entryCharacterInsert',
            data: postData
        })        
    }
}

export function characterEntry(characterId,nextCharacterId){
    //新しいキャラクターの登場
    if(characterId!=nextCharacterId){
        //キャラクターの重複がないかを確認
        if(nextCharacterId==$('.character1').attr('character-id') ||
        nextCharacterId==$('.character2').attr('character-id') ||
        nextCharacterId==$('.character3').attr('character-id')){
            return false;
        }
                    
        $('.story-comments,.story-names').hide();

        if($('.character2').is(':visible')){
            character(nextCharacterId,3);            
            setTimeout(function(){
                $('.character3').css({
                    position: 'fixed',
                    bottom: 20+'px',
                    right: 500+'px'
                });        
            },200);                    
        }else{
            character(nextCharacterId,2);            
            setTimeout(function(){
                $('.character2').css({
                    position: 'fixed',
                    bottom: 20+'px',
                    right: 180+'px'
                });        
            },200);    
        }            
        setTimeout(function(){                
            $('.story-comments,.story-names').fadeIn();                                
        },1000);
    }    
}

//キャラクターの表情変化
export function faceChange(characterId,face){
    var postData={
        face: face,
        characterId: characterId
    }
    $.ajax({
        type: 'post',
        url: '/story/face',
        data: postData,
        success: function(response){
            for(let i=1;i<=3;i++){
                if($('.character'+i).attr('character-id')==characterId){
                    $('.character'+i).attr('src','/image/'+response);
                    break;
                }
            }                    
        }
    });
}

//キャラクターの感情の表示
export function characterEmotion(actionClass,image){
    $('.emotion').attr('src','/image/'+image);
    if(actionClass=='.character1'){
        $('.emotion').css('right',''); 
        $('.emotion').css('left','300px');
    }else{
        var right=$(actionClass).css('right');
        $('.emotion').css('left','');            
        $('.emotion').css('right',parseInt(right)+150+'px');            
    }
    $('.emotion').fadeIn();        
    setTimeout(function(){
        $('.emotion').fadeOut();
    },1000)
}

//キャラクターを上下に動かす
export function characterJump(actionClass){
    setTimeout(function(){
        $(actionClass).css('bottom','100px');
    },100);
    setTimeout(function(){
        $(actionClass).css('bottom','20px');
    },300);
}

//キャラクターのアクション
export function characterAction(actionClass,num){
    //アクション1
    if(num==1){
        characterJump(actionClass);
    }
    //アクション2
    if(num==2){
        characterEmotion(actionClass,'hatena.png');
    }

    //アクション3
    if(num==3){
        characterEmotion(actionClass,'heart.png');
    }

    //アクション4
    if(num==4){
        characterEmotion(actionClass,'heart.png');
        characterJump(actionClass);        
    }
}

//対象にしたいキャラクター番号
export function characterNum(characterId){
    for(let i=1;i<=3;i++){
        if($('.character'+i).attr('character-id')==characterId){            
            return '.character'+i;
        }
    }  
}

//会話ログをデータベースから取り出す場合
export function historyStory(response){
    $('.history-storys').empty();
    for(let i=0;i<response.length;i++){
        var historyName=$('<div>').addClass('history-name').text(response[i].name);
        var historyStory=$('<div>').addClass('history-story').text(response[i].comment);
        $('.history-storys').append(historyName).append(historyStory);    
    }
}

//会話ログをデータベースを使用せず表示
export function historyStory2(name,comment){
    var historyName=$('<div>').addClass('history-name').text(name);
    var historyStory=$('<div>').addClass('history-story').text(comment);
    $('.history-storys').append(historyName).append(historyStory);    
}

//選択肢を選ぶ
export function selectShow(num,selectOpenId){
    if($('.story-comment').length-1==num && selectOpenId==0){
        //ゲームオバーになるかを判別
        if($('.story-comment').eq(num).attr('game-over-id')==1){
            $('.blood').show();
            setTimeout(function(){
                gameOver();
            },1000);                
        }else{
            $('.story-screan').hide();
            //既読をつける
            // $.ajax({
            //     type: 'post',
            //     url: '/story/readStory'
            // })   
        }                
    }else{                    
        if(selectOpenId==0){
            $('.story-comment').eq(num).next().show();        
            $('.story-name').eq(num).next().show();    
            $('.story-comment').not($('.story-comment').eq(num).next()).hide();
            $('.story-name').not($('.story-name').eq(num).next()).hide();    
        }else{
            $('.auto').attr('auto','off');                
            //選択肢の情報を確保
            var postData={
                selectOpenId: selectOpenId
            }

            //選択肢の表示
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

}

// ストーリーイベント
$(function(){
    $('.select-story-screan').hide();
    $('.select-search-screan').hide();
    $('.story-names').hide();
    $('.story-comments').hide();

    $('.story-screan').css('background-image','url(/image/main/'+$('.background-story').val()+')');

    //会話をスキップする
    $('.skip').click(function(){
        $('.story-screan').hide();

        //既読をつける
        $.ajax({
            type: 'post',
            url: '/story/readStory'
        })
    })

    //履歴を表示する
    $('.history-open').click(function(){
        $('.history-story-screan').show();
    })

    $('.history-close').click(function(){
        $('.history-story-screan').hide();
    })

    //セリフ一覧を確保
    $.ajax({
        type: 'post',
        url: '/story/getStory',
        success: function(response){
            storyList(response);
            var characterId=$('.story-comment').eq(0).attr('character-id');
            character(characterId,1);
        }        
    })

    //キャラクター1の表示
    setTimeout(function(){
        $('.character1').css({
            position: 'fixed',
            bottom: 20+'px',
            left: 180+'px'
        })         
    },1000);

    //時間差でキャラクター1の名前とセリフの表示
    setTimeout(function(){
        $('.story-names').fadeIn();
        $('.story-comments').fadeIn();                
    },2000);


    let autoTime='';
    //セリフをautoにする
    $(document).on('click','.auto',function(){
        var autoSpeed=$('.auto-speed-value').val();//autoのスピード
        if(autoSpeed==''){
            autoSpeed=2000;
        }
        //autoのonとoffの表示の切替
        if($(this).attr('auto')=='off'){
            $(this).attr('auto','on');
            $(this).css('background-color','rgba(150, 150, 150,0.8)');            
        }else{
            clearTimeout(autoTime);
            $(this).attr('auto','off');
            $(this).css('background-color','rgba(0, 0, 0,0.8)');
        }

        //何番目のコメントかを調べる
        var commentNum='';
        for(let i=0;i<$('.story-comment').length;i++){
            if($('.story-comment').eq(i).is(':visible')){
                commentNum=i;
                break;
            }
        }
        
        //コメントを自動で進行させる
        function toggleComments(index) {
            autoTime=setTimeout(function () {
                var characterId=$('.story-comment').eq(index).attr('character-id');
                var nextCharacterId=$('.story-comment').eq(index+1).attr('character-id');
                var face=$('.story-comment').eq(index).next().attr('face');
                var actionId=$('.story-comment').eq(index).next().attr('action-id');
                var selectOpenId=$('.story-comment').eq(index).next().attr('select-open-id');
                
                //選択肢を選ぶ
                selectShow(index,selectOpenId);
                
                //キャラクターの追加
                characterEntry(characterId,nextCharacterId);

                //表情を変化させる
                if(!(face==undefined || face=='' || index==$('.story-comment').length-1)){            
                    faceChange(nextCharacterId,face);
                }
        
                //キャラクターにアクションをつける               
                for(let i=1;i<=3;i++){
                    if($('.character'+i).attr('character-id')==nextCharacterId){
                        characterAction('.character'+i,actionId);
                        break;
                    }
                }                    

                $('.story-name').eq(index).hide();
                $('.story-name').eq(index + 1).show();
                $('.story-comment').eq(index).hide();
                $('.story-comment').eq(index + 1).show();

                //次のセリフがあるかを判別
                if (index == $('.story-comment').length - 1) {
                    $('.story-screan').hide();
                }else if($('.auto').attr('auto')=='off'){                
                    $('.auto').css('background-color','rgba(0, 0, 0,0.8)');
                }else{
                    toggleComments(index + 1);                    
                }
            }, autoSpeed);
        }
        
        //autoがonのときに起動
        if($(this).attr('auto')=='on'){
            toggleComments(commentNum);
        }
        
    })

    //セリフを読んでいく
    $(document).on('click', '.story-comment', function (){
        // 履歴をデータベースに追加
        // var storyId=$(this).attr('story-id');
        // var postData={
        //     storyId: storyId
        // }
        // $.ajax({
        //     type: 'post',
        //     url: '/story/addHistoryStory',
        //     data: postData,
        //     success: function(response){
        //         historyStory(response);
        //     }
        // })

        //履歴にセリフを追加
        var commentNum=$('.story-comment').index($(this));   
        var name=$('.story-name').eq(commentNum).text();
        var comment=$(this).text();
        historyStory2(name,comment);

        var nextCommentText=$(this).next().text();  
        $(this).next().text('');
        var $storyComment=$(this).next();
        var selectOpenId=$(this).attr('select-open-id');
        
        selectShow(commentNum,selectOpenId);//選択肢を選ぶ
                
        var characterId=$(this).next().attr('character-id');//キャラクターid
        var face=$(this).next().attr('face');//表情
        var actionId=$(this).next().attr('action-id');//アクションid

        //セリフを時間差で表示
        if(characterId==$('.character1').attr('character-id') ||
        characterId==$('.character2').attr('character-id') ||
        characterId==$('.character3').attr('character-id')){
            storySpeed($storyComment,nextCommentText);
        }else{
            setTimeout(function(){
                storySpeed($storyComment,nextCommentText);
            },1800)    
        }

        

        //キャラクターの表情を変化させる
        if(!(face==undefined || face=='' || $('.story-comment').index(this)==$('.story-comment').length-1)){            
            faceChange(characterId,face);
        }

        //キャラクターにアクションをつける               
        for(let i=1;i<=3;i++){
            if($('.character'+i).attr('character-id')==characterId){
                characterAction('.character'+i,actionId);
                break;
            }
        }                   

        //キャラクターの登場
        characterEntry($(this).attr('character-id'),$(this).next().attr('character-id'));
        
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

        //分岐したセリフの表示
        $.ajax({
            type: 'post',
            url: '/story/selectDesicion',
            data: postData,
            success: function(response){                
                storyList(response);
                var characterId=$('.story-comment').eq(0).attr('character-id');
                var face=$('.story-comment').eq(0).attr('face');
                var actionId=$('.story-comment').eq(0).attr('action-id');
            
                characterAction(characterNum(characterId),actionId);                
                if(!(face=='' || face==undefined)){
                    faceChange(characterId,face);
                }
            }
        })
    })
    
    //状態表示を閉じる
    $(document).on('click','.state',function(){
        var stateLength=$('.state').length;
        var stateNum=$('.state').index(this);
        if(stateNum==stateLength-1){
            $('.state').hide();        
        }else{
            $('.state').eq(stateNum).hide();
            $('.state').eq(stateNum+1).show();
        }        
    })
    
})