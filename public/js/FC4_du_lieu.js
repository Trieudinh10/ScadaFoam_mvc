fn_Table01_SQL_Show();
// Chương trình con đọc dữ liệu SQL
function fn_Table01_SQL_Show(){
    socket.emit("msg_SQL_Show", "true");
    socket.on('SQL_Show',function(data){
        fn_table_01(data);
    });
}


// Chương trình con hiển thị SQL ra bảng
function fn_table_01(data){
    nhiet_do_ml1.length=0;
    nhiet_do_ml2.length=0;
    nhiet_do_ml3.length=0;
    nhiet_do_cb.length=0;
    date_time.length=0;

    if(data){
        $("#table_01 tbody").empty();
        var len = data.length;
        var txt = "<tbody>";
        if(len > 0){
            for(var i=0;i<len;i++){
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

                        nhiet_do_ml1.push(data[i].Read_tem_refer_2)
                        nhiet_do_ml2.push(data[i].Read_tem_refer_3)
                        nhiet_do_ml3.push(data[i].Read_tem_refer_4)
                        nhiet_do_cb.push(data[i].Nhiet_do)
                        date_time.push(data[i].date_time)

                    }
            if(txt != ""){
            txt +="</tbody>";
            $("#table_01").append(txt);
            }
        }
    }

    Draw_Chart();
}

// Tìm kiếm SQL theo khoảng thời gian
function fn_SQL_By_Time()
{
    var val = [document.getElementById('dtpk_Search_Start').value,
               document.getElementById('dtpk_Search_End').value];
    socket.emit('msg_SQL_ByTime', val);
    socket.on('SQL_ByTime', function(data){
        fn_table_01(data); // Show sdata
    });
}

