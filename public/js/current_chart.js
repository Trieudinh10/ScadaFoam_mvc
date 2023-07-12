   // Chuẩn bị dữ liệu
   const dataCurrent = {
    labels: ['1h', '2h', '3h', '4h', '5h','1h', '2h', '3h', '4h', '5h'],
    datasets: [
      {
        label: 'Current 1',
        data: [23, 28, 20, 19, 30,23, 28, 20, 19, 30],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Current 2',
        data: [14, 28, 16, 30, 17,14, 28, 16, 30, 17],
        fill: false,
        borderColor: 'rgb(75, 192, 00)',
        tension: 0.1
      },
      {
        label: 'Current 3',
        data: [31, 10, 20, 19, 18,31, 10, 20, 19, 18],
        fill: false,
        borderColor: 'rgb(75, 100, 192)',
        tension: 0.1
      }
    ]
  };
  // Tạo biểu đồ
  const Current = document.getElementById('chartCurrent').getContext('2d');
  const chartCurrent = new Chart(Current, {
    type: 'line',
    data: dataCurrent,
    options: {
      responsive: true,
    maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });