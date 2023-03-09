import URL_VARIABLE from './export.js';
$(document).ready(function () {
  initMap()
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
      nicknameck = false;


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
    
     
      // if ($(this).hasClass('form-control 7')) {
      //   if ($(this).val().length === 0) {
      //     $(this).siblings('span.error').text('지역을 입력해 주세요').fadeIn().parent('.col-xs-8').addClass('hasError');
      //     regionError = true;
      //     regionHasError = true;
      //     }else {
      //         $(this).siblings('.error').text('').fadeOut().parent('.col-xs  -8').removeClass('hasError');
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

var  waitingEmail = true,
     emailVerify = false;
    
function signup() {
  var region = document.getElementById('region');
  const address = region.textContent;
  let [address1, address2, address3] = address.split(' ');
  console.log(address1);
if(emailVerify == true){
  var settings = {
    "url": URL_VARIABLE + "users/signup",
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
      "address1": address1,
      "address2": address2,
      "address3": address3
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
 else{
  alert("입력하신 정보를 다시 확인해 주세요")
 }
}

function GoogleSignup(){
  location.href =URL_VARIABLE + 'oauth2/authorization/google';

}

function usernamecheck(clicked_id){
  if($('#username').val() != null & (/^[a-zA-Z0-9_-]{4,12}$/).test($('#username').val())){
    var field = clicked_id.substr(2)
  var settings = {
    "url": URL_VARIABLE + "users/duplicate",
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
    "url": URL_VARIABLE + "users/duplicate",
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
    "url": URL_VARIABLE + "users/duplicate",
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
          $('#email').siblings('span.Ck').text('인증번호가 발송되었습니다. 인증번호를 입력해 주세요. 인증 유효기간은 5분입니다.').fadeIn().parent('.col-xs-8').addClass('hasCk'); 
          emailck = true;
          var verify = document.getElementById("verify"); 
          verify.style.display = "block";
         
          if(waitingEmail == true){
            
            setTime();
            verifyEmail();
          }else{
            alert("인증메일 재발송 대기시간이 지나지 않았습니다.")
          }
          
         
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

function setTime(){
  var time= 300;
    var min="";
    var sec="";
    var x = setInterval(function(){
      min = parseInt(time/60);
      sec = time%60;
      document.getElementById('Timer').innerHTML = "인증메일 재발송 대기시간 : " + min + "분" + sec + "초"
      time--;
      if(time < 0){
      clearInterval(x);
      document.getElementById('Timer').innerHTML = "재발송 가능"
    }},1000);

}
    
function verifyEmail(){
     waitingEmail = false;
    setTimeout(setWatingEmail, 180000); 
    var email = $('#email').val();
    $.ajax({
      type: "POST",
      url: URL_VARIABLE + "mail",
      data: {email: email},
      success: function(response){
        checkcode = response;
      },
      fail:function(){
        alert("이메일 발송 실패")
      }
      });
}
function setWatingEmail(){
  waitingEmail = true;
}

// function checkverify(){
//     var code = $('#emailVerify').val();
//      $.ajax({
//        type: "POST",
//        url: URL_VARIABLE + "verify",
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
  var email = $('#email').val();
  $.ajax({
    type: "POST",
    url: URL_VARIABLE + "verify",
    data: {code:code, email:email},
    success: function (response) {
     var result = response;
     if(result == true){
       var verify = document.getElementById("verify"); 
       verify.style.display = "none";
       $('#emailVerify').siblings('span.verifyError').text('').fadeOut().parent('.col-xs-8').removeClass('hasVerifyError'); 
       // $('#email').siblings('span.Ck').text('').fadeOut().parent('.col-xs-8').removeClass('hasCk'); 
       $('#email').siblings('span.Ck').text('✔️인증에 성공하였습니다.').fadeIn().parent('.col-xs-8').addClass('hasCk');
       emailVerify = true; 
     }
     if(result == false){
       $('#emailVerify').siblings('span.verifyError').text('❌인증번호가 일치하지 않습니다.').fadeIn().parent('.emailVerify').addClass('hasVerifyError');
       emailVerify = false;
      }  
    },
    });
}

function postCode(){
  let url = '/addressSign.html';
  let option = "width = 800, height = 800, top = 100, left = 200, location = no"

  window.open(url,'',option)
 
  
}

function initMap() {
  var container = document.getElementById('map');
  var options = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 3
  };
}


/* 비동기적으로 현재 위치를 알아내어 지정된 요소에 출력한다. */
function whereami(elt) {
  var options = {
    enableHighAccuracy: false, // 대략적인 값이라도 상관 없음: 기본값

    // 위치 정보가 충분히 캐시되었으면, 이 프로퍼티를 설정하자,
    // 위치 정보를 강제로 재확인하기 위해 사용하기도 하는 이 값의 기본 값은 0이다.
    maximumAge: 30000,     // 5분이 지나기 전까지는 수정되지 않아도 됨

    // 위치 정보를 받기 위해 얼마나 오랫동안 대기할 것인가?
    // 기본값은 Infinity이므로 getCurrentPosition()은 무한정 대기한다.
    timeout: 15000    // 15초 이상 기다리지 않는다.
  }

  if (navigator.geolocation) // geolocation 을 지원한다면 위치를 요청한다.
  {
    navigator.geolocation.getCurrentPosition(success, error, options);
  } else {
    elt.innerHTML = "이 브라우저에서는 Geolocation이 지원되지 않습니다.";
  }

  // geolocation 요청이 실패하면 이 함수를 호출한다.
  function error(e) {
    // 오류 객체에는 수치 코드와 텍스트 메시지가 존재한다.
    // 코드 값은 다음과 같다.
    // 1: 사용자가 위치 정보를 공유 권한을 제공하지 않음.
    // 2: 브라우저가 위치를 가져올 수 없음.
    // 3: 타임아웃이 발생됨.
    elt.innerHTML = "Geolocation 오류 " + e.code + ": " + e.message;
  }

  // geolocation 요청이 성공하면 이 함수가 호출된다.
  function success(pos) {

    // 항상 가져올 수 있는 필드들이다. timestamp는 coords 객체 내부에 있지 않고,
    // 외부에서 가져오는 필드라는 점에 주의하다.
    let x = pos.coords.longitude;
    let y = pos.coords.latitude;

    createKaKaoMap(y, x);
    getFullAddress(x, y)
  }
}

function createKaKaoMap(y, x) {
  var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
  var options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(y, x), //지도의 중심좌표.
    level: 3 //지도의 레벨(확대, 축소 정도)
  };

  var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

  // 지도를 클릭한 위치에 표출할 마커입니다
  var marker = new kakao.maps.Marker({
    // 지도 중심좌표에 마커를 생성합니다
    position: map.getCenter()
  });
  // 지도에 마커를 표시합니다
  marker.setMap(map);
};


function getFullAddress(x, y) {
  console.log(x, y)

  $.ajax({
    url: URL_VARIABLE + "users/address/signup",
    type: "GET",  
    data: { x: x, y: y },
    dataType: 'json',
    success: function (response) {
      console.log("뭘까 " + response)
    }
  })
  .done(function (fragment) {
    console.log(fragment);
     address = fragment['address'];
    address2 = fragment['address2'];
    address3 = fragment['address3'];
    console.log(address)
 


  });
}

// 나의 위치정보를 출력할 객체 구하기
var elt = document.getElementById("myLocationInfo");
var x = document.getElementById("x");
var y = document.getElementById("y");

// 나의 위치정보 출력하기
whereami(elt);


function setupCompleted(){
  alert("지역 설정이 완료되었습니다.")
  localStorage.setItem('address1',address)
  localStorage.setItem('address2',address2)
  localStorage.setItem('address3',address3)
  window.opener.setRegion();
  window.close();
}

function setRegion(){
  $("#region").text(localStorage.getItem('address1')+" "+localStorage.getItem('address2')+" "+localStorage.getItem('address3'))
  localStorage.removeItem('address1')
  localStorage.removeItem('address2')
  localStorage.removeItem('address3') 
}