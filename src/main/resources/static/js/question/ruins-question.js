import {hideItem,objectPostion,DoubleObjectPosition,objectSize,
    myItemList,objectHide,unionSelect, changeItem, getItem} from '../main/my-item.js';
import { chapterSave, gameOver, urlCreate } from '../main/save.js';
import { addState, firstState, gameOverState, selectSearchAdd } from '../main/story.js';
import { backScrean, leftAndRigntAdd, leftScrean, rightScrean, screanCurcor, visibleIf } from './my-question.js';

//松明に着火する
export function ignition(clickClass){
    var unionId=$('.item-select').attr('item-union');
    var myItemId=$('.item-select').attr('my-item-id');
    var itemId=$('.item-select').attr('item-id');
    

    var postData={
        unionId: unionId,
        myItemId1: myItemId,
        myItemId2: 0
    };

    //アイテムを合成(松明に火をつける)
    $.ajax({
        type: 'post',
        url: '/item/union',
        data: postData,
        success: function(response){
            // itemCheck(unionId,'/item/unionItemLoad');//合成後のアイテムの詳細を表示
            $('.item-list').hide();
            $('.item-select').hide();
            //持ち物の選択をリセット
            for(let i=0;i<$('.get-image').length;i++){
                $('.get-image').eq(i).attr('value',0);
                $('.get-border').eq(i).css('border','none');    
            }                                        

            myItemList(response);
            unionSelect(2);
        }
    })
    hideItem(itemId);

    
    var thisId=$(clickClass).attr('item-id');
    hideItem(thisId);                
    $(clickClass).hide();    
}

$(document).ready(function(){
    $('.ruins-screan').not($('.ruins-screan').eq(0)).hide();  
    $('.ruins-room-screan').hide();
    // $('.altar-screan').show();

    // $('.ruins-room-screan').show();
    // $('.ruins-room-screan').not($('.ruins-room-screan').eq(0)).hide();  

    //遺跡の背景
    $('.ruins-screan').eq(0).css('background-image','url(/image/main/ruins.jpg)');
    $('.ruins-screan').eq(1).css('background-image','url(/image/main/ruins2.jpg)');
    $('.ruins-screan').eq(2).css('background-image','url(/image/main/ruins3.jpg)');

    //遺跡の部屋の背景
    $('.ruins-room-screan').eq(0).css('background-image','url(/image/main/ruins-road.jpg)');
    $('.ruins-room-screan').eq(1).css('background-image','url(/image/main/ruins-room.jpg)');

    // 表示の状態
    if($('.girl-ice-change').val()=='true'){
        $('.girl-ice').hide();
        $('.girl-ice-happy').show();
    }

    if($('.first-ice-change').val()=='true'){
        $('.first-ice').hide();
        $('.second-ice').show();
    }

    if($('.second-ice-change').val()=='true'){
        $('.second-ice').hide();
    }

    objectHide('.ice');
    objectHide('.fire');

    // アイテム位置
    objectPostion('.item-genre',0,300,500);
    objectPostion('.item-genre',3,550,700);

    //画面の遷移
    leftScrean();
    rightScrean();
    backScrean(0,'.ruins-room-screan','.ruins-screan',0);
    backScrean(1,'.ruins-room-screan','.ruins-screan',0);
    backScrean(2,'.altar-screan','.ruins-screan',1);

    //遺跡の画面1
    const xminRuins1=[1100,150];
    const xmaxRuins1=[1150,250];
    const yminRuins1=[430,500];
    const ymaxRuins1=[500,650];
    screanCurcor('.ruins-screan',0,xminRuins1,xmaxRuins1,yminRuins1,ymaxRuins1,'');

    $(document).on('click','.ruins-screan:eq(0)',function(e){
        var parentOffset=$(this).offset();
        var relX=e.pageX-parentOffset.left;
        var relY=e.pageY-parentOffset.top;
        if(relX>1100 && relX<1150 && relY>430 && relY<500){
            $('.ruins-room-screan').eq(0).show();
            $('.left-screan,.right-screan').hide();
            leftAndRigntAdd('.ruins-room-screan');
        }else if(relX>150 && relX<250 && relY>500 && relY<650){
            $('.pillar-screan').show();
        }
    });

    //遺跡の部屋1
    const xminRuinsRoom1=[800];
    const xmaxRuinsRoom1=[900];
    const yminRuinsRoom1=[400];
    const ymaxRuinsRoom1=[500];
    const visibleRuinsRoom1=['.wolf','.game-over-state'];
    screanCurcor('.ruins-room-screan',0,xminRuinsRoom1,xmaxRuinsRoom1,yminRuinsRoom1,ymaxRuinsRoom1,visibleRuinsRoom1);

    let stateTime='';
    let bloodTime='';
    let gameOverTime='';
    $(document).on('click','.ruins-room-screan:eq(0)',function(e){
        var parentOffset=$(this).offset();
        var relX=e.pageX-parentOffset.left;
        var relY=e.pageY-parentOffset.top;
        if(visibleIf(visibleRuinsRoom1)){
            if(relX>800 && relX<900 && relY>400 && relY<500){
                gameOverState('ここから先がいやな気配がする...');
                setTimeout(function(){
                    $('.game-over-state').hide();
                    const selectText=['このまま進む','引き返す'];
                    const selectClass=['wolf-select1','wolf-select2'];
                    selectSearchAdd(selectText,selectClass);    
                },1000);
            }    
        }
    });

    //選択肢1の場合
    $(document).on('click','.wolf-select1',function(){
        $('.select-search-screan').hide();
        if($('.wolf-change').val()!='true'){
            $('.wolf').show();
                                
            setTimeout(function(){
                $('.wolf').css({
                    width: '600px',
                    height: '700px',
                    left: '600px'
                },1000)                    
                gameOverState('こいつ！さっきの！！こんなとこまで来ていたのか...')
            });

            setTimeout(function(){
                $('.game-over-state').hide();
            },2000);

            stateTime=setTimeout(function(){
                gameOverState('もうだめだ～！！');
            },5000);
        
            bloodTime=setTimeout(function(){
                $('.game-over-state').hide();
                $('.blood').show();
            },7000);
            
            gameOverTime=setTimeout(function(){
                gameOver();
            },8000);
        }else{
            firstState('こっちには用はない');
        }
    });

    //選択肢2の場合
    $(document).on('click','.wolf-select2',function(){
        $('.select-search-screan').hide();
    })

    //狼のイベント
    $(document).on('click','.wolf',function(e){
        if($('.item-select').hasClass('gun')){
            $('.wolf-change').val('true');
            changeItem(15);
            
            clearTimeout(stateTime);
            clearTimeout(bloodTime);
            clearTimeout(gameOverTime);
            setTimeout(function(){
                gameOverState('ぐおおおおおおお！！！');                
            },200);
            setTimeout(function(){
                $('.game-over-state').hide();
                $('.wolf').hide();
                $('.blood').show();
            },1000);
            setTimeout(function(){
                $('.blood').hide();
                getItem(25);    
            },2000);

            e.stopPropagation();//親要素を実行しない
        }        
    });

    //遺跡の画面2
    const xminRuins2=[200];
    const xmaxRuins2=[300];
    const yminRuins2=[350];
    const ymaxRuins2=[500];
    screanCurcor('.ruins-screan',1,xminRuins2,xmaxRuins2,yminRuins2,ymaxRuins2,'');

    $(document).on('click','.ruins-screan:eq(1)',function(e){
        var parentOffset=$(this).offset();
        var relX=e.pageX-parentOffset.left;
        var relY=e.pageY-parentOffset.top;
        if(relX>200 && relX<300 && relY>350 && relY<500){
            $('.altar-screan').show();
            $('.left-screan,.right-screan').hide();
        }
    });

    //祭壇の画面
    const xminAltar1=[680];
    const xmaxAltar1=[900];
    const yminAltar1=[150];
    const ymaxAltar1=[320];
    screanCurcor('.altar-screan',0,xminAltar1,xmaxAltar1,yminAltar1,ymaxAltar1,'');

    $(document).on('click','.altar-screan:eq(0)',function(e){
        var parentOffset=$(this).offset();
        var relX=e.pageX-parentOffset.left;
        var relY=e.pageY-parentOffset.top;
        if(relX>680 && relX<900 && relY>150 && relY<320){
            if(!$('.first-ice').is(':visible') || !$('.second-ice').is(':visible')){
                urlCreate('gameClear');
            }            
        }
    });


    //氷をクリックしたときにfireクラスの持ち物を選択していたら、氷を溶かす
    $('.ice').click(function(e){
        if($('.item-select').hasClass('use-fire-on')){
            $(this).hide();        
            $('.fire-on').val(0);

            var itemId=$(this).attr('item-id');
            hideItem(itemId);
            $('.item-select').hide();            

            var postData={
                unionId: $('.item-select').attr('item-union'),
                myItemId: $('.item-select').attr('my-item-id')
            }

            //アイテムを合成前に戻す(松明の火を消す)
            $.ajax({
                type: 'post',
                url: '/item/resetUnion',
                data: postData,
                success: function(response){
                    //持ち物の選択をリセット
                    for(let i=0;i<$('.get-image').length;i++){
                        $('.get-image').eq(i).attr('value',0);
                        $('.get-border').eq(i).css('border','none');    
                    }
                    myItemList(response);
                    unionSelect(2);
                }
            })   
            if($(this).hasClass('first-ice')){
                $('.second-ice').show();
                changeItem(17);
            }  
            
            if($(this).hasClass('second-ice')){
                changeItem(18);
            }
        }

        e.stopPropagation();
    })

    //松明を選択していて火がついていないときに火をつける
    $(document).on('click','.fire',function(){
        if($(this).hasClass('burning-fire') && !$('.item-select').hasClass('use-fire-off')){
            firstState('焚火だな...火をつけるのに使えそうだ...');
            addState(1,'でも火が消えたらこの子起こるだろうな～');    
        }

        if($('.item-select').hasClass('use-fire-off')){  
            if($(this).hasClass('burning-fire')){        
                if($('.girl-ice').is(':visible')){
                    gameOverState('この焚火から火をつけれそうだ...でも火をつけたら消えてしまう');
                    setTimeout(function(){
                        $('.game-over-state').hide();
                        const selectText=['盗む','やめておく'];
                        const selectClass=['burning-fire-select1','burning-fire-select2'];
                        selectSearchAdd(selectText,selectClass);                            
                    },1000);
                }else{
                    ignition(this);
                }
            }else{
                ignition(this);
            }     
        }   
    })

    //選択肢1の場合
    $(document).on('click','.burning-fire-select1',function(){
        $('.select-search-screan').hide();
        gameOverState('なにすんのさ！！さむいだろ！！');
        setTimeout(function(){
            $('.game-over-state').hide();
            gameOverState('うわーーーーーーーーーーー！！！');
        },2000)
        setTimeout(function(){
            $('.game-over-state').hide();
            $('.game-over-ice').show();
        },4000)
        setTimeout(function(){
            gameOver();
        },6000)                        
    })

    //選択肢2の場合
    $(document).on('click','.burning-fire-select2',function(){
        $('.select-search-screan').hide();
    })

    //焚火で温まる女の子のイベント
    $('.girl-ice').click(function(){
        if($('.item-select').hasClass('fur')){
            firstState('おお！！暖かい毛皮～焚火は好きにしていいよ～');
            $('.girl-ice').hide();
            var $girlIceHappy=$('.girl-ice-happy');
            $girlIceHappy.show();
            setTimeout(function(){
                $girlIceHappy.css('top','300px');
            },100);
            setTimeout(function(){
                $girlIceHappy.css('top','350px');
            },200);
            changeItem(16);            
        }else{
            firstState('寒い、寒いよ～！！焚火はあったかいな～...');
            addState(1,'む！！そこの君、焚火を消したら許さないからね...');    
        }
    })

    $('.girl-ice-happy').click(function(){
        firstState('もふもふだ～あったかい');
    })

    //箱1
    $('.box1').click(function(){        
        $('.box-show-screan').show();
    })

    //戻るボタンを押したときの動作
    $('.return-btn').click(function(){
        $('.pillar-screan').hide();
        $('.box-show-screan').hide();

    })
})


