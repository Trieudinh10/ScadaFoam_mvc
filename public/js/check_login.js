function setCookie(name, value, minutes) {
  var d = new Date();
  d.setTime(d.getTime() + (minutes * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
      var found = false;
        if (username === 'admin' && password === 'admin' || username === 'user' && password === 'user' ) {
          found = true;
          setCookie("loggedIn", "true", 15);
          window.location.href = "http://10.14.84.193:8080/auto";
          if(username === 'admin'){
            document.cookie = 'role' + '=' + 'admin';
          }else{
            document.cookie = 'role' + '=' + 'user';
          }
        }
      if (!found) {
        alert("Sai tên đăng nhập hoặc mật khẩu.");
      }
}

function getCookie(name) {
  var cookieArr = document.cookie.split(";");
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}
var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", login);

// Xóa cookie sau 15 phút
setTimeout(function() {
  deleteCookie("loggedIn");
}, 15 * 60 * 1000);
