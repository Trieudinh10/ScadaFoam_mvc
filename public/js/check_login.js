// Hàm đăng nhập và lưu thông tin vào cookie
function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Kiểm tra tài khoản và mật khẩu
    if (username === 'admin' && password === 'admin') {
      // Lưu thông tin đăng nhập vào cookie
      document.cookie = 'loggedIn=true; path=/';
  
      window.location.href = 'http://localhost:8080/';
      // Thực hiện chuyển hướng hoặc các thao tác khác sau khi đăng nhập thành công
    } else {
        alert('Sai tên đăng nhập hoặc mật khẩu.');
      // Hiển thị thông báo lỗi hoặc thực hiện các thao tác khác khi đăng nhập không thành công
    }
  }
  
  // Đăng ký sự kiện "click" cho nút Submit
  var submitBtn = document.getElementById('submitBtn');
  submitBtn.addEventListener('click', login);
  