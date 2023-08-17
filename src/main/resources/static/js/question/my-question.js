//右側の画面に移動
export function rightScrean(){
    $(document).on('click','.right-screan',function(){
        var screan='.'+$(this).parent().attr('class');
        var screanNum='';
        var screanLength=$(screan).length;
        for(let i=0;i<screanLength;i++){
            if($(screan).eq(i).is(':visible')){
                if(i==screanLength-1){
                    screanNum=0;
                }else{
                    screanNum=i+1;
                }                
                break;
            }
        }       
        $(screan).hide();
        $(screan).eq(screanNum).show();
    })

}

//左側の画面に移動
export function leftScrean(){
    $(document).on('click','.left-screan',function(){
        var screan='.'+$(this).parent().attr('class');
        var screanNum='';
        var screanLength=$(screan).length;
        for(let i=0;i<screanLength;i++){
            if($(screan).eq(i).is(':visible')){
                if(i==0){
                    screanNum=screanLength-1;
                }else{
                    screanNum=i-1;
                }                
                break;
            }
        }       
        $(screan).hide();
        $(screan).eq(screanNum).show();

        backScrean(screanNum);
    })    
}


// 左右移動の表示を追加
export function leftAndRigntAdd(screan){
    var left=$('<div>').addClass('left-screan').text('《');
    var right=$('<div>').addClass('right-screan').text('》');
    $(screan).append(left).append(right);
}

//下移動の表示の追加
export function backAdd(screan){
    var back=$('<div>').addClass('back-screan').text('》');
    $(screan).append(back);
}

// 元の画面に戻る
export function backScrean(num,hideScrean,showScrean,show){
    $('.back-screan').eq(num).click(function(event){
        $(hideScrean).hide();
        $(showScrean).eq(show).show();     
        if($(showScrean).length!=1){
            leftAndRigntAdd(showScrean);
        }
        $('.back-screan').show();
        event.stopPropagation();//親要素を実行しない
    })
}

//画面拡大時の表示
export function expand(screan){
    $(screan).show();
    $('.left-screan,.right-screan,.back-screan').hide();
    $('.back-screan').hide();
    $(screan).find('.back-screan').show();
}

//特定の場所にカーソルがあるときに表示を変更する
export function screanCurcor(object,num,xmin,xmax,ymin,ymax,visible){
    $(object).eq(num).on("mousemove", function(e) {
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;

        //カーソルの位置条件の確認
        var cursor='';
        for(let i=0;i<xmin.length;i++){
            cursor||=(relX > xmin[i] && relX < xmax[i] && relY > ymin[i] && relY < ymax[i]);
        }

        //表示がないかを確認
        var visibleIf=true;
        for(let i=0;i<visible.length;i++){
            if($(visible[i]).is(':visible')){
                visibleIf=false;
                break;
            }
        }

        //カーソルの表示
        if(visibleIf){
            if (cursor) {
                $(this).css('cursor','pointer');
            }else{
                $(this).css('cursor','');
            }
        }else{
            $(this).css('cursor','');
        }
    });
}

export function visibleIf(visible){
    for(let i=0;i<visible.length;i++){
        if($(visible[i]).is(':visible')){
            return false;
        }
    }
    return true;
}
