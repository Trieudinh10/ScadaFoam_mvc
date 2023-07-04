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