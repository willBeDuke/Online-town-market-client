import URL_VARIABLE from './export.js';

$(document).ready(function () {

  'use strict';

  var accesst = null,
      refresht = null;

});



function login(){
    var settings = {
        "url": URL_VARIABLE + "users/login",
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
        localStorage.setItem('accessToken',xhr.getResponseHeader('Authorization'));
        localStorage.setItem('refreshToken',xhr.getResponseHeader('Refresh'))
        location.href = "index.html";
      }).fail(function(response){
        console.log(response.responseJSON)
        if(response.responseJSON.statusCode === 400|| response.responseJSON.statusCode === 401)
        alert("아이디나 비밀번호를 다시 확인해주세요")
      }); 
}
$("#login").click(login);

