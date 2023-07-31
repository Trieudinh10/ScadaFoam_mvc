fn_Alarm_Show();
// Chương trình con đọc dữ liệu SQL
function fn_Alarm_Show(){
    socket.emit("msg_Alarm_Show", "true");
    socket.on('Alarm_Show',function(data){
        fn_table_Alarm(data);
    });
}

// Chương trình con hiển thị SQL ra bảng
function fn_table_Alarm(data){
    if(data){
        $("#table_Alarm tbody").empty();
        var len = data.length;
        var txt = "<tbody>";
        if(len > 0){
            for(var i=0;i<len;i++){
                    txt += "<tr><td>"+data[i].date_time
                        +"</td><td>"+data[i].ID
                        +"</td><td>"+data[i].Status
                        +"</td><td>"+data[i].AlarmName
                        +"</td></tr>";
                    }
            if(txt != ""){
            txt +="</tbody>";
            $("#table_Alarm").append(txt);
            }
        }
    }
}