<?php
if(empty($_POST['operation'])) {
    //儲存失敗
    _json(400, null,'照片儲存失敗');
}
if($_POST['operation'] === 'add') {
    // POST操作為add的話儲存照片
    if(is_uploaded_file($_FILES['webcam']['tmp_name']) && isset($_POST['time'])){
        $name = "record/" . $_POST['time'] . '.jpg';
        move_uploaded_file($_FILES['webcam']['tmp_name'], $name);
        _json(200, $name, '照片儲存成功');
    }

} else if($_POST['operation'] === 'delete') {
    // POST操作為delete的話刪除已被儲存的照片
    if(isset($_POST['img'])) {
        $IMG = __DIR__ . '/' . $_POST['img'];
        echo $IMG;
        if(file_exists($IMG)) {
            unlink($IMG);
            _json(400, null,'照片刪除成功');
        }
    }
}

// 返回json格式
function _json($status, $data, $msg) {
    echo json_encode(
        [
            'status' => $status,
            'data' => $data,
            'msg' => $msg
        ], JSON_UNESCAPED_UNICODE);
    exit();
}