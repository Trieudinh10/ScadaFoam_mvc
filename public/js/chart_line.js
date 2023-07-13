const chart_line = (id, data1, data2, data3, Label_1, Label_2, Label_3) => {

  var labelTime = new Date()
  var dataLabel = []
  var a = [] 
    setInterval(() => {
      
      socket.on(data3, function (data)
      { 
        a.push(data)     
        chartLine.update()
      });
    },1000)
  const data = {
    labels: ["1h", "2h", "3h", "4h", "5h", "1h", "2h", "3h", "4h", "5h"],
    datasets: [
      {
        label: Label_1,
        data: [111, 12, 99, 33, 77, 44, 88, 66, 0, 77],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: Label_2,
        data: [14, 28, 16, 30, 17, 14, 28, 16, 30, 17],
        fill: false,
        borderColor: "rgb(75, 192, 00)",
        tension: 0.1,
      },
      {
        label: Label_3,
        data: [31, 10, 20, 19, 18, 31, 10, 20, 19, 18],
        fill: false,
        borderColor: "rgb(75, 100, 192)",
        tension: 0.1,
      },
    ],
  };

  const Line = document.getElementById(id).getContext("2d");
  const chartLine = new Chart(Line, {
    type: "line",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
