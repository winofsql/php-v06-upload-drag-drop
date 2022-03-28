// *************************************
// 簡易スマホチェック
// *************************************
jQuery.isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
toastr.options={"closeButton":false,"debug":false,"newestOnTop":false,"progressBar":false,"positionClass":"toast-bottom-center","preventDuplicates":false,"onclick":null,"showDuration":"300","hideDuration":"1000","timeOut":"3000","extendedTimeOut":"1000","showEasing":"swing","hideEasing":"linear","showMethod":"fadeIn","hideMethod":"fadeOut"};
if ( !$.isMobile ) {
    toastr.options.positionClass = "toast-top-center";
}

var files = null;

$(function(){

    $("#file_drop").on("dragenter", function(e){
        e.stopPropagation();
        e.preventDefault();

        $(this).css("background-color","#ddd");

        console.log("dragenter");
        
    } );
    $("#file_drop").on("dragover", function(e){
        e.stopPropagation();
        e.preventDefault();		

    } );
    $("#file_drop").on("dragleave", function(e){
        e.stopPropagation();
        e.preventDefault();		

        $(this).css("background-color","#fff");
    } );
    $("#file_drop").on("drop", function(e){

        // 結果の表示エリアを全てクリア
        $("#result").html( "" );

        e.stopPropagation();
        e.preventDefault();		

        $(this).css("background-color","#fff");

        files = e.originalEvent.dataTransfer.files;
        for( i = 0; i < files.length; i++ ) {
            console.dir(files[i]);

            // FileReader は毎回作成(同時に複数のファイルを扱えない)
            var reader = new FileReader();
            // オリジナルファイル名をプロパティとして追加しておく
            reader.name = files[i].name;
            reader.type = files[i].type;

            // FileReader に画像が読み込まれた時のイベント
            $(reader).on("load", function () {

                console.dir("type:"+this.type);

                if ( this.type.indexOf("image/") == 0 ) {
                    // div の中に img 要素を追加してその都度 this.result(ArrayBuffer) をセット
                    $("<img>").appendTo("#image")
                        .prop( {"src": this.result, "title": this.name + " : " + this.type } )
                        .css( {"width": "160px", "margin": "10px","border": "1px solid #c0c0c0" } );
                }
                else {
                    $("<img>").appendTo("#image")
                        .prop( {"src": "./notimage.png", "title": this.name + " : " + this.type } )
                        .css( {"width": "160px", "margin": "10px","border": "1px solid #c0c0c0" } );
                }
            });

            // 上記イベントを発動するための処理( this.files[i] は blob )
            if (files[i]) {
                // 画像を読み込み
                reader.readAsDataURL(files[i]);
            }
        }
        
    } );

    $(document).on('dragenter', function (e)
    {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('dragover', function (e)
    {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('drop', function (e)
    {
        e.stopPropagation();
        e.preventDefault();

    });


});
