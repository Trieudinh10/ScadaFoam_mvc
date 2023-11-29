//BIEU DO HOME
function chart() {
  var data_trend_dh1 = 0;
  var data_trend_dh2 = 0;
  var data_trend_dh3 = 0;
  var data_trend_nd = 0;
  var xData = [];
  var yData_dh1 = [];
  var yData_dh2 = [];
  var yData_dh3 = [];
  var yData_nd = [];
  var cnt = 0;
  var layout = {
    title: {
      text: "<%= __('Chart Temperature') %>",
      x: 0.5, // Đặt vị trí title ngang giữa biểu đồ
      y: -0.1, // Thiết lập giá trị âm để làm tiêu đề gần hơn biểu đồ
      xanchor: "center", // Giữ title ở giữa theo chiều ngang
      yanchor: "top", // Đặt yanchor là 'top' để title gần biểu đồ
    },
    xaxis: {
      range: [0, 10],
      showticklabels: true,
      tickformat: "%H:%M:%S/%d-%m-%y",
    },
    yaxis: {
      showline: true,
      range: [0, 40],
    },
    margin: {
      t: 20,
    },
  };

  socket.on("Read_tem_refer_2", function (data) {
    data_trend_dh1 = data;
  });
  socket.on("Read_tem_refer_3", function (data) {
    data_trend_dh2 = data;
  });
  socket.on("Read_tem_refer_4", function (data) {
    data_trend_dh3 = data;
  });
  socket.on("Nhiet_do", function (data) {
    data_trend_nd = data;
  });

  var config = { responsive: true };
  Plotly.newPlot(
    "tem",
    [
      {
        y: [data_trend_dh1],
        type: "line",
        mode: "lines",
        line: {
          color: "blue",
          width: 2,
        },
        name: "<%= __('Air-conditioner') %> 1", // Đặt tên cho dữ liệu <%= __('Temperature') %>
      },
      {
        y: [data_trend_dh2],
        type: "line",
        mode: "lines",
        line: {
          color: "green",
          width: 2,
        },
        name: "<%= __('Air-conditioner') %> 2", // Đặt tên cho dữ liệu <%= __('Temperature') %>
      },
      {
        y: [data_trend_dh3],
        type: "line",
        mode: "lines",
        line: {
          color: "orange",
          width: 2,
        },
        name: "<%= __('Air-conditioner') %> 3", // Đặt tên cho dữ liệu <%= __('Temperature') %>
      },
      {
        y: [data_trend_nd],
        type: "line",
        mode: "lines",
        line: {
          color: "red",
          width: 2,
        },
        name: "<%= __('Temperature') %>", // Đặt tên cho dữ liệu <%= __('Temperature') %>
      },
    ],
    layout,
    config
  );

  setInterval(function () {
    var currentDate = new Date();
    var hours = currentDate.getUTCHours() + 7;
    var minutes = currentDate.getUTCMinutes();
    var seconds = currentDate.getUTCSeconds();
    var date = currentDate.getUTCDate();
    var month = currentDate.getUTCMonth() + 1;
    var year = currentDate.getUTCFullYear();
    var timeString = hours + ":" + minutes + ":" + seconds;
    var dateString = date + "/" + month + "/" + year;
    var formattedDateString = timeString + "<br>" + dateString;
    xData.push(formattedDateString);
    yData_dh1.push(data_trend_dh1);
    yData_dh2.push(data_trend_dh2);
    yData_dh3.push(data_trend_dh3);
    yData_nd.push(data_trend_nd);
    cnt++;
    if (cnt > 15) {
      xData.shift();
      yData_dh1.shift();
      yData_dh2.shift();
      yData_dh3.shift();
      yData_nd.shift();
    }
    Plotly.update("tem", {
      x: [xData],
      y: [yData_dh1, yData_dh2, yData_dh3, yData_nd],
    });
  }, 30000);
}

chart(); // tạo biểu đồ

// khi kích thước trình duyệt thay đổi thì sẽ load lại biểu đồ
window.addEventListener("resize", chart);
