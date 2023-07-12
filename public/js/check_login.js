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

  fetch("https://636b1016c07d8f936dacfcc2.mockapi.io/user")
    .then((response) => response.json())
    .then((data) => {
      var found = false;
      data.forEach((i) => {
        if (username === i.user && password === i.pass) {
          found = true;
          setCookie("loggedIn", "true", 15);
          window.location.href = "http://localhost:8080/auto";
        }
      });

      if (!found) {
        alert("Sai tên đăng nhập hoặc mật khẩu.");
      }
    })
    .catch((error) => {
      console.error("Lỗi:", error);
    });
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
