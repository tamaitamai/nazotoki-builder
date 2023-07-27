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