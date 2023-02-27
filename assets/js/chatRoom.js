// 토큰 불러오기
$(document).ready(function () {
  const ok = localStorage.getItem('accessToken')

  if (ok.length == 0) {
    console.error("userId 요소를 찾을 수 없습니다.");
    return;
  }
  chatList();
});


const userToken = localStorage.getItem('accessToken')
// let 변경 가능, const 변경불가능; -> 개발자



// 채팅방 만들기
// 채팅 보여주는 부분 쪽 채팅 버튼에 "onclick=함수명(${'productId'})" 해줘야함
function createChatRoom(productId) {
  $.ajax({
    type: 'POST',
    url: "http://localhost:8080/chatroom/" + productId,
    headers: { Authorization: userToken },
    success: function (response) {
      for (let i = 0; i < response.length; i++) {
        let productId = productId
        let profileImg = response[i]['profileImg'];
        let nickname = response[i]['nickname'];
        let region = response[i]['region'];
        let productName = response[i]['productName'];
        let roomId = response[i]['roomId'];
        let temp_html = `<li id="roomId" class="chatDesc" data-roomid="${roomId}" data-nickname="${nickname}">
                            <a style="color: black; text-decoration: none;" onclick="">
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
        $('#roomList').append(temp_html);
        window.location = '/chatRoom.html';
      }
    },
    error: function (xhr, status, error) {
      console.error(xhr);
    }
  });
}

// 채팅 리스트
function chatList() {
  $("#roomList").empty()
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/chatrooms',
    headers: { Authorization: userToken },
    dataType: 'json',
    success: function (response) {
      // 가져온 데이터로 채팅 리스트를 렌더링합니다.
      let roomList = response.roomList;

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


// 전역 변수로 현재 방의 정보 저장 -> 두번 클릭 시 계속해서 같은 내용 붙어서 불러오는 이슈 해결
let currentRoomId = null;
let currentNickname = null;



function chatView(roomId, nickname, producId) {
  // 현재 방과 이전 방이 다른 경우에만 ajax 요청 보냄
  connect(roomId, nickname, producId)
  if (currentRoomId !== roomId || currentNickname !== nickname) {
    $('#creatChat').empty();
    $('#message').empty();
    $('#chatMessage').show();
    $.ajax({
      type: 'GET',
      url: "http://localhost:8080/chatrooms/" + roomId,
      headers: { Authorization: userToken },
      success: function (response) {
        let productId = producId;
        let roomName = response['roomName'];
        let productPrice = response['productPrice'];
        let productEnum = response['productEnum'];
        let productImg = response['productImg'];
        $("#apponent_nickname").text(nickname);
        $(".roomName").text(roomName);
        $(".productPrice").text(`${productPrice}원`);
        $(".deal").text(`${productEnum}`);
        $(".productImg").text(`${productImg}`);
        // 현재 방의 정보를 전역 변수에 저장
        currentRoomId = roomId;
        currentNickname = nickname;

        let messageList = response["messageList"];

        for (let i = 0; i < messageList.length; i++) {
          let receiver = messageList[i]['receiver'];
          let message = messageList[i]['message'];
          let sender = messageList[i]['sender'];
          let time = messageList[i]['sendDate'];
          let sendTime = new Date(time);
          let hour = sendTime.getHours();
          let min = sendTime.getMinutes();

          let sendDay = sendTime.toLocaleDateString().replace(/\./g, '').replace(/\s/g, '/') + " " + hour + ":" + min;

          let temp_html = `<li class= ${sender == nickname ? "left" : "right"}>
                              <div class= ${sender == nickname ? "receiver" : "sender"}>
                                <span id="nickname">${sender == nickname ? receiver : sender}</span><br>
                                <small id="sendDate" class="time">${sendDay}</small>
                              </div>
                              <div id="messageNow" class="message">
                                ${message}
                              </div>
                            </li>`;
          $('#messageList').append(temp_html);
        }
        connect(roomId, nickname, productId);
        sendChat(messageList)
      }

    });
  }
}


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
    },
  });
}





let stompClient = null;


function setConnected(connected) {
  $("#connect").prop(connected);
  $("#disconnect").prop(!connected);
}


function connect(roomId, nickname, productId) {
  $('#creatChat').empty();
  $('#message').empty();
  $('#chatMessage').show();
  console.log(roomId, nickname, productId)
  let socket = new SockJS("http://localhost:8080/ws");
  stompClient = Stomp.over(socket);
  stompClient.connect({ Authorization: userToken }, function (frame) {
    setConnected(true);
    console.log("connected : " + frame);
    console.log("nick : " + nickname, "room : " + roomId, "product : " + productId)
    stompClient.subscribe("/sub/" + nickname + "/product" + productId, function (chat) {
      // 메시지가 도착하면, 이곳에서 처리합니다.

      let messageList = JSON.parse(chat.body);
      let sender = messageList.sender;
      let receiver = messageList.receiver;
      let message = messageList.message;
      let time = messageList.sendDate;
      let sendTime = new Date(time);
      let hour = sendTime.getHours();
      let min = sendTime.getMinutes();

      let sendDay = sendTime.toLocaleDateString().replace(/\./g, '').replace(/\s/g, '/') + " " + hour + ":" + min;

      let temp_html = `<li class= ${sender == nickname ? "left" : "right"}>
                            <div class= ${sender == nickname ? "receiver" : "sender"}>
                              <span>${sender == nickname ? receiver : sender}</span>
                              <small class="time">${sendDay}</small>
                            </div>
                            <div class="message">
                              ${message}
                            </div>
                      </li>`;
      $('#messageList').append(temp_html);
    });

    $("#send").attr("onclick", `sendChat(${roomId}, ${productId}, '${nickname}')`)// , ${productId} 넣기
  });

  $("#message").keyup(function (event) {
    if (event.which === 13) {
      // console.log("enter key pressed!");
      $("#send").click();
    }
  });
};


function sendChat(roomId, productId, nickname, sender) {
  console.log(roomId, productId, nickname, sender)
  stompClient.send("/pub/send", { Authorization: userToken }, JSON.stringify({
    "message": $("#message").val(),
    "receiver": nickname,
    "sender": sender,
    "roomId": parseInt(roomId),
    "productId": parseInt(productId)
  }));
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
    },
  });
}
