   // Chuẩn bị dữ liệu
   const dataRoom = {
    labels: ['1h', '2h', '3h', '4h', '5h'],
    datasets: [
      {
        label: 'Nhiệt Độ',
        data: [23, 28, 20, 19, 30],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Độ Ẩm',
        data: [14, 28, 16, 30, 17],
        fill: false,
        borderColor: 'rgb(75, 192, 00)',
        tension: 0.1
      },
    ]
  };
  // Tạo biểu đồ
  const Room = document.getElementById('chartRoom').getContext('2d');
  const chartRoom = new Chart(Room, {
    type: 'line',
    data: dataRoom,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });