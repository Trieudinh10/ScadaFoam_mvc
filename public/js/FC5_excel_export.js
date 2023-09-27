// Gửi yêu cầu xuất Excel qua index.js
function fn_excel(){
    document.getElementById('loadingImage').style.display = 'block';
    var linktext = "";
    var bookname = "";
    socket.emit("msg_Excel_Report", true);
    socket.on('send_Excel_Report',function(data){
        linktext = data[0];
        bookname = data[1];
        // Delay save as
        var delayInMilliseconds = 1000; //Delay 1 second
        setTimeout(function() {
            saveAs(linktext, bookname);
        }, delayInMilliseconds);   
        document.getElementById('loadingImage').style.display = 'none';
    }); 
}