///// CHƯƠNG TRÌNH CON NÚT NHẤN SỬA //////
// Tạo 1 tag tạm báo đang sửa dữ liệu
var Auto_data_edditting = false;
function fn_Auto_EditBtt(){
    // Cho hiển thị nút nhấn lưu
    fn_DataEdit('btt_Auto_Save','btt_Auto_Edit');
    // Cho tag báo đang sửa dữ liệu lên giá trị true
    Auto_data_edditting = true;
    // Kích hoạt chức năng sửa của các IO Field
    document.getElementById("on_off_aut_2").disabled = false; 
    document.getElementById("mode_aut_2").disabled = false; 
    document.getElementById("temp_auto_2").disabled = false;
    document.getElementById("position_auto_2").disabled = false;
    document.getElementById("speed_auto_2").disabled = false;
    document.getElementById("on_off_aut_3").disabled = false;  
    document.getElementById("mode_aut_3").disabled = false;
    document.getElementById("temp_auto_3").disabled = false;
    document.getElementById("position_auto_3").disabled = false;
    document.getElementById("speed_auto_3").disabled = false;
    document.getElementById("on_off_aut_4").disabled = false; 
    document.getElementById("mode_aut_4").disabled = false;
    document.getElementById("temp_auto_4").disabled = false;
    document.getElementById("position_auto_4").disabled = false;
    document.getElementById("speed_auto_4").disabled = false;
    document.getElementById("nhiet_do_thap").disabled = false;
    document.getElementById("nhiet_do_cao").disabled = false;
}
///// CHƯƠNG TRÌNH CON NÚT NHẤN LƯU //////
function fn_Auto_SaveBtt(){
// Cho hiển thị nút nhấn sửa
fn_DataEdit('btt_Auto_Edit','btt_Auto_Save');
    // Cho tag đang sửa dữ liệu về 0
    Auto_data_edditting = false;
                        // Gửi dữ liệu cần sửa xuống PLC
    var data_edit_array = [document.getElementById('on_off_aut_2').value,
                            document.getElementById('mode_aut_2').value,
                            document.getElementById('temp_auto_2').value,
                            document.getElementById('position_auto_2').value,
                            document.getElementById('speed_auto_2').value,
                            document.getElementById('on_off_aut_3').value,
                            document.getElementById('mode_aut_3').value,
                            document.getElementById('temp_auto_3').value,
                            document.getElementById('position_auto_3').value,
                            document.getElementById('speed_auto_3').value,
                            document.getElementById('on_off_aut_4').value,
                            document.getElementById('mode_aut_4').value,
                            document.getElementById('temp_auto_4').value,
                            document.getElementById('position_auto_4').value,
                            document.getElementById('speed_auto_4').value,
                            document.getElementById('nhiet_do_thap').value,
                            document.getElementById('nhiet_do_cao').value];
    socket.emit('cmd_Auto_Edit_Data', data_edit_array);
    alert('Dữ liệu đã được lưu!');
    // Vô hiệu hoá chức năng sửa của các IO Field
    document.getElementById("on_off_aut_2").disabled = true;
    document.getElementById("mode_aut_2").disabled = true;
    document.getElementById("temp_auto_2").disabled = true;  
    document.getElementById("position_auto_2").disabled = true;
    document.getElementById("speed_auto_2").disabled = true;
    document.getElementById("on_off_aut_3").disabled = true;    
    document.getElementById("mode_aut_3").disabled = true; 
    document.getElementById("temp_auto_3").disabled = true;
    document.getElementById("position_auto_3").disabled = true;
    document.getElementById("speed_auto_3").disabled = true;
    document.getElementById("on_off_aut_4").disabled = true;
    document.getElementById("mode_aut_4").disabled = true;
    document.getElementById("temp_auto_4").disabled = true;
    document.getElementById("position_auto_4").disabled = true;
    document.getElementById("speed_auto_4").disabled = true;
    document.getElementById("nhiet_do_thap").disabled = true;
    document.getElementById("nhiet_do_cao").disabled = true;
}

// Chương trình con đọc dữ liệu lên IO Field
function fn_Auto_IOField_IO(tag, IOField, tofix)
{
    socket.on(tag, function(data){
        if (tofix == 0 & Auto_data_edditting != true)
        {
            document.getElementById(IOField).value = data;
        }
        else if(Auto_data_edditting != true)
        {
            document.getElementById(IOField).value = data.toFixed(tofix);
        }
    });
}