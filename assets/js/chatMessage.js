





function connect(roomId, nickname, productId) {
    $('#creatChat').empty();
    $('#message').empty();
    $('#chatMessage').show();
    let socket = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(socket);
    stompClient.connect({ Authorization: userToken }, function (frame) {
        setConnected(true);
        console.log("connected : " + frame);

        stompClient.subscribe("/sub/" + nickname + "/product" + productId, function (chat) {
            // 메시지가 도착하면, 이곳에서 처리합니다.

            let messageList = JSON.parse(chat.body);
            let sender = messageList.sender;
            let receiver = messageList.receiver;
            let message = messageList.message;
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
            temp_html = ``

        });

        $("#send").attr("onclick", `sendChat(${roomId}, ${productId}, '${nickname}', '${sender}')`)// , ${productId} 넣기

        $('#messageList').scrollTop($('#chat')[0].scrollHeight);
    });

    $("#message").keyup(function (event) {
        if (event.which === 13) {
            // console.log("enter key pressed!");
            $("#send").click();
        }
    });
};

function sendChat(roomId, productId, nickname, sender) {
  var message = $("#message").val();

  if (message == "" || message == null) {
    return;
  }

  stompClient.send("/pub/send", { Authorization: userToken }, JSON.stringify({
    "message": $("#message").val(),
    "sender": sender,
    "receiver": nickname,
    "roomId": roomId,
    "productId": productId
  }));
}

function chatView(roomId, nickname, productId) {
    // 현재 방과 이전 방이 다른 경우에만 ajax 요청 보냄
    connect(roomId, nickname, productId)
    if (currentRoomId !== roomId || currentNickname !== nickname) {

        $('#creatChat').empty();
        $('#message').empty();
        $('#chatMessage').show();
        $.ajax({
            type: 'GET',
            url: "http://localhost:8080/chatrooms/" + roomId,
            headers: { Authorization: userToken },
            success: function (response) {


                let productId = response['productId'];
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
}






function sendChat(roomId, productId, nickname, sender) {
  var message = $("#message").val();
  if (message == "" || message == null) {
    return;
  }
  stompClient.send("/pub/send", { Authorization: userToken }, JSON.stringify({
    "message": $("#message").val(),
    "sender": sender,
    "receiver": nickname,
    "roomId": roomId,
    "productId": productId
  }));
}





function chatView(roomId, nickname, productId) {
  $('#creatChat').empty();
  $('#message').empty();
  $('#chatMessage').show();
  let socket = new SockJS("http://localhost:8080/ws");
  stompClient = Stomp.over(socket);
  stompClient.connect({ Authorization: userToken }, function (frame) {
      setConnected(true);
      console.log("connected : " + frame);
      stompClient.subscribe("/sub/" + nickname + "/product" + productId, function (chat) {
          // 메시지가 도착하면, 이곳에서 처리합니다.

          let messageList = JSON.parse(chat.body);
          let sender = messageList.sender;
          let receiver = messageList.receiver;
          let message = messageList.message;
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
          temp_html = ``

      });

      $("#send").attr("onclick", `sendChat(${roomId}, ${productId}, '${nickname}', '${sender}')`)// , ${productId} 넣기

      $('#messageList').scrollTop($('#chat')[0].scrollHeight);

      // 이전 방과 현재 방이 다른 경우 ajax 요청을 보냄
      if (currentRoomId !== roomId || currentNickname !== nickname) {

          $.ajax({
              type: 'GET',
              url: "http://localhost:8080/chatrooms/" + roomId,
              headers: { Authorization: userToken },
              success: function (response) {

                  let productId = response['productId'];
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
                      temp_html = ``

                  };

                  $("#send").attr("onclick", `sendChat(${roomId}, ${productId}, '${nickname}', '${sender}')`)// , ${productId} 넣기

                  $('#messageList').scrollTop($('#chat')[0].scrollHeight);
              }
          });
      }
  })
}
