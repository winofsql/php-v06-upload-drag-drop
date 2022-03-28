$(function(){

    // *************************************
    // アップロード処理
    // *************************************
    $("#frm").submit( function(event){

        // 本来の送信処理はキャンセルする
        event.preventDefault();

        // アップロードする画像があるかどうかのチェック
        if ( $("#image").html() == "" ) {
            options.error("アップロードする画像ファイルを選択して下さい");
            return;
        }

        if ( !confirm("アップロードを開始してもよろしいですか?") ) {
            return;
        }

        // 操作不可に設定
        $("#content input").prop("disabled", true);

        // 結果の表示エリアを全てクリア
        $("#result").html( "" );

        // **************************************
        // ファイルのアップロード
        // **************************************
        console.log("アップロード処理開始");

        var formData = new FormData();

        // 画像データサイズの制限
        formData.append("MAX_FILE_SIZE", 10000000);

        var file_cnt = 0;

        // formData に全てのファイルを追加
        for( i = 0; i < files.length; i++ ) {

            formData.append("image"+(i+1), files[i]);

            file_cnt++;

        }
        
        formData.append("FILE_COUNT", file_cnt );

        $.ajax({
            url: "./upload.php",
            type: "POST",
            data: formData,
            processData: false,  // jQuery がデータを処理しないよう指定
            contentType: false   // jQuery が contentType を設定しないよう指定
        })
        .done(function( data, textStatus ){
            console.log( "status:" + textStatus );
            console.log( "data:" + JSON.stringify(data, null, "    ") );

            var count = 0;

            // アップロード結果の表示
            $.each(data, function( idx, image ){

                console.log(idx);

                if ( image.error != 0 ) {
                    $("#result").append("<span id=\"result" +idx+"\"></span><b style='color:red'>" + image.name+ " : " + image.result +"</b><br>");
                }
                else {
                    $("#result").append("<span id=\"result" +idx+"\"></span>" + image.name + " : " + image.result + "<br>");
                }

                // 選択した画像の表示を追加
                $( "#result"+idx ).append($("#image img").eq(count).css("width","100px").clone());
                count++;

            });

            // 画像表示のクリア
            $("#target").val("");
            $("#image").html("");

        })
        .fail(function(jqXHR, textStatus, errorThrown ){
            console.log( "status:" + textStatus );
            console.log( "errorThrown:" + errorThrown );
        })
        .always(function() {

            // 操作不可を解除
            $("#content input").prop("disabled", false);
        })
        ;

    });

});
