///// CHƯƠNG TRÌNH CON NÚT NHẤN SỬA //////
// Tạo 1 tag tạm báo đang sửa dữ liệu
var Main_data_edditting = false;
function fn_Main_EditBtt(){
    // Cho hiển thị nút nhấn lưu
    fn_DataEdit('btt_Main_Save','btt_Main_Edit');
    // Cho tag báo đang sửa dữ liệu lên giá trị true
    Main_data_edditting = true;
    // Kích hoạt chức năng sửa của các IO Field
    document.getElementById("mode_man_2").disabled = false; 
    document.getElementById("temp_manu_2").disabled = false; 
    document.getElementById("position_manu_2").disabled = false;
    document.getElementById("speed_manu_2").disabled = false;
    document.getElementById("mode_man_3").disabled = false;
    document.getElementById("temp_manu_3").disabled = false;
    document.getElementById("position_manu_3").disabled = false;
    document.getElementById("speed_manu_3").disabled = false;
    document.getElementById("mode_man_4").disabled = false;
    document.getElementById("temp_manu_4").disabled = false;
    document.getElementById("position_manu_4").disabled = false;
    document.getElementById("speed_manu_4").disabled = false;
}
///// CHƯƠNG TRÌNH CON NÚT NHẤN LƯU //////
function fn_Main_SaveBtt(){
// Cho hiển thị nút nhấn sửa
fn_DataEdit('btt_Main_Edit','btt_Main_Save');
    // Cho tag đang sửa dữ liệu về 0
    Main_data_edditting = false;
                        // Gửi dữ liệu cần sửa xuống PLC
    var data_edit_array = [document.getElementById('mode_man_2').value,
                            document.getElementById('temp_manu_2').value,
                            document.getElementById('position_manu_2').value,
                            document.getElementById('speed_manu_2').value,
                            document.getElementById('mode_man_3').value,
                            document.getElementById('temp_manu_3').value,
                            document.getElementById('position_manu_3').value,
                            document.getElementById('speed_manu_3').value,
                            document.getElementById('mode_man_4').value,
                            document.getElementById('temp_manu_4').value,
                            document.getElementById('position_manu_4').value,
                            document.getElementById('speed_manu_4').value];
    socket.emit('cmd_Main_Edit_Data', data_edit_array);
    alert('Dữ liệu đã được lưu!');
    // Vô hiệu hoá chức năng sửa của các IO Field
    document.getElementById("mode_man_2").disabled = true;
    document.getElementById("temp_manu_2").disabled = true;    
    document.getElementById("position_manu_2").disabled = true;    
    document.getElementById("speed_manu_2").disabled = true;  
    document.getElementById("mode_man_3").disabled = true; 
    document.getElementById("temp_manu_3").disabled = true;
    document.getElementById("position_manu_3").disabled = true;
    document.getElementById("speed_manu_3").disabled = true;
    document.getElementById("mode_man_4").disabled = true;
    document.getElementById("temp_manu_4").disabled = true;
    document.getElementById("position_manu_4").disabled = true;
    document.getElementById("speed_manu_4").disabled = true;
}

// Chương trình con đọc dữ liệu lên IO Field
function fn_Main_IOField_IO(tag, IOField, tofix)
{
    socket.on(tag, function(data){
        if (tofix == 0 & Main_data_edditting != true)
        {
            document.getElementById(IOField).value = data;
        }
        else if(Main_data_edditting != true)
        {
            document.getElementById(IOField).value = data.toFixed(tofix);
        }
    });
}