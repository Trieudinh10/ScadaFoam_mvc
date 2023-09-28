// Chương trình con đọc dữ liệu SQL
function fn_Table02_SQL_Show() {
    socket.emit("msg_SQL_Show", "true");
    socket.on('SQL_Show', function (data) {
        fn_table_02(data);
    });
}

// Chương trình con hiển thị SQL ra bảng
function fn_table_02(data) {
    const arraysToClear = [nhiet_do_ml1, nhiet_do_ml2, nhiet_do_ml3, nhiet_do_cb, date_time];
    arraysToClear.forEach(arr => arr.length = 0);

    if (data) {
        const tableBody = $("#table_02 tbody");
        tableBody.empty();
        const len = data.length;
        if (len > 0) {
            let txt = "<tbody>";
            for (let i = 0; i < len; i++) {
                const item = data[i];
                nhiet_do_ml1.push(item.Read_tem_refer_2);
                nhiet_do_ml2.push(item.Read_tem_refer_3);
                nhiet_do_ml3.push(item.Read_tem_refer_4);
                nhiet_do_cb.push(item.Nhiet_do);
                date_time.push(item.date_time);
            }
            if (txt !== "") {
                txt += "</tbody>";
                tableBody.append(txt);
            }
        }
    }

    Draw_Chart();
}

// Tìm kiếm SQL theo khoảng thời gian
function fn_SQL_1_By_Time() {
    const startValue = document.getElementById('dtpk_Search_Start').value;
    const endValue = document.getElementById('dtpk_Search_End').value;
    const val = [startValue, endValue];
    socket.emit('msg_SQL_ByTime', val);
    socket.on('SQL_ByTime', function (data) {
        fn_table_02(data); // Show data
    });
}
