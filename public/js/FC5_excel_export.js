// // Gửi yêu cầu xuất Excel qua index.js
// function fn_excel() {
//     document.getElementById('loadingImage').style.display = 'block';
//     var linktext = "";
//     var bookname = "";
//     socket.emit("msg_Excel_Report", true);
//     socket.on('send_Excel_Report', function (data) {
//         linktext = data[0];
//         bookname = data[1];
//         // Delay save as
//         var delayInMilliseconds = 5000; //Delay 1 second
//         setTimeout(function () {
//             saveAs(linktext, bookname);
//         }, delayInMilliseconds);
//         document.getElementById('loadingImage').style.display = 'none';
//     });
// }


// Gửi yêu cầu xuất Excel qua index.js
function fn_excel() {
    document.getElementById('loadingImage').style.display = 'block';
    var linktext = "";
    var bookname = "";
    socket.emit("msg_Excel_Report", true);
    socket.on('send_Excel_Report', function (data) {
        linktext = data[0];
        bookname = data[1];

        // Tính thời gian chờ dựa trên độ dài của dữ liệu (1MB tương đương với khoảng 1024 * 1024 bytes)
        var dataSizeInBytes = linktext.length + bookname.length;
        var delayInMilliseconds = 2000 + dataSizeInBytes; // Delay tăng lên theo độ dài của dữ liệu

        setTimeout(function () {
            saveAs(linktext, bookname);
            document.getElementById('loadingImage').style.display = 'none';
        }, delayInMilliseconds);
    });
}
