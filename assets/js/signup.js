
$(document).ready(function () {

  'use strict';

  var usernameHasError = false,
      emailHasError = false,
      passwordHasError = false,
      passConfirmHasError = false,
      nicknameHasError = false,
      regionHasError = false,

      usernameError = true,
      emailError    = true,
      passwordError = true,
      passConfirm   = true,
      nicknameError = true,
      regionError = true,

      usernameCkError = false,
      usernameck = false,
      emailck = false,
      nicknameck = false,
      
      emailVerify = false,

      checkcode = null;


  // Detect browser for css purpose
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      $('.form form label').addClass('fontSwitch');
  }

  // Label effect
  $('input').focus(function () {


    //username
    if ($(this).hasClass('form-control 1') & usernameHasError == false){
     $(this).siblings('span.message').text('아이디는 최소 4자, 최대 12자, 특수문자를 제외한 영어 대소문자와 숫자를 포함하여 만들 수 있습니다.').fadeIn().parent('.col-xs-8').addClass('hasMessage');
    }
     if ($(this).hasClass('form-control 2') & passwordHasError == false){
      $(this).siblings('span.message').text('비밀번호는 최소 8자 최대 15자, 영어 대소문자와 숫자, 특수문자를 포함해야 합니다.').fadeIn().parent('.col-xs-8').addClass('hasMessage');   
     }
     if ($(this).hasClass('form-control 5') & nicknameHasError == false){
      $(this).siblings('span.message').text('닉네임은 최소 4자, 최대 12자, 특수문자를 제외한 영어 대소문자와 숫자를 포함하여 만들 수 있습니다.').fadeIn().parent('.col-xs-8').addClass('hasMessage');   
     }

    //  if ($(this).hasClass('form-control 6') & phoneNumberHasError == false){
    //   $(this).siblings('span.message').text('- 를 넣어서 입력해 주세요  예) 010-1111-1111').fadeIn().parent('.col-xs-8').addClass('hasMessage');   
    //  }
     

      $(this).siblings('label').addClass('active');
  });

  // Form validation
  $('input').blur(function () {

    $(this).siblings('.message').text('').fadeOut().parent('.col-xs-8').removeClass('hasMessage');


      // User Name
      if ($(this).hasClass('form-control 1')) {
        var value = $(this).val();
        var evalid = (/^[a-zA-Z0-9_-]{4,12}$/).test(value);
          if ($(this).val().length === 0) {
              $(this).siblings('span.error').text('아이디는 최소 4자, 최대 12자, 특수문자를 제외한 영어 대소문자와 숫자를 포함하여 만들 수 있습니다.').fadeIn().parent('.col-xs-8').addClass('hasError');
              usernameHasError = true;
              usernameError = true;
              
          } else if (!evalid) {  
              $(this).siblings('span.error').text('아이디는 최소 4자, 최대 12자, 특수문자를 제외한 영어 대소문자와 숫자를 포함하여 만들 수 있습니다.').fadeIn().parent('.col-xs-8').addClass('hasError');
              usernameHasError = true;
              usernameError = true;
              
          } else {  
              $(this).siblings('.error').text('').fadeOut().parent('.col-xs-8').removeClass('hasError');
              usernameHasError = false;
              usernameError = false;
              
          }
      }
      // Email
      if ($(this).hasClass('form-control 4')) {
        var value = $(this).val();
        var evalid = (/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/).test(value);

        if ($(this).val().length === 0) {
          $(this).siblings('span.error').text('이메일을 입력해 주세요').fadeIn().parent('.col-xs-8').addClass('hasError');
          emailError = true;
          emailHasError = true;
      } 
          if (!evalid) {
              $(this).siblings('span.error').text('이메일 형식을 다시 확인해 주세요.').fadeIn().parent('.col-xs-8').addClass('hasError');
              emailError = true;
              emailHasError = true;
          } else {
              $(this).siblings('.error').text('').fadeOut().parent('.col-xs-8').removeClass('hasError');
              emailError = false;
              emailHasError = false;
          }
      }

      // PassWord
      if ($(this).hasClass('form-control 2')) {
        var value = $(this).val();
        var evalid = (/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/).test(value);
          if (!evalid) {
              $(this).siblings('span.error').text('비밀번호는 최소 8자 최대 15자, 영어 대소문자와 숫자, 특수문자를 포함해야 합니다.').fadeIn().parent('.col-xs-8').addClass('hasError');
              passwordError = true;
              passwordHasError = true;
          } else {
              $(this).siblings('.error').text('').fadeOut().parent('.col-xs-8').removeClass('hasError');
              passwordError = false;
              passwordError = false;
          }
      }

      // PassWord confirmation
      

      if ($(this).hasClass('form-control 5')) {
        var value = $(this).val();
        var evalid = (/^[a-zA-Z0-9_-]{4,12}$/).test(value);
        if ($(this).val().length === 0) {
          $(this).siblings('span.error').text('닉네임은 최소 4자, 최대 12자, 특수문자를 제외한 영어 대소문자와 숫자를 포함하여 만들 수 있습니다.').fadeIn().parent('.col-xs-8').addClass('hasError');
          nicknameError = true;
          nicknameHasError = true;
        }
          if (!evalid) {
              $(this).siblings('span.error').text('닉네임은 최소 4자, 최대 12자, 특수문자를 제외한 영어 대소문자와 숫자를 포함하여 만들 수 있습니다.').fadeIn().parent('.col-xs-8').addClass('hasError');
              nicknameError = true;
              nicknameHasError = true;
          } else {
              $(this).siblings('.error').text('').fadeOut().parent('.col-xs-8').removeClass('hasError');
              nicknameError = false;
              nicknameHasError = false;
          }
      }
    
      if ($(this).hasClass('form-control 6')) {
        var value = $(this).val();
        var evalid = (/^\d{3}-\d{3,4}-\d{4}$/).test(value);
        if ($(this).val().length === 0) {
          $(this).siblings('span.error').text('휴대폰 번호를 입력해 주세요').fadeIn().parent('.col-xs-8').addClass('hasError');
          phoneNumberError = true;
             phoneNumberHasError = true;
      } 
        
          if (!evalid) {
              $(this).siblings('span.error').text('휴대폰 번호 형식이 다릅니다. - 를 넣어서 입력해 주세요  예) 010-1111-1111 ').fadeIn().parent('.col-xs-8').addClass('hasError');
             phoneNumberError = true;
             phoneNumberHasError = true;
          } else {
              $(this).siblings('.error').text('').fadeOut().parent('.col-xs-8').removeClass('hasError');
              phoneNumberError = false;
              phoneNumberHasError = false;
          }
      }
      // if ($(this).hasClass('form-control 7')) {
      //   if ($(this).val().length === 0) {
      //     $(this).siblings('span.error').text('지역을 입력해 주세요').fadeIn().parent('.col-xs-8').addClass('hasError');
      //     regionError = true;
      //     regionHasError = true;
      //     }else {
      //         $(this).siblings('.error').text('').fadeOut().parent('.col-xs-8').removeClass('hasError');
      //         regionError = false;
      //         regionHasError = false;
      //     }
      // }

      // label effect
      if ($(this).val().length > 0) {
          $(this).siblings('label').addClass('active');
      } else {
          $(this).siblings('label').removeClass('active');
      }

      var password = document.getElementById("password");
      var confirm_password = document.getElementById("passwordConfirm");

      if (password.value !== confirm_password.value & confirm_password.value != '') {
        $(confirm_password).siblings('.error').text('패스워드가 일치하지 않습니다').fadeIn().parent('.col-xs-8').addClass('hasError');
        passConfirm = false;
    } else {
        $(confirm_password).siblings('.error').text('').fadeOut().parent('.col-xs-8').removeClass('hasError');
        passConfirm = false;
    }
      
  });

});
function signup() {

  var settings = {
      "url": "http://localhost:8080/users/signup",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({
        "username": $('#username').val(),
        "password": $('#password').val(),
        "email": $('#email').val(),
        "nickname": $('#nickname').val(),
        "region": $('#region').val()
      }),
    };
    
    $.ajax(settings).done(function (response) {
      console.log(response);
      alert("회원가입 완료");
      location.href = "login.html";
    }).fail(function(response){
      if(response.responseJSON.statusCode === 400|| response.responseJSON.statusCode === 401)
      alert("입력하신 정보를 다시 확인해 주세요")
    }); 
}

function GoogleSignup(){
  location.href ='http://localhost:8080/oauth2/authorization/google';

}

function usernamecheck(clicked_id){
  if($('#username').val() != null & (/^[a-zA-Z0-9_-]{4,12}$/).test($('#username').val())){
    var field = clicked_id.substr(2)
  var settings = {
    "url": "http://localhost:8080/users/duplicate",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify(
      {
      "duplicateField": field,
      "content": $('#username').val()
    }),
  };
  $.ajax(settings).done(function (response) {
    var isDup = response.duplicate;
        if(isDup == true){
          $('#username').siblings('span.Ck').text('').fadeOut().parent('.col-xs-8').removeClass('hasCk');
          $('#username').siblings('span.CkError').text('❌중복된 아이디입니다.').fadeIn().parent('.col-xs-8').addClass('hasCkError');
          usernameck = false;
        }else{
          $('#username').siblings('span.CkError').text('').fadeOut().parent('.col-xs-8').removeClass('hasCkError');
          $('#username').siblings('span.Ck').text('✔️사용가능한 아이디입니다.').fadeIn().parent('.col-xs-8').addClass('hasCk'); 
          usernameck = true;
        }
    
  }).fail(function(){
    console.log(response)
    alert("중복체크에 실패하였습니다.")
  })
  ;
}
else{
  alert("입력하신 정보를 다시 확인해 주세요")
}
}

function nicknamecheck(clicked_id){
  if($('#nickname').val() != null & (/^[a-zA-Z0-9_-]{4,12}$/).test($('#nickname').val())){
    var field = clicked_id.substr(2)
  var settings = {
    "url": "http://localhost:8080/users/duplicate",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify(
      {
      "duplicateField": field,
      "content": $('#nickname').val()
    }),
  };
  $.ajax(settings).done(function (response) {
    var isDup = response.duplicate;
        if(isDup == true){
          $('#nickname').siblings('span.Ck').text('').fadeOut().parent('.col-xs-8').removeClass('hasCk');
          $('#nickname').siblings('span.CkError').text('❌중복된 닉네임입니다.').fadeIn().parent('.col-xs-8').addClass('hasCkError');
          nicknameck = false;
        }else{
          $('#nickname').siblings('span.CkError').text('').fadeOut().parent('.col-xs-8').removeClass('hasCkError');
          $('#nickname').siblings('span.Ck').text('✔️사용가능한 닉네임입니다.').fadeIn().parent('.col-xs-8').addClass('hasCk');
          nicknameck = true;
      }
  }).fail(function(){
    console.log(response)
    alert("중복체크에 실패하였습니다.")
  })
  ;
}
else{
  alert("입력하신 정보를 다시 확인해 주세요")
}
}

function emailcheck(clicked_id){
  if($('#email').val() != null & (/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/).test($('#email').val())){
    var field = clicked_id.substr(2)
  var settings = {
    "url": "http://localhost:8080/users/duplicate",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify(
      {
      "duplicateField": field,
      "content": $('#emailname').val()
    }),
  };
  $.ajax(settings).done(function (response) {
    var isDup = response.duplicate;
        if(response.duplicate == true){
          $('#email').siblings('span.Ck').text('').fadeOut().parent('.col-xs-8').removeClass('hasCk');
          $('#email').siblings('span.CkError').text('❌중복된 이메일입니다.').fadeIn().parent('.col-xs-8').addClass('hasCkError');
          emailck = false;
        }else{
          $('#email').siblings('span.CkError').text('').fadeOut().parent('.col-xs-8').removeClass('hasCkError');
          $('#email').siblings('span.Ck').text('인증번호가 발송되었습니다. 인증번호를 입력해 주세요').fadeIn().parent('.col-xs-8').addClass('hasCk'); 
          emailck = true;
          var verify = document.getElementById("verify"); 
          verify.style.display = "block";
          verifyEmail();
      } 
  }).fail(function(){
    alert("중복체크에 실패하였습니다.")
  })
  ;
}
else{
  alert("입력하신 정보를 다시 확인해 주세요")
}
}

function verifyEmail(){
 var email = $('#email').val();
  $.ajax({
    type: "POST",
    url: "http://localhost:8080/mail",
    data: {email: email},
    success: function(response){
      checkcode = response;
    },
    fail:function(){
      alert("이메일 발송 실패")
    }
    });
}

// function checkverify(){
//     var code = $('#emailVerify').val();
//      $.ajax({
//        type: "POST",
//        url: "http://localhost:8080/verify",
//        data: {code:code},
//        success: function (response) {
//         var result = response;
//         if(result == true){
//           var verify = document.getElementById("verify"); 
//           verify.style.display = "none";
//           $('#emailVerify').siblings('span.verifyError').text('').fadeOut().parent('.col-xs-8').removeClass('hasVerifyError'); 
//           // $('#email').siblings('span.Ck').text('').fadeOut().parent('.col-xs-8').removeClass('hasCk'); 
//           $('#email').siblings('span.Ck').text('✔️인증에 성공하였습니다.').fadeIn().parent('.col-xs-8').addClass('hasCk');
//           emailVerify = true; 
//         }
//         if(result == false){
//           $('#emailVerify').siblings('span.verifyError').text('❌인증번호가 일치하지 않습니다.').fadeIn().parent('.emailVerify').addClass('hasVerifyError');
//           emailVerify = false;
//          }  
//        },
//        });
// }
function checkverify(){
  var code = $('#emailVerify').val();
  if(code == checkcode){
    var verify = document.getElementById("verify"); 
    verify.style.display = "none";
    $('#emailVerify').siblings('span.verifyError').text('').fadeOut().parent('.col-xs-8').removeClass('hasVerifyError'); 
    // $('#email').siblings('span.Ck').text('').fadeOut().parent('.col-xs-8').removeClass('hasCk'); 
    $('#email').siblings('span.Ck').text('✔️인증에 성공하였습니다.').fadeIn().parent('.col-xs-8').addClass('hasCk');
    emailVerify = true; 
    checkcode = null;
  }
  else{
    $('#emailVerify').siblings('span.verifyError').text('❌인증번호가 일치하지 않습니다.').fadeIn().parent('.emailVerify').addClass('hasVerifyError');
    emailVerify = false;
  }
}