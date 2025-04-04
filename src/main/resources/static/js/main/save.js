//データのセーブ
export function chapterSave(chapterId){
    var postData={
        chapterId: chapterId
    }
    $.ajax({
        type: 'post',
        url: '/chapter/save',
        data: postData
    })

}

//ゲームオーバー画面に移動
export function gameOver(){
    var form=$('<form>',{'action': '/main/gameOver'});
    $(document.body).append(form);
    form.submit();    
}

//新しいurlの追加
export function urlCreate(url){
    var form=$('<form>',{'action': '/main/'+url});
    $(document.body).append(form);
    form.submit();    
}