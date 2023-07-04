// Kiểm tra cookie đã đăng nhập tài khoản hay chưa
function checkLoggedIn() {
    // Lấy giá trị cookie
    var cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('loggedIn='));
  
    // Nếu cookie tồn tại
    if (cookieValue) {
      // Lấy giá trị của cookie
      var loggedIn = cookieValue.split('=')[1];
  
      // Kiểm tra giá trị của cookie
      if (loggedIn === 'true') {
        console.log('Người dùng đã đăng nhập.');
      } else {
        window.location.href = 'http://localhost:8080/login';
      }
    } else {
        window.location.href = 'http://localhost:8080/login';
    }
  }
  
  // Gọi hàm kiểm tra cookie
  checkLoggedIn();
  