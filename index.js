var express = require('express');
var app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set("views","./views")
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(8080)




app.get('/', function(req,res)
{
    res.render('home');
})

app.get('/export', function(req,res)
{
    res.render('export');
})
app.get('/auto', function(req,res)
{
    res.render('auto');
})

app.get('/energy', function(req,res)
{
    res.render('energy');
})

app.get('/manual', function(req,res)
{
    res.render('manual');
})

app.get('/login', function(req,res)
{
    res.render('login');
})

app.get('/huongdan', function(req,res)
{
    res.render('huongdan');
})

app.get('/loadding', function(req,res)
{
    res.render('loadding');
})

if(server){
    console.log('ket noi thanh cong port: 8080')
}
else{
    console.log('loi')
}



var dataArrip = [];
var dataArrip2 = [];
var data_total_4byte;

// create an empty modbus client
const Modbus2 = require('modbus-serial');

// Tạo một đối tượng Modbus
const client2 = new Modbus2();

// Thiết lập kết nối TCP/IP đến thiết bị Modbus
client2.connectTCP("10.14.84.3", { port:502 })
    .then(setClient)
    .then(function() {
        console.log("Connected"); })
    .catch(function(e) {
        console.log(e.message); });

function setClient() {
    // set the client's unit id
    // set a timout for requests default is null (no timeout)
    client2.setID(1);
    client2.setTimeout(1000);

    // run program
    run();
    
}

setInterval(() => {
    setClient();
}, 1000);


function run() {
    // read the 4 registers starting at address 5
    client2.readHoldingRegisters(4020,27)
        .then(function(d) {
            console.log("Receive:", d.data);
           var datad =d.data;

           for(var i=0;i<datad.length;i++)
           {

            if (i%2==1) {
                dataArrip[i]=datad[i]+datad[i-1]*65535; 
            }
            else
            {
                dataArrip[i]=datad[i];
            }

           }


        })
        .catch(function(e) {
            console.log(e.message);
        })
        // .then(close);

        client2.readHoldingRegisters(4000,4)
        .then(function(d) {
            console.log("Receive:", d.data);
           var datad =d.data;
       

           for(var i=0;i<datad.length;i++)
           {
                dataArrip2[i]=datad[i];
           }

           data_total_4byte=dataArrip2[3]+dataArrip2[2]*(65535);//(2^16-1)//+dataArrip2[1]*(65536^2-1)+dataArrip2[0]*(65536^2-1);

           console.log(data_total_4byte);


        })
        .catch(function(e) {
            console.log(e.message);
        })
}

io.on("connection", function(socket){
    socket.on("Client-send-data", function(data){
    socket.emit("L1_line",dataArrip[9]*0.1);
    socket.emit("L2_line",dataArrip[11]*0.1);
    socket.emit("L3_line",dataArrip[13]*0.1);
    socket.emit("L1_phase",dataArrip[15]*0.1);
    socket.emit("L2_phase",dataArrip[17]*0.1);
    socket.emit("L3_phase",dataArrip[19]*0.1);
    socket.emit("L1_phase_cr",dataArrip[1]*0.001);
    socket.emit("L2_phase_cr",dataArrip[3]*0.001);
    socket.emit("L3_phase_cr",dataArrip[5]*0.001);
    socket.emit("L1_power",dataArrip[21]);
    socket.emit("L2_power",dataArrip[23]);
    socket.emit("L3_power",dataArrip[25]);
    socket.emit("Total_Energy",data_total_4byte*0.001);
    var a =dataArrip[21]+dataArrip[23]+dataArrip[25];
    socket.emit("Total_power",a);
    console.log("giá trị la:" +data);      
});});

var mysql = require("mysql");
var sqlcon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "sql_dpm680",
});

var L1_line = 0;
var L2_line = 0;
var L3_line = 0;
var L1_phase = 0;
var L2_phase = 0;
var L3_phase = 0;
var L1_phase_cr = 0;
var L2_phase_cr = 0;
var L3_phase_cr = 0;
var L1_power = 0;
var L2_power = 0;
var L3_power = 0;
var Total_power = 0;
var Total_Energy = 0;

function fn_sql_insert() {
  // console.log("data la:"+dataArr[3]);

  var sqltable_Name = "dpm680_data";
  L1_line = dataArrip[9] * 0.1;
  L2_line = dataArrip[11] * 0.1;
  L3_line = dataArrip[13] * 0.1;
  L1_phase = dataArrip[15] * 0.1;
  L2_phase = dataArrip[17] * 0.1;
  L3_phase = dataArrip[19] * 0.1;
  L1_phase_cr = dataArrip[1] * 0.001;
  L2_phase_cr = dataArrip[3] * 0.001;
  L3_phase_cr = dataArrip[5] * 0.001;
  L1_power = dataArrip[21];
  L2_power = dataArrip[23];
  L3_power = dataArrip[25];
  Total_Energy = data_total_4byte * 0.001;
  Total_power = L1_power + L2_power + L3_power;

  // Lấy thời gian hiện tại
  var tzoffset = new Date().getTimezoneOffset() * 60000; //Vùng Việt Nam (GMT7+)
  var temp_datenow = new Date();
  var timeNow = new Date(temp_datenow - tzoffset)
    .toISOString()
    .slice(0, -1)
    .replace("T", " ");
  var timeNow_toSQL = "'" + timeNow + "',";

  // Dữ liệu đọc lên từ các tag
  var L1_line_sql = "'" + L1_line + "',";
  var L2_line_sql = "'" + L2_line + "',";
  var L3_line_sql = "'" + L3_line + "',";
  var L1_phase_sql = "'" + L1_phase + "',";
  var L2_phase_sql = "'" + L2_phase + "',";
  var L3_phase_sql = "'" + L3_phase + "',";
  var L1_phase_cr_sql = "'" + L1_phase_cr + "',";
  var L2_phase_cr_sql = "'" + L2_phase_cr + "',";
  var L3_phase_cr_sql = "'" + L3_phase_cr + "',";
  var L1_power_sql = "'" + L1_power + "',";
  var L2_power_sql = "'" + L2_power + "',";
  var L3_power_sql = "'" + L3_power + "',";
  var Total_power_sql = "'" + Total_power + "',";
  var Total_Energy_sql = "'" + Total_Energy + "'";
  // Ghi dữ liệu vào SQL

  var sql_write_str11 =
    "INSERT INTO " +
    sqltable_Name +
    " (date_time, L1_line, L2_line, L3_line, L1_phase,L2_phase, L3_phase, L1_phase_cr,L2_phase_cr, L3_phase_cr,L1_power,L2_power,L3_power,Total_power,Total_Energy) VALUES (";
  var sql_write_str12 =
    timeNow_toSQL +
    L1_line_sql +
    L2_line_sql +
    L3_line_sql +
    L1_phase_sql +
    L2_phase_sql +
    L3_phase_sql +
    L1_phase_cr_sql +
    L2_phase_cr_sql +
    L3_phase_cr_sql +
    L1_power_sql +
    L2_power_sql +
    L3_power_sql +
    Total_power_sql +
    Total_Energy_sql;
  var sql_write_str1 = sql_write_str11 + sql_write_str12 + ");";
  // Thực hiện ghi dữ liệu vào SQL
  sqlcon.query(sql_write_str1, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      // console.log("SQL - Ghi dữ liệu thành công"+sql_write_str1);
    }
  });
  //  dataArrip=[0,0,0,0,0,0,0,0,0];
}

setInterval(() => {
  fn_sql_insert();
}, 1000);






// triger ghi dữ liệu vào SQL
var insert_trigger = false;			// Trigger
var old_insert_trigger = false;		// Trigger old
////////////////////////////////////GIAM SAT LANH VAM///////////////////////////////////////
// KHỞI TẠO KẾT NỐI PLC
var nodes7 = require('nodes7');  
var conn_plc = new nodes7; //PLC1
// Tạo địa chỉ kết nối (slot = 2 nếu là 300/400, slot = 1 nếu là 1200/1500)
conn_plc.initiateConnection({port: 102, host: '10.14.84.64', rack: 0, slot: 1}, PLC_connected);

//Bảng tag trong Visual studio code
const tag = require('./public/js/tag.js');
const tags_list = tag.tags_list();

// GỬI DỮ LIỆu TAG CHO PLC
// Tag Name load
var taglodash = require('lodash'); // Chuyển variable sang array
var tag_Listarr = taglodash.keys(tags_list);
// GỬI DỮ LIỆu TAG CHO PLC
function PLC_connected(err) {
    if (typeof(err) !== "undefined") {
        console.log(err); // Hiển thị lỗi nếu không kết nối đƯỢc với PLC
    }
    conn_plc.setTranslationCB(function(tag) {return tags_list[tag];});  // Đưa giá trị đọc lên từ PLC và mảng
    conn_plc.addItems(tag_Listarr);
}

// Đọc dữ liệu từ PLC và đưa vào array tags
var arr_tag_value = []; // Tạo một mảng lưu giá trị tag đọc về
//var obj_tag_value = []; // Tạo một mảng lưu giá trị tag đọc về
function valuesReady(anythingBad, values) {
    if (anythingBad) { console.log("Lỗi khi đọc dữ liệu tag"); } // Cảnh báo lỗi
    var lodash = require('lodash'); // Chuyển variable sang array
    arr_tag_value = lodash.map(values, (item) => item);
    console.log("Data S1", arr_tag_value); // Hiển thị giá trị để kiểm tra
   // obj_tag_value = values;
}
// Hàm chức năng scan giá trị
function fn_read_data_scan(){
    conn_plc.readAllItems(valuesReady);
    fn_tag();
    fn_sql_insert();
}
// Time cập nhật mỗi 1s
setInterval(
    () => fn_read_data_scan(),
    1000 // 1s = 1000ms
);

// ///////////LẬP BẢNG TAG ĐỂ GỬI QUA CLIENT (TRÌNH DUYỆT)///////////
function fn_tag(){
    io.sockets.emit("Start_auto", arr_tag_value[0]);  //
    io.sockets.emit("Start_manual", arr_tag_value[1]);//
    io.sockets.emit("Den_auto", arr_tag_value[2]);  ////
    io.sockets.emit("Den_manual", arr_tag_value[3]);  ////
    io.sockets.emit("On_off_manu_2", arr_tag_value[4]);  
    io.sockets.emit("Mode_manu_2", arr_tag_value[5]);//
    io.sockets.emit("Fan_speed_manu_2", arr_tag_value[6]);//
    io.sockets.emit("Van_position_manu_2", arr_tag_value[7]);  //
    io.sockets.emit("Nhap_temp_manu_2", arr_tag_value[8]); //
    io.sockets.emit("On_off_manu_3", arr_tag_value[9]);  
    io.sockets.emit("Mode_manu_3", arr_tag_value[10]);  //
    io.sockets.emit("Fan_speed_manu_3", arr_tag_value[11]);  //
    io.sockets.emit("Van_position_manu_3", arr_tag_value[12]);  //
    io.sockets.emit("Nhap_temp_manu_3", arr_tag_value[13]);//
    io.sockets.emit("On_off_manu_4", arr_tag_value[14]);  
    io.sockets.emit("Mode_manu_4", arr_tag_value[15]);  //
    io.sockets.emit("Fan_speed_manu_4", arr_tag_value[16]);  //
    io.sockets.emit("Van_position_manu_4", arr_tag_value[17]);  //
    io.sockets.emit("Nhap_temp_manu_4", arr_tag_value[18]);//
    io.sockets.emit("On_off_auto_2", arr_tag_value[19]);//
    io.sockets.emit("Mode_auto_2", arr_tag_value[20]);//
    io.sockets.emit("Fan_speed_auto_2", arr_tag_value[21]);//
    io.sockets.emit("Van_position_auto_2", arr_tag_value[22]);//
    io.sockets.emit("Tem_set_auto_2", arr_tag_value[23]);
    io.sockets.emit("Nhap_temp_auto_2", arr_tag_value[24]);//
    io.sockets.emit("On_off_auto_3", arr_tag_value[25]);//
    io.sockets.emit("Mode_auto_3", arr_tag_value[26]);//
    io.sockets.emit("Fan_speed_auto_3", arr_tag_value[27]);//
    io.sockets.emit("Van_position_auto_3", arr_tag_value[28]);//
    io.sockets.emit("Tem_set_auto_3", arr_tag_value[29]);
    io.sockets.emit("Nhap_temp_auto_3", arr_tag_value[30]);//
    io.sockets.emit("On_off_auto_4", arr_tag_value[31]);//
    io.sockets.emit("Mode_auto_4", arr_tag_value[32]);//
    io.sockets.emit("Fan_speed_auto_4", arr_tag_value[33]);//
    io.sockets.emit("Van_position_auto_4", arr_tag_value[34]);//
    io.sockets.emit("Tem_set_auto_4", arr_tag_value[35]);
    io.sockets.emit("Nhap_temp_auto_4", arr_tag_value[36]);//
    io.sockets.emit("On_off_data_2", arr_tag_value[37]);
    io.sockets.emit("Mode_data_2", arr_tag_value[38]);
    io.sockets.emit("Fan_speed_data_2", arr_tag_value[39]);
    io.sockets.emit("Van_position_data_2", arr_tag_value[40]);
    io.sockets.emit("Nhap_temp_data_2", arr_tag_value[41]);
    io.sockets.emit("On_off_data_3", arr_tag_value[42]);
    io.sockets.emit("Mode_data_3", arr_tag_value[43]);
    io.sockets.emit("Fan_speed_data_3", arr_tag_value[44]);
    io.sockets.emit("Van_position_data_3", arr_tag_value[45]);
    io.sockets.emit("Nhap_temp_data_3", arr_tag_value[46]);
    io.sockets.emit("On_off_data_4", arr_tag_value[47]);
    io.sockets.emit("Mode_data_4", arr_tag_value[48]);
    io.sockets.emit("Fan_speed_data_4", arr_tag_value[49]);
    io.sockets.emit("Van_position_data_4", arr_tag_value[50]);
    io.sockets.emit("Nhap_temp_data_4", arr_tag_value[51]);
    io.sockets.emit("Nhiet_do", arr_tag_value[52]);////
    io.sockets.emit("Do_am", arr_tag_value[53]);////
    io.sockets.emit("Read_on_off_2", arr_tag_value[54]);////
    io.sockets.emit("Read_mode_2", arr_tag_value[55]);//
    io.sockets.emit("Read_speed_2", arr_tag_value[56]);//
    io.sockets.emit("Read_position_2", arr_tag_value[57]);//
    io.sockets.emit("Read_tem_set_2", arr_tag_value[58]);////
    io.sockets.emit("Read_tem_refer_2", arr_tag_value[59]);////
    io.sockets.emit("Read_on_off_3", arr_tag_value[60]);////
    io.sockets.emit("Read_mode_3", arr_tag_value[61]);//
    io.sockets.emit("Read_speed_3", arr_tag_value[62]);//
    io.sockets.emit("Read_position_3", arr_tag_value[63]);//
    io.sockets.emit("Read_tem_set_3", arr_tag_value[64]);////
    io.sockets.emit("Read_tem_refer_3", arr_tag_value[65]);////
    io.sockets.emit("Read_on_off_4", arr_tag_value[66]);////
    io.sockets.emit("Read_mode_4", arr_tag_value[67]);//
    io.sockets.emit("Read_speed_4", arr_tag_value[68]);//
    io.sockets.emit("Read_position_4", arr_tag_value[69]);//
    io.sockets.emit("Read_tem_set_4", arr_tag_value[70]);////
    io.sockets.emit("Read_tem_refer_4", arr_tag_value[71]);////
    io.sockets.emit("Time_delay_set_tem_auto", arr_tag_value[72]);////
    io.sockets.emit("On_manu_2", arr_tag_value[73]);//
    io.sockets.emit("Off_manu_2", arr_tag_value[74]);//
    io.sockets.emit("On_manu_3", arr_tag_value[75]);//
    io.sockets.emit("Off_manu_3", arr_tag_value[76]);//
    io.sockets.emit("On_manu_4", arr_tag_value[77]);//
    io.sockets.emit("Off_manu_4", arr_tag_value[78]);//
    io.sockets.emit("Cai_nhiet_do_thap", arr_tag_value[79]);////
    io.sockets.emit("Cai_nhiet_do_cao", arr_tag_value[80]);////
    io.sockets.emit("Canh_bao_nhiet", arr_tag_value[81]);////
    io.sockets.emit("Trigger", arr_tag_value[82]);//
}

// /////////// GỬI DỮ LIỆU BẢNG TAG ĐẾN CLIENT (TRÌNH DUYỆT) ///////////////
io.on("connection", function(socket){
    socket.on("Client-send-data", function(data){
        fn_tag();
    });
    fn_SQLSearch(); // Hàm tìm kiếm SQL
});

// HÀM GHI DỮ LIỆU XUỐNG PLC
function valuesWritten(anythingBad) {
    if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
    console.log("Done writing.");
}

// Nhận các bức điện được gửi từ trình duyệt
io.on("connection", function(socket){
    // Start che do manual
        socket.on("cmd_start_manual", function(data){conn_plc.writeItems('Start_manual', data, valuesWritten);});
    // Start che do auto
        socket.on("cmd_start_auto", function(data){conn_plc.writeItems('Start_auto', data, valuesWritten);});
    // on_off may lanh 1 che do manual
        socket.on("cmd_start_ml2", function(data){conn_plc.writeItems('On_manu_2', data, valuesWritten);});
        socket.on("cmd_stop_ml2", function(data){conn_plc.writeItems('Off_manu_2', data, valuesWritten);});
    // on_off may lanh 1 che do manual
        socket.on("cmd_start_ml3", function(data){conn_plc.writeItems('On_manu_3', data, valuesWritten);});
        socket.on("cmd_stop_ml3", function(data){conn_plc.writeItems('Off_manu_3', data, valuesWritten);});
    // on_off may lanh 1 che do manual
        socket.on("cmd_start_ml4", function(data){conn_plc.writeItems('On_manu_4', data, valuesWritten);});
        socket.on("cmd_stop_ml4", function(data){conn_plc.writeItems('Off_manu_4', data, valuesWritten);});

});

// Ghi dữ liệu từ IO field che do thu cong
io.on("connection", function(socket){       
    socket.on("cmd_Main_Edit_Data", function(data){conn_plc.writeItems(['Mode_manu_2','Nhap_temp_manu_2','Van_position_manu_2','Fan_speed_manu_2',
                                                                        'Mode_manu_3','Nhap_temp_manu_3','Van_position_manu_3','Fan_speed_manu_3',
                                                                        'Mode_manu_4','Nhap_temp_manu_4','Van_position_manu_4','Fan_speed_manu_4',
                                                                        'Cai_nhiet_do_thap','Cai_nhiet_do_cao'],
                                                                         [data[0],data[1],data[2],data[3],
                                                                         data[4],data[5],data[6],data[7],
                                                                         data[8],data[9],data[10],data[11],
                                                                         data[12],data[13]], valuesWritten);});
});

// Ghi dữ liệu từ IO field che do tu dong
io.on("connection", function(socket){
socket.on("cmd_Auto_Edit_Data", function(data){conn_plc.writeItems(['On_off_auto_2','Mode_auto_2','Nhap_temp_auto_2','Van_position_auto_2','Fan_speed_auto_2',
                                                                    'On_off_auto_3','Mode_auto_3','Nhap_temp_auto_3','Van_position_auto_3','Fan_speed_auto_3',
                                                                    'On_off_auto_4','Mode_auto_4','Nhap_temp_auto_4','Van_position_auto_4','Fan_speed_auto_4',
                                                                    'Cai_nhiet_do_thap','Cai_nhiet_do_cao','Time_delay_set_tem_auto'],
                                                                        [data[0],data[1],data[2],data[3],data[4],
                                                                         data[5],data[6],data[7],data[8],data[9],
                                                                         data[10],data[11],data[12],data[13],data[14],
                                                                         data[15],data[16],data[17]], valuesWritten);});
});



// Khởi tạo SQL
var mysql = require('mysql');

var sqlcon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "SQL_VAM",
  dateStrings:true // Hiển thị không có T và Z
});

function fn_sql_insert(){
    insert_trigger = arr_tag_value[82];		// Read trigger from PLC
    var sqltable_Name = "plc_data";
    // Lấy thời gian hiện tại
	var tzoffset = (new Date()).getTimezoneOffset() * 60000; //Vùng Việt Nam (GMT7+)
	var temp_datenow = new Date();
	var timeNow = (new Date(temp_datenow - tzoffset)).toISOString().slice(0, -1).replace("T"," ");
	var timeNow_toSQL = "'" + timeNow + "',";


// Dữ liệu đọc lên từ các tag
var Den_auto = "'" + arr_tag_value[2] + "',";
var Den_manual = "'" + arr_tag_value[3] + "',";
var Nhiet_do = "'" + arr_tag_value[52] + "',";
var Do_am = "'" + arr_tag_value[53] + "',";
var Read_on_off_2 = "'" + arr_tag_value[54] + "',";
var Read_tem_set_2 = "'" + arr_tag_value[58] + "',";
var Read_tem_refer_2 = "'" + arr_tag_value[59] + "',";
var Read_on_off_3 = "'" + arr_tag_value[60] + "',";
var Read_tem_set_3 = "'" + arr_tag_value[64] + "',";
var Read_tem_refer_3 = "'" + arr_tag_value[65] + "',";
var Read_on_off_4 = "'" + arr_tag_value[66] + "',";
var Read_tem_set_4 = "'" + arr_tag_value[70] + "',";
var Read_tem_refer_4 = "'" + arr_tag_value[71] + "',";
var Time_delay_set_tem_auto = "'" + arr_tag_value[72] + "',";
var Cai_nhiet_do_thap = "'" + arr_tag_value[79] + "',";
var Cai_nhiet_do_cao = "'" + arr_tag_value[80] + "',";
var Canh_bao_nhiet = "'" + arr_tag_value[81] + "'";
// Ghi dữ liệu vào SQL
if (insert_trigger && !old_insert_trigger && !isNaN(insert_trigger))
{
    var sql_write_str11 = "INSERT INTO " + sqltable_Name + " (date_time, Den_auto, Den_manual, Nhiet_do, Do_am, Read_on_off_2,Read_tem_set_2,Read_tem_refer_2,Read_on_off_3,Read_tem_set_3,Read_tem_refer_3,Read_on_off_4,Read_tem_set_4,Read_tem_refer_4,Time_delay_set_tem_auto,Cai_nhiet_do_thap,Cai_nhiet_do_cao,Canh_bao_nhiet) VALUES (";
    var sql_write_str12 = timeNow_toSQL 
                        + Den_auto 
                        + Den_manual
                        + Nhiet_do
                        + Do_am
                        + Read_on_off_2
                        + Read_tem_set_2
                        + Read_tem_refer_2
                        + Read_on_off_3
                        + Read_tem_set_3
                        + Read_tem_refer_3
                        + Read_on_off_4
                        + Read_tem_set_4
                        + Read_tem_refer_4
                        + Time_delay_set_tem_auto
                        + Cai_nhiet_do_thap
                        + Cai_nhiet_do_cao
                        + Canh_bao_nhiet
                        ;
    var sql_write_str1 = sql_write_str11 + sql_write_str12 + ");";
    // Thực hiện ghi dữ liệu vào SQL
    sqlcon.query(sql_write_str1, function (err, result) {
        if (err) {
            console.log(err);
         } else {
            console.log("SQL - Ghi dữ liệu thành công");
          } 
        });
}
old_insert_trigger = insert_trigger;
}

// Đọc dữ liệu từ SQL
function fn_SQLSearch(){
    io.on("connection", function(socket){
        socket.on("msg_SQL_Show", function(data){
            var sqltable_Name = "plc_data";
            var queryy1 = "SELECT * FROM " + sqltable_Name + ";"
            sqlcon.query(queryy1, function(err, results, fields) {
                if (err) {
                    console.log(err);
                } else {
                    const objectifyRawPacket = row => ({...row});
                    const convertedResponse = results.map(objectifyRawPacket);
                    socket.emit('SQL_Show', convertedResponse);
                    console.log(convertedResponse);
                }
            });
        });
    });
    }
