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