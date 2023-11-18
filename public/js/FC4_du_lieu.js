var currentSegment = 0;
var rowsPerPage = 1000; // Số dòng hiển thị mỗi trang
var totalSegments = 0; // Tạo một biến để lưu tổng số trang, Mặc định có ít nhất một trang

function updateTotalSegments(len) {
    totalSegments = Math.ceil(len / rowsPerPage); // Tính tổng số trang dựa trên độ dài của dữ liệu và số dòng trên mỗi trang
}

fn_Table01_SQL_Show();
// Chương trình con đọc dữ liệu SQL
function fn_Table01_SQL_Show() {
    socket.emit("msg_SQL_Show", "true");
    socket.on('SQL_Show', function (data) {
        fn_table_01(data);
    });
}

// Chương trình con hiển thị SQL ra bảng
function fn_table_01(data) {
    if (data) {
        $("#table_01 tbody").empty();
        var len = data.length;
        var txt = "<tbody>";
        if (len > 0) {
            updateTotalSegments(len); // Gọi hàm để tính tổng số trang

            var startIndex = currentSegment * rowsPerPage;
            var endIndex = Math.min(startIndex + rowsPerPage, len);
            for (var i = startIndex; i < endIndex; i++) {
                    txt += "<tr><td>"+data[i].date_time
                        +"</td><td>"+data[i].Den_auto
                        +"</td><td>"+data[i].Den_manual
                        +"</td><td>"+data[i].Nhiet_do
                        +"</td><td>"+data[i].Do_am
                        +"</td><td>"+data[i].Read_on_off_2
                        +"</td><td>"+data[i].Read_tem_set_2
                        +"</td><td>"+data[i].Read_tem_refer_2
                        +"</td><td>"+data[i].Read_on_off_3
                        +"</td><td>"+data[i].Read_tem_set_3
                        +"</td><td>"+data[i].Read_tem_refer_3
                        +"</td><td>"+data[i].Read_on_off_4
                        +"</td><td>"+data[i].Read_tem_set_4
                        +"</td><td>"+data[i].Read_tem_refer_4
                        +"</td><td>"+data[i].Time_delay_set_tem_auto
                        +"</td><td>"+data[i].Cai_nhiet_do_thap
                        +"</td><td>"+data[i].Cai_nhiet_do_cao
                        +"</td><td>"+data[i].Canh_bao_nhiet
                        +"</td></tr>";

                       
            }
            if (txt != "") {
                txt += "</tbody>";
                $("#table_01").append(txt);
            }
            // Cập nhật giá trị của thẻ input btt_SearchS4 để hiển thị tổng số trang
            updateTotalValue();
            // Gọi hàm cập nhật dữ liệu biểu đồ

        }
    }
}

// Tìm kiếm SQL theo khoảng thời gian
function fn_SQL_By_Time() {
        // Ẩn nút tìm kiếm và hiển thị hình ảnh loading
        document.getElementById('btt_SearchS1').disabled = true;
        document.getElementById('btt_SearchS3').disabled = true;
        document.getElementById('loadingImage').style.display = 'block';

    var start = new Date(document.getElementById('dtpk_Search_Start').value);
    var end = new Date(document.getElementById('dtpk_Search_End').value);

    var val = [start.toISOString(), end.toISOString()];
    socket.emit('msg_SQL_ByTime', val);
    socket.removeAllListeners("SQL_ByTime");
    socket.on('SQL_ByTime', function (data) {
        fn_table_01(data); // Hiển thị dữ liệu
        // Kích hoạt lại nút tìm kiếm và ẩn hình ảnh loading
        document.getElementById('btt_SearchS1').disabled = false;
        document.getElementById('btt_SearchS3').disabled = false;
        document.getElementById('loadingImage').style.display = 'none';
    });
}

function fn_s() {
    if (currentSegment < totalSegments - 1) {
        currentSegment++; // Tăng biến currentSegment để chuyển sang trang tiếp theo
        fn_table_01([]); // Xóa dữ liệu cũ
        fn_SQL_By_Time(); // Lấy dữ liệu mới cho trang tiếp theo
        updateInputValue();
    }
}

function fn_t() {
    if (currentSegment > 0) {
        currentSegment--; // Giảm biến currentSegment để chuyển sang trang trước
        fn_table_01([]); // Xóa dữ liệu cũ
        fn_SQL_By_Time(); // Lấy dữ liệu mới cho trang trước
        updateInputValue();
        
    }
}

// Gọi hàm này để cập nhật giá trị của thẻ input
function updateInputValue() {
    var inputElement = document.getElementById('btt_SearchS2');
    inputElement.value = currentSegment + 1; // Cộng 1 để hiển thị giá trị bắt đầu từ 1 thay vì 0

}

// Hàm để cập nhật giá trị của thẻ input btt_SearchS4
function updateTotalValue() {
    var inputElement = document.getElementById('btt_SearchS4');
    inputElement.value = totalSegments; // Cập nhật tổng số trang
}

// Khởi tạo ban đầu
fn_SQL_By_Time();

