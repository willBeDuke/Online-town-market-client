function login(){
    var settings = {
        "url": "http://localhost:8080/users/login",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "username": $('#username').val(),
            "password": $('#password').val()
        }),
      };
      
      $.ajax(settings).done(function (response,status,xhr) {
        localStorage.setItem('accessToken',xhr.getResponseHeader('Authorization'))
        location.href = "index.html";
      }).fail(function(response){
        console.log(response.responseJSON)
        if(response.responseJSON.statusCode === 400|| response.responseJSON.statusCode === 401)
        alert("아이디나 비밀번호를 다시 확인해주세요")
      }); 
}