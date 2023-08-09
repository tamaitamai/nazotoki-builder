//右側のスクリーンにスクロール
export function rightScrean(screan){
    $('.right-screan').click(function(){
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

//左側のスクリーンにスクロール
export function leftScrean(screan){
    $('.left-screan').click(function(){
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
    })    
}

//元の画面に戻る
export function backScrean(hideScrean,showScrean){
    $('.back-screan').click(function(event){
        $(hideScrean).hide();
        $(showScrean).show();
        $('.right-screan,.left-screan').show();
        event.stopPropagation();//親要素を実行しない
    })
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
