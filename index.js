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




////////////////////////////////////GIAM SAT LANH VAM///////////////////////////////////////
// KHỞI TẠO KẾT NỐI PLC
var nodes7 = require('nodes7');  
var conn_plc = new nodes7; //PLC1
// Tạo địa chỉ kết nối (slot = 2 nếu là 300/400, slot = 1 nếu là 1200/1500)
conn_plc.initiateConnection({port: 102, host: '10.14.84.102', rack: 0, slot: 1}, PLC_connected);

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
var obj_tag_value = []; // Tạo một mảng lưu giá trị tag đọc về
function valuesReady(anythingBad, values) {
    if (anythingBad) { console.log("Lỗi khi đọc dữ liệu tag"); } // Cảnh báo lỗi
    var lodash = require('lodash'); // Chuyển variable sang array
    arr_tag_value = lodash.map(values, (item) => item);
    console.log("Data S1", arr_tag_value); // Hiển thị giá trị để kiểm tra
    obj_tag_value = values;
}
// Hàm chức năng scan giá trị
function fn_read_data_scan(){
    conn_plc.readAllItems(valuesReady);
    fn_tag();
}
// Time cập nhật mỗi 1s
setInterval(
    () => fn_read_data_scan(),
    1000 // 1s = 1000ms
);

// ///////////LẬP BẢNG TAG ĐỂ GỬI QUA CLIENT (TRÌNH DUYỆT)///////////
function fn_tag(){
    io.sockets.emit("Start_auto", obj_tag_value["Start_auto"]);  
    io.sockets.emit("Start_manual", obj_tag_value["Start_manual"]);  
    io.sockets.emit("Den_auto", obj_tag_value["Den_auto"]);  
    io.sockets.emit("Den_manual", obj_tag_value["Den_manual"]);  
    io.sockets.emit("On_off_manu_2", obj_tag_value["On_off_manu_2"]);  
    io.sockets.emit("Mode_manu_2", obj_tag_value["Mode_manu_2"]);  
    io.sockets.emit("Fan_speed_manu_2", obj_tag_value["Fan_speed_manu_2"]);  
    io.sockets.emit("Van_position_manu_2", obj_tag_value["Van_position_manu_2"]);  
    io.sockets.emit("Nhap_temp_manu_2", obj_tag_value["Nhap_temp_manu_2"]); 
    io.sockets.emit("On_off_manu_3", obj_tag_value["On_off_manu_3"]);  
    io.sockets.emit("Mode_manu_3", obj_tag_value["Mode_manu_3"]);  
    io.sockets.emit("Fan_speed_manu_3", obj_tag_value["Fan_speed_manu_3"]);  
    io.sockets.emit("Van_position_manu_3", obj_tag_value["Van_position_manu_3"]);  
    io.sockets.emit("Nhap_temp_manu_3", obj_tag_value["Nhap_temp_manu_3"]);
    io.sockets.emit("On_off_manu_4", obj_tag_value["On_off_manu_4"]);  
    io.sockets.emit("Mode_manu_4", obj_tag_value["Mode_manu_4"]);  
    io.sockets.emit("Fan_speed_manu_4", obj_tag_value["Fan_speed_manu_4"]);  
    io.sockets.emit("Van_position_manu_4", obj_tag_value["Van_position_manu_4"]);  
    io.sockets.emit("Nhap_temp_manu_4", obj_tag_value["Nhap_temp_manu_4"]);
    io.sockets.emit("On_off_auto_2", obj_tag_value["On_off_auto_2"]);
    io.sockets.emit("Mode_auto_2", obj_tag_value["Mode_auto_2"]);
    io.sockets.emit("Fan_speed_auto_2", obj_tag_value["Fan_speed_auto_2"]);
    io.sockets.emit("Van_position_auto_2", obj_tag_value["Van_position_auto_2"]);
    io.sockets.emit("Tem_set_auto_2", obj_tag_value["Tem_set_auto_2"]);
    io.sockets.emit("Nhap_temp_auto_2", obj_tag_value["Nhap_temp_auto_2"]);
    io.sockets.emit("On_off_auto_3", obj_tag_value["On_off_auto_3"]);
    io.sockets.emit("Mode_auto_3", obj_tag_value["Mode_auto_3"]);
    io.sockets.emit("Fan_speed_auto_3", obj_tag_value["Fan_speed_auto_3"]);
    io.sockets.emit("Van_position_auto_3", obj_tag_value["Van_position_auto_3"]);
    io.sockets.emit("Tem_set_auto_3", obj_tag_value["Tem_set_auto_3"]);
    io.sockets.emit("Nhap_temp_auto_3", obj_tag_value["Nhap_temp_auto_3"]);
    io.sockets.emit("On_off_auto_4", obj_tag_value["On_off_auto_4"]);
    io.sockets.emit("Mode_auto_4", obj_tag_value["Mode_auto_4"]);
    io.sockets.emit("Fan_speed_auto_4", obj_tag_value["Fan_speed_auto_4"]);
    io.sockets.emit("Van_position_auto_4", obj_tag_value["Van_position_auto_4"]);
    io.sockets.emit("Tem_set_auto_4", obj_tag_value["Tem_set_auto_4"]);
    io.sockets.emit("Nhap_temp_auto_4", obj_tag_value["Nhap_temp_auto_4"]);
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
    io.sockets.emit("Nhiet_do", obj_tag_value["Nhiet_do"]);
    io.sockets.emit("Do_am", obj_tag_value["Do_am"]);
    io.sockets.emit("Read_on_off_2", obj_tag_value["Read_on_off_2"]);
    io.sockets.emit("Read_mode_2", obj_tag_value["Read_mode_2"]);
    io.sockets.emit("Read_speed_2", obj_tag_value["Read_speed_2"]);
    io.sockets.emit("Read_position_2", obj_tag_value["Read_position_2"]);
    io.sockets.emit("Read_tem_set_2", obj_tag_value["Read_tem_set_2"]);
    io.sockets.emit("Read_tem_refer_2", obj_tag_value["Read_tem_refer_2"]);
    io.sockets.emit("Read_on_off_3", obj_tag_value["Read_on_off_3"]);
    io.sockets.emit("Read_mode_3", obj_tag_value["Read_mode_3"]);
    io.sockets.emit("Read_speed_3", obj_tag_value["Read_speed_3"]);
    io.sockets.emit("Read_position_3", obj_tag_value["Read_position_3"]);
    io.sockets.emit("Read_tem_set_3", obj_tag_value["Read_tem_set_3"]);
    io.sockets.emit("Read_tem_refer_3", obj_tag_value["Read_tem_refer_3"]);
    io.sockets.emit("Read_on_off_4", obj_tag_value["Read_on_off_4"]);
    io.sockets.emit("Read_mode_4", obj_tag_value["Read_mode_4"]);
    io.sockets.emit("Read_speed_4", obj_tag_value["Read_speed_4"]);
    io.sockets.emit("Read_position_4", obj_tag_value["Read_position_4"]);
    io.sockets.emit("Read_tem_set_4", obj_tag_value["Read_tem_set_4"]);
    io.sockets.emit("Read_tem_refer_4", obj_tag_value["Read_tem_refer_4"]);
    io.sockets.emit("Time_delay_set_tem_auto", obj_tag_value["Time_delay_set_tem_auto"]);
    io.sockets.emit("Trigger", obj_tag_value["Trigger"]);
}

// HÀM GHI DỮ LIỆU XUỐNG PLC
function valuesWritten(anythingBad) {
    if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
    console.log("Done writing.");
}


// ++++++++++++++++++++++++++GHI DỮ LIỆU XUỐNG PLC+++++++++++++++++++++++++++
// MÀN HÌNH CHÍNH
io.on("connection", function(socket)
{
    // Ghi dữ liệu từ IO field
    socket.on("cmd_Main_Edit_Data", function(data){
        conn_plc.writeItems([
                            'tag_Bool'],
                            [data[0]
                        ], valuesWritten);
        });
});
