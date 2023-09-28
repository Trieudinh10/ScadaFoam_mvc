function fn_tag(io, obj_tag_value) {
        io.sockets.emit("Start_auto", obj_tag_value["Start_auto"]);  //
    io.sockets.emit("Start_manual", obj_tag_value["Start_manual"]);//
    io.sockets.emit("Den_auto", obj_tag_value["Den_auto"]);  ////
    io.sockets.emit("Den_manual", obj_tag_value["Den_manual"]);  ////
    io.sockets.emit("On_off_manu_2", obj_tag_value["On_off_manu_2"]);  
    io.sockets.emit("Mode_manu_2", obj_tag_value["Mode_manu_2"]);//
    io.sockets.emit("Fan_speed_manu_2", obj_tag_value["Fan_speed_manu_2"]);//
    io.sockets.emit("Van_position_manu_2", obj_tag_value["Van_position_manu_2"]);  //
    io.sockets.emit("Nhap_temp_manu_2", obj_tag_value["Nhap_temp_manu_2"]); //
    io.sockets.emit("On_off_manu_3", obj_tag_value["On_off_manu_3"]);  
    io.sockets.emit("Mode_manu_3", obj_tag_value["Mode_manu_3"]);  //
    io.sockets.emit("Fan_speed_manu_3", obj_tag_value["Fan_speed_manu_3"]);  //
    io.sockets.emit("Van_position_manu_3", obj_tag_value["Van_position_manu_3"]);  //
    io.sockets.emit("Nhap_temp_manu_3", obj_tag_value["Nhap_temp_manu_3"]);//
    io.sockets.emit("On_off_manu_4", obj_tag_value["On_off_manu_4"]);  
    io.sockets.emit("Mode_manu_4", obj_tag_value["Mode_manu_4"]);  //
    io.sockets.emit("Fan_speed_manu_4", obj_tag_value["Fan_speed_manu_4"]);  //
    io.sockets.emit("Van_position_manu_4", obj_tag_value["Van_position_manu_4"]);  //
    io.sockets.emit("Nhap_temp_manu_4", obj_tag_value["Nhap_temp_manu_4"]);//
    io.sockets.emit("On_off_auto_2", obj_tag_value["On_off_auto_2"]);//
    io.sockets.emit("Mode_auto_2", obj_tag_value["Mode_auto_2"]);//
    io.sockets.emit("Fan_speed_auto_2", obj_tag_value["Fan_speed_auto_2"]);//
    io.sockets.emit("Van_position_auto_2", obj_tag_value["Van_position_auto_2"]);//
    io.sockets.emit("Tem_set_auto_2", obj_tag_value["Tem_set_auto_2"]);
    io.sockets.emit("Nhap_temp_auto_2", obj_tag_value["Nhap_temp_auto_2"]);//
    io.sockets.emit("On_off_auto_3", obj_tag_value["On_off_auto_3"]);//
    io.sockets.emit("Mode_auto_3", obj_tag_value["Mode_auto_3"]);//
    io.sockets.emit("Fan_speed_auto_3", obj_tag_value["Fan_speed_auto_3"]);//
    io.sockets.emit("Van_position_auto_3", obj_tag_value["Van_position_auto_3"]);//
    io.sockets.emit("Tem_set_auto_3", obj_tag_value["Tem_set_auto_3"]);
    io.sockets.emit("Nhap_temp_auto_3", obj_tag_value["Nhap_temp_auto_3"]);//
    io.sockets.emit("On_off_auto_4", obj_tag_value["On_off_auto_4"]);//
    io.sockets.emit("Mode_auto_4", obj_tag_value["Mode_auto_4"]);//
    io.sockets.emit("Fan_speed_auto_4", obj_tag_value["Fan_speed_auto_4"]);//
    io.sockets.emit("Van_position_auto_4", obj_tag_value["Van_position_auto_4"]);//
    io.sockets.emit("Tem_set_auto_4", obj_tag_value["Tem_set_auto_4"]);
    io.sockets.emit("Nhap_temp_auto_4", obj_tag_value["Nhap_temp_auto_4"]);//
    io.sockets.emit("On_off_data_2", obj_tag_value["On_off_data_2"]);
    io.sockets.emit("Mode_data_2", obj_tag_value["Mode_data_2"]);
    io.sockets.emit("Fan_speed_data_2", obj_tag_value["Fan_speed_data_2"]);
    io.sockets.emit("Van_position_data_2", obj_tag_value["Van_position_data_2"]);
    io.sockets.emit("Nhap_temp_data_2", obj_tag_value["Nhap_temp_data_2"]);
    io.sockets.emit("On_off_data_3", obj_tag_value["On_off_data_3"]);
    io.sockets.emit("Mode_data_3", obj_tag_value["Mode_data_3"]);
    io.sockets.emit("Fan_speed_data_3", obj_tag_value["Fan_speed_data_3"]);
    io.sockets.emit("Van_position_data_3", obj_tag_value["Van_position_data_3"]);
    io.sockets.emit("Nhap_temp_data_3", obj_tag_value["Nhap_temp_data_3"]);
    io.sockets.emit("On_off_data_4", obj_tag_value["On_off_data_4"]);
    io.sockets.emit("Mode_data_4", obj_tag_value["Mode_data_4"]);
    io.sockets.emit("Fan_speed_data_4", obj_tag_value["Fan_speed_data_4"]);
    io.sockets.emit("Van_position_data_4", obj_tag_value["Van_position_data_4"]);
    io.sockets.emit("Nhap_temp_data_4", obj_tag_value["Nhap_temp_data_4"]);
    io.sockets.emit("Nhiet_do", obj_tag_value["Nhiet_do"]);////
    io.sockets.emit("Do_am", obj_tag_value["Do_am"]);////
    io.sockets.emit("Read_on_off_2", obj_tag_value["Read_on_off_2"]);////
    io.sockets.emit("Read_mode_2", obj_tag_value["Read_mode_2"]);//
    io.sockets.emit("Read_speed_2", obj_tag_value["Read_speed_2"]);//
    io.sockets.emit("Read_position_2", obj_tag_value["Read_position_2"]);//
    io.sockets.emit("Read_tem_set_2", obj_tag_value["Read_tem_set_2"]);////
    io.sockets.emit("Read_tem_refer_2", obj_tag_value["Read_tem_refer_2"]);////
    io.sockets.emit("Read_on_off_3", obj_tag_value["Read_on_off_3"]);////
    io.sockets.emit("Read_mode_3", obj_tag_value["Read_mode_3"]);//
    io.sockets.emit("Read_speed_3", obj_tag_value["Read_speed_3"]);//
    io.sockets.emit("Read_position_3", obj_tag_value["Read_position_3"]);//
    io.sockets.emit("Read_tem_set_3", obj_tag_value["Read_tem_set_3"]);////
    io.sockets.emit("Read_tem_refer_3", obj_tag_value["Read_tem_refer_3"]);////
    io.sockets.emit("Read_on_off_4", obj_tag_value["Read_on_off_4"]);////
    io.sockets.emit("Read_mode_4", obj_tag_value["Read_mode_4"]);//
    io.sockets.emit("Read_speed_4", obj_tag_value["Read_speed_4"]);//
    io.sockets.emit("Read_position_4", obj_tag_value["Read_position_4"]);//
    io.sockets.emit("Read_tem_set_4", obj_tag_value["Read_tem_set_4"]);////
    io.sockets.emit("Read_tem_refer_4", obj_tag_value["Read_tem_refer_4"]);////
    io.sockets.emit("Time_delay_set_tem_auto", obj_tag_value["Time_delay_set_tem_auto"]);////
    io.sockets.emit("On_manu_2", obj_tag_value["On_manu_2"]);//
    io.sockets.emit("Off_manu_2", obj_tag_value["Off_manu_2"]);//
    io.sockets.emit("On_manu_3", obj_tag_value["On_manu_3"]);//
    io.sockets.emit("Off_manu_3", obj_tag_value["Off_manu_3"]);//
    io.sockets.emit("On_manu_4", obj_tag_value["On_manu_4"]);//
    io.sockets.emit("Off_manu_4", obj_tag_value["Off_manu_4"]);//
    io.sockets.emit("Cai_nhiet_do_thap", obj_tag_value["Cai_nhiet_do_thap"]);////
    io.sockets.emit("Cai_nhiet_do_cao", obj_tag_value["Cai_nhiet_do_cao"]);////
    io.sockets.emit("Canh_bao_nhiet", obj_tag_value["Canh_bao_nhiet"]);////
    io.sockets.emit("Trigger", obj_tag_value["Trigger"]);//
}
    module.exports = fn_tag;