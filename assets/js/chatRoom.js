// 토큰 불러오기
$(document).ready(function () {
  const ok = localStorage.getItem('accessToken')
  getProfile();
  if (ok.length == 0) {
    console.error("userId 요소를 찾을 수 없습니다.");
    return;
  }
  chatList();
});


const userToken = localStorage.getItem('accessToken')
// let 변경 가능, const 변경불가능; -> 개발자

// 채팅 리스트
function chatList() {
  $("#roomList").empty()
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/chatroom/buy',
    headers: { Authorization: userToken },
    dataType: 'json',
    success: function (response) {
      // 가져온 데이터로 채팅 리스트를 렌더링합니다.
      let roomList = response;

      // 가져온 채팅방 리스트를 동적으로 추가합니다.
      for (let i = 0; i < roomList.length; i++) {
        let profileImg = roomList[i]['profileImg'];
        let nickname = roomList[i]['nickname'];
        let region = roomList[i]['region'];
        let productName = roomList[i]['productName'];
        let roomId = roomList[i]['roomId'];
        let productId = roomList[i]['productId']

        let temp_html = `<li id="roomId" class="chatDesc" data-roomid="${roomId}" data-nickname="${nickname}">
                            <a style="color: black; text-decoration: none;" onclick="chatView(${roomId}, '${nickname}', ${productId});">
                              <table cellpadding="0" cellspacing="0">
                                <tr>
                                  <td class="profile_td">
                                    <img src="${profileImg}" alt="프로필"/>
                                  </td>
                                  <td class="nickname_td">
                                    <div class="nickname">
                                      ${nickname}
                                    </div>
                                    <small class="region">${region}</small>
                                  </td>
                                  <td class="product_td">
                                    <div class="productName">
                                      ${productName}
                                    </div>
                                  </td>
                                  <td id="deleteBtn">
                                    <button class="deleteBtn" type="submit" onclick="deleteChat(${roomId})">삭제</button>
                                  </td>
                                </tr>
                              </table>
                            </a>
                          </li>`;

        // 새로 생성한 HTML 코드를 DOM에 추가합니다.
        $('#roomList').append(temp_html);
      }
    },
    error: function (xhr, status, error) {
      console.error(xhr);
    }
  });
}


function getProfile() {
  var settings = {
    "url": "http://localhost:8080/users/profile",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": localStorage.getItem('accessToken')
    },
  };
  $.ajax(settings).done(function (response) {
    const nickname = response.nickname;
    sender = nickname;
    // $('#loginForm').siblings('span.nickName').text(response.nickname + "님").parent('.loginForm').addClass('hasNickname');
    document.getElementById('loginbuttons').style.display = 'none';
    let temp_html = `<li class="dropdown dropdown-large" style="margin-top: 13px; margin-right: 10px">
      <a href="#" class="dropdown-toggle" data-toggle="dropdown" style = "color:black">${nickname}님 </a>
      <ul class="dropdown-menu dropdown-menu-end" >
          <li class="col-sm-6">
              <ul>
              <li class="dropdown-header">${nickname}님</li>
              <li><a href="myinfo.html">내정보</a></li>
              <li><a href="purchaseList.html">구매상품</a></li>
              <li><a href="#">판매상품</a></li>
              <li><a href="chatroom.html">채팅</a></li>
              <li><a href="myinterest.html">관심목록</a></li>
              </ul>
          </li>               
      </ul>      
  </li>
  <div style = "color:#82ca9c; margin-left 10px; margin-top: 14px" ><a onclick = "logout()" > 로그아웃 </a></div>`
    $('#loginForm').append(temp_html);

  }).fail(function () {
    reissueToken();
  });
}

function setConnected(connected) {
  $("#connect").prop(connected);
  $("#disconnect").prop(!connected);
  // if (connected) {
  //   $("#chat").show();
  // }
  // else {
  //   $("#chat").hide();
  // }
  // $("#messageList").html("")
}


// 전역 변수로 현재 방의 정보 저장 -> 두번 클릭 시 계속해서 같은 내용 붙어서 불러오는 이슈 해결
let currentRoomId = null;
let currentNickname = null;
let sender = "";
let stompClient = null;
let socket = null;

function connect(roomId, nickname, productId) {

  socket = new SockJS("http://localhost:8080/ws");
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    setConnected(true);
    console.log("connected : " + frame);
    $("#apponent_nickname").text(nickname);
    stompClient.subscribe("/sub/" + roomId, function (chat) {
      // 메시지가 도착하면, 이곳에서 처리합니다.

      let msg = JSON.parse(chat.body);
      let sender = msg.sender;
      let receiver = msg.receiver;
      let message = msg.message;
      let sendTime = new Date();
      let hour = sendTime.getHours();
      let min = sendTime.getMinutes();

      let sendDay = sendTime.toLocaleDateString().replace(/\./g, '').replace(/\s/g, '/') + " " + hour + ":" + min;

      let temp_html = `<li class= ${sender === nickname ? "left" : "right"}>
                            <div class= ${sender == nickname ? "receiver" : "sender"}>
                            <span id="userNickname">${sender == receiver ? receiver : sender}</span><br>
                            <small id="sendDate" class="time">${sendDay}</small>
                          </div>
                          <div id="messageNow" class="message">
                            ${message}
                          </div>
                      </li>`;
      $('#messageList').append(temp_html);
    });

    $("#send").attr("onclick", `sendChat(${roomId}, ${productId}, '${nickname}', '${sender}')`)// , ${productId} 넣기

    $('#messageList').scrollTop($('#chat')[0].scrollHeight);
  });
};


function sendChat(roomId, productId, nickname, sender, message) {
  var message = $("#message").val();

  if (message == "" || message == null) {
    return;
  }

  stompClient.send("/pub/" + roomId, {}, JSON.stringify({
    "message": message,
    "sender": sender,
    "receiver": nickname,
    "roomId": roomId,
    "productId": productId
  }));
}

function chatView(roomId, nickname, productId) {
  // 현재 방과 이전 방이 다른 경우에만 ajax 요청 보냄
  if (currentRoomId !== roomId || currentNickname !== nickname) {

    $('#creatChat').empty();
    $('#message').empty();
    $('#messageList').empty();
    $('#chatMessage').show();
    $.ajax({
      type: 'GET',
      url: "http://localhost:8080/chatrooms/" + roomId,
      headers: { Authorization: userToken },
      success: function (response) {
        getProduct(productId);
        // 현재 방의 정보를 전역 변수에 저장
        currentRoomId = roomId;
        currentNickname = nickname;

        let messageList = response;

        for (let i = 0; i < messageList.length; i++) {
          let receiver = messageList[i]['receiver'];
          let message = messageList[i]['message'];
          let sender = messageList[i]['sender'];
          let sendTime = new Date();
          let hour = sendTime.getHours();
          let min = sendTime.getMinutes();

          let sendDay = sendTime.toLocaleDateString().replace(/\./g, '').replace(/\s/g, '/') + " " + hour + ":" + min;

          let temp_html = `<li class= ${sender == nickname ? "left" : "right"}>
                              <div class= ${sender == nickname ? "receiver" : "sender"}>
                                <span id="userNickname">${sender == receiver ? receiver : sender}</span><br>
                                <small id="sendDate" class="time">${sendDay}</small>
                              </div>
                              <div id="messageNow" class="message">
                                ${message}
                              </div>
                            </li>`;
          $('#messageList').append(temp_html);
        }
      }
    });
  }
  connect(roomId, nickname, productId)
}


function disconnect() {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
  setConnected(false);
  window.location.reload();
  console.log("disconnected");
}


$(function () {
  $("#chat").on('submit', function (e) {
    e.preventDefault();
  });
  $("#disconnect").click(function () { disconnect(); });
});


// 채팅 삭제
function deleteChat(roomId) {
  $('#chatMessage').hide();
  $.ajax({
    type: "DELETE",
    url: "http://localhost:8080/chatroom/" + roomId,
    headers: { Authorization: userToken },
    dataType: "json",
    success: function (response) {
      // 삭제 성공 시 처리할 코드
      alert("삭제되었습니다.");
      // 채팅 리스트 다시 불러오기
      window.location.reload();
    }
  });
}

function logout() {
  var settings = {
    "url": "http://localhost:8080/users/logout",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Authorization": localStorage.getItem('accessToken'),
      "Refresh": localStorage.getItem('refreshToken')
    },
  };

  $.ajax(settings).done(function (response) {
    localStorage.setItem('accessToken', '');
    window.location.reload();
  });

}

function getProduct(productId) {
  var settings = {
    "url": "http://localhost:8080/products/" + productId,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": localStorage.getItem('accessToken')
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    let productId = response['productId'];
    let roomName = response['productName'];
    let productPrice = response['productPrice'];
    let productEnum = response['productEnum'];
    let productImg = response['productImg'];

    $(".roomName").text(roomName);
    $(".productPrice").text(`${productPrice}원`);
    $(".deal").text(`${productEnum}`);
    $(".productImg").text(`${productImg}`);
  });
}