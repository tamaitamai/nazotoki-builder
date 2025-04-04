$(function(){
    $('.return').click(function(){
        $('.check-screan').hide();
    })

    $('.reset-btn').click(function(){
        $('.check-screan').show();
    })
    
    var decisionBgm = $('.decision-bgm')[0];
    var selectBgm = $('.select-bgm')[0];

    $('.reset-btn').click(function(){     
        decisionBgm.play();
    });


    $('.reset-btn, .load-btn').hover(
        function(){        
            selectBgm.play();
        },
        function(){

        }
    );  


    // ボタンクリック時の処理
    $('.load-btn').click(function(event) {
        event.preventDefault(); // ボタンのデフォルトの挙動を防ぐ

        // ページ遷移先のURLを取得
        var dataUrl = $('#chapterLoadUrl').val();
        console.log(dataUrl);

        // 効果音を再生
        decisionBgm.play();

        // 効果音の再生を待つための遅延（例：2秒）
        setTimeout(function() {
            // POSTリクエストを行うためのフォームを動的に生成
            var form = $('<form>', {
                'method': 'POST',
                'action': dataUrl
            });

            // サブミット
            $(document.body).append(form);
            form.submit();
        }, 1000); // 2秒 (2000ミリ秒) 後にPOSTリクエストを行う
    });

})

