// Gửi yêu cầu xuất Excel qua index.js
function fn_excel(){
    
    socket.emit("msg_Excel_Report", true);
   
}
function fn_excel_Display()
{
    var linktext = "";
    var bookname = "";
    socket.on('send_Excel_Report',function(data){
        linktext = data[0];
        bookname = data[1];
        // Delay save as
        var delayInMilliseconds = 1000; //Delay 1 second
        setTimeout(function() {
            saveAs(linktext, bookname);
        }, delayInMilliseconds);          
    }); 
}