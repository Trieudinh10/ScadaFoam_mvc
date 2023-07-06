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
          document.cookie = "loggedIn=true; path=/";
          window.location.href = "http://localhost:8080/setting";
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
var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", login);
