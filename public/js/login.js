// Kiểm tra cookie đã đăng nhập tài khoản hay chưa
function checkLoggedIn() {
    var cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('loggedIn='));
  

    if (cookieValue) {

      var loggedIn = cookieValue.split('=')[1];

      if (loggedIn === 'true') {
        
      } else {
        window.location.href = '/login';
      }
    } else {
        window.location.href = '/login';
    }
  }
  
  checkLoggedIn();
  