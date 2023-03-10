// 토큰 불러오기
import URL_VARIABLE from './export.js';

$(document).ready(function () {
  const ok = localStorage.getItem('accessToken')
  if (ok.length == 0) {
    console.error("userId 요소를 찾을 수 없습니다.");
    return;
  }
  initMap();
});





// 지도 초기화
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
var address;
var address2;
var address3;

function getFullAddress(x, y) {
  console.log(x, y)

  $.ajax({
    url: URL_VARIABLE + "users/address/signup",
    type: "GET",
    headers: { Authorization: userToken },
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
  
  window.close();
}

$("#setupCompleted").click(setupCompleted);
