const chart_line = (id, data1, data2, data3, Label_1, Label_2, Label_3) => {
  const dataTime = [];
  const fn_time = () => {
    const time = new Date();
    dataTime.push(`${time.getHours()}/${time.getMinutes()}/${time.getSeconds()}`);
    console.log(dataTime);
  };
  fn_time()
  const data = {
    labels: ["1h", "2h", "3h", "4h", "5h", "1h", "2h", "3h", "4h", "5h"],
    datasets: [
      {
        label: Label_1,
        data: [0, 30, 20, 19, 30, 23, 28, 20, 19, 30],
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