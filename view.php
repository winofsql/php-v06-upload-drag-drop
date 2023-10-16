<!DOCTYPE html>
<html>
<head>
<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">
<meta charset="UTF-8">
<title>複数ファイルアップロード</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.1/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js"></script>

<script src="client.js?_=<?= time() ?>"></script>
<script src="upload.js?_=<?= time() ?>"></script>

<style>

#content {
    margin: 26px;
}

#file_drop, #gomi {
    width: 400px;
    height: 70px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #000;
    display: inline-block;
}

</style>
</head>
<body>
<h3 class="alert alert-primary">
    <a href="./">アップロード</a>
    <a href=".." style="float:right;text-decoration:none;">📂</a>
</h3>
<div id="content">
    <form
        id="frm"
        method="POST">
        <div class="mb-3">
            <div id="file_drop">ここにドロップ</div>
        </div>
        <div class="mb-3">
            <input type="submit"
                name="send"
                value="アップロード"
                class="me-4 btn btn-outline-primary">
            <a class="btn btn-info" href="<?= $_SERVER["PHP_SELF"] ?>">リロード</a>
        </div>
        <div id="image"></div>
    </form>
</div>
<div id="result" class="m-4"><?= $result_message ?></div>
</body>
</html>
