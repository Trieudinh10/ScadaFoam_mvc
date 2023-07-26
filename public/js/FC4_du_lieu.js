// Chương trình con đọc dữ liệu SQL
function fn_Table01_SQL_Show(){
    socket.emit("msg_SQL_Show", "true");
    socket.on('SQL_Show',function(data){
        fn_table_01(data);
    });
}

// Chương trình con hiển thị SQL ra bảng
function fn_table_01(data){
    if(data){
        $("#table_01 tbody").data();
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
                    }
            if(txt != ""){
            txt +="</tbody>";
            $("#table_01").append(txt);
            }
        }
    }
}