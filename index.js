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
app.get('/setting', function(req,res)
{
    res.render('setting');
})

app.get('/energy', function(req,res)
{
    res.render('energy');
})

app.get('/operate', function(req,res)
{
    res.render('operate');
})

app.get('/login', function(req,res)
{
    res.render('login');
})

if(server){
    console.log('ket noi thanh cong')
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
client2.connectTCP("10.14.12.240", { port:502 })
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
}, 500);


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
