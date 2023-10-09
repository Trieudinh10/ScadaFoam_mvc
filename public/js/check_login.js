function setCookie(name, value) {
  var expires = "expires=";
  document.cookie = name + "=" + value + ";" + expires;
}

function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
      var found = false;
        if (username === 'admin' && password === 'admin' || username === 'user' && password === 'user' ) {
          found = true;
          setCookie("loggedIn", "true");
          window.location.href = "/auto";
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
