fn_Table02_SQL_Show();
// Chương trình con đọc dữ liệu SQL
function fn_Table02_SQL_Show(){
    socket.emit("msg_SQL_Show", "true");
    socket.on('SQL_Show',function(data){
        fn_table_02(data);
    });
}


// Chương trình con hiển thị SQL ra bảng
function fn_table_02(data){
    nhiet_do_ml1.length=0;
    nhiet_do_ml2.length=0;
    nhiet_do_ml3.length=0;
    nhiet_do_cb.length=0;
    date_time.length=0;

    if(data){
        $("#table_02 tbody").empty();
        var len = data.length;
        var txt = "<tbody>";
        if(len > 0){
            for(var i=0;i<len;i++){

                        nhiet_do_ml1.push(data[i].Read_tem_refer_2)
                        nhiet_do_ml2.push(data[i].Read_tem_refer_3)
                        nhiet_do_ml3.push(data[i].Read_tem_refer_4)
                        nhiet_do_cb.push(data[i].Nhiet_do)
                        date_time.push(data[i].date_time)

                    }
            if(txt != ""){
            txt +="</tbody>";
            $("#table_02").append(txt);
            }
        }
    }

    Draw_Chart();
}

// Tìm kiếm SQL theo khoảng thời gian
function fn_SQL_1_By_Time()
{
    var val = [document.getElementById('dtpk_Search_Start').value,
               document.getElementById('dtpk_Search_End').value];
    socket.emit('msg_SQL_ByTime', val);
    socket.on('SQL_ByTime', function(data){
        fn_table_02(data); // Show sdata
    });
}