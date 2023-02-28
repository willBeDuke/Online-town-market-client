





// function connect(roomId, nickname, productId) {
//     $('#creatChat').empty();
//     $('#message').empty();
//     $('#chatMessage').show();
//     let socket = new SockJS("http://localhost:8080/ws");
//     stompClient = Stomp.over(socket);
//     stompClient.connect({ Authorization: userToken }, function (frame) {
//         setConnected(true);
//         console.log("connected : " + frame);

//         stompClient.subscribe("/sub/" + nickname + "/product" + productId, function (chat) {
//             // 메시지가 도착하면, 이곳에서 처리합니다.

//             let messageList = JSON.parse(chat.body);
//             let sender = messageList.sender;
//             let receiver = messageList.receiver;
//             let message = messageList.message;
//             let sendTime = new Date();
//             let hour = sendTime.getHours();
//             let min = sendTime.getMinutes();

//             let sendDay = sendTime.toLocaleDateString().replace(/\./g, '').replace(/\s/g, '/') + " " + hour + ":" + min;

//             let temp_html = `<li class= ${sender === nickname ? "left" : "right"}>
//                             <div class= ${sender == nickname ? "receiver" : "sender"}>
//                             <span id="userNickname">${sender == receiver ? receiver : sender}</span><br>
//                             <small id="sendDate" class="time">${sendDay}</small>
//                           </div>
//                           <div id="messageNow" class="message">
//                             ${message}
//                           </div>
//                       </li>`;
//             $('#messageList').append(temp_html);
//             temp_html = ``

//         });

//         $("#send").attr("onclick", `sendChat(${roomId}, ${productId}, '${nickname}', '${sender}')`)// , ${productId} 넣기

//         $('#messageList').scrollTop($('#chat')[0].scrollHeight);
//     });

//     $("#message").keyup(function (event) {
//         if (event.which === 13) {
//             // console.log("enter key pressed!");
//             $("#send").click();
//         }
//     });
// };

// function sendChat(roomId, productId, nickname, sender) {
//   var message = $("#message").val();

//   if (message == "" || message == null) {
//     return;
//   }

//   stompClient.send("/pub/send", { Authorization: userToken }, JSON.stringify({
//     "message": $("#message").val(),
//     "sender": sender,
//     "receiver": nickname,
//     "roomId": roomId,
//     "productId": productId
//   }));
// }

// function chatView(roomId, nickname, productId) {
//     // 현재 방과 이전 방이 다른 경우에만 ajax 요청 보냄
//     connect(roomId, nickname, productId)
//     if (currentRoomId !== roomId || currentNickname !== nickname) {

//         $('#creatChat').empty();
//         $('#message').empty();
//         $('#chatMessage').show();
//         $.ajax({
//             type: 'GET',
//             url: "http://localhost:8080/chatrooms/" + roomId,
//             headers: { Authorization: userToken },
//             success: function (response) {


//                 let productId = response['productId'];
//                 let roomName = response['roomName'];
//                 let productPrice = response['productPrice'];
//                 let productEnum = response['productEnum'];
//                 let productImg = response['productImg'];
//                 $("#apponent_nickname").text(nickname);
//                 $(".roomName").text(roomName);
//                 $(".productPrice").text(`${productPrice}원`);
//                 $(".deal").text(`${productEnum}`);
//                 $(".productImg").text(`${productImg}`);
//                 // 현재 방의 정보를 전역 변수에 저장
//                 currentRoomId = roomId;
//                 currentNickname = nickname;

//                 let messageList = response["messageList"];

//                 for (let i = 0; i < messageList.length; i++) {
//                     let receiver = messageList[i]['receiver'];
//                     let message = messageList[i]['message'];
//                     let sender = messageList[i]['sender'];
//                     let time = messageList[i]['sendDate'];
//                     let sendTime = new Date(time);
//                     let hour = sendTime.getHours();
//                     let min = sendTime.getMinutes();

//                     let sendDay = sendTime.toLocaleDateString().replace(/\./g, '').replace(/\s/g, '/') + " " + hour + ":" + min;

//                     let temp_html = `<li class= ${sender == nickname ? "left" : "right"}>
//                               <div class= ${sender == nickname ? "receiver" : "sender"}>
//                                 <span id="userNickname">${sender == receiver ? receiver : sender}</span><br>
//                                 <small id="sendDate" class="time">${sendDay}</small>
//                               </div>
//                               <div id="messageNow" class="message">
//                                 ${message}
//                               </div>
//                             </li>`;
//                     $('#messageList').append(temp_html);
//                 }
//             }
//         });
//     }
// }






// function sendChat(roomId, productId, nickname, sender) {
//   var message = $("#message").val();
//   if (message == "" || message == null) {
//     return;
//   }
//   stompClient.send("/pub/send", { Authorization: userToken }, JSON.stringify({
//     "message": $("#message").val(),
//     "sender": sender,
//     "receiver": nickname,
//     "roomId": roomId,
//     "productId": productId
//   }));
// }





// function chatView(roomId, nickname, productId) {
//   $('#creatChat').empty();
//   $('#message').empty();
//   $('#chatMessage').show();
//   let socket = new SockJS("http://localhost:8080/ws");
//   stompClient = Stomp.over(socket);
//   stompClient.connect({ Authorization: userToken }, function (frame) {
//       setConnected(true);
//       console.log("connected : " + frame);
//       stompClient.subscribe("/sub/" + nickname + "/product" + productId, function (chat) {
//           // 메시지가 도착하면, 이곳에서 처리합니다.

//           let messageList = JSON.parse(chat.body);
//           let sender = messageList.sender;
//           let receiver = messageList.receiver;
//           let message = messageList.message;
//           let sendTime = new Date();
//           let hour = sendTime.getHours();
//           let min = sendTime.getMinutes();

//           let sendDay = sendTime.toLocaleDateString().replace(/\./g, '').replace(/\s/g, '/') + " " + hour + ":" + min;

//           let temp_html = `<li class= ${sender === nickname ? "left" : "right"}>
//                             <div class= ${sender == nickname ? "receiver" : "sender"}>
//                             <span id="userNickname">${sender == receiver ? receiver : sender}</span><br>
//                             <small id="sendDate" class="time">${sendDay}</small>
//                           </div>
//                           <div id="messageNow" class="message">
//                             ${message}
//                           </div>
//                       </li>`;
//           $('#messageList').append(temp_html);
//           temp_html = ``

//       });

//       $("#send").attr("onclick", `sendChat(${roomId}, ${productId}, '${nickname}', '${sender}')`)// , ${productId} 넣기

//       $('#messageList').scrollTop($('#chat')[0].scrollHeight);

//       // 이전 방과 현재 방이 다른 경우 ajax 요청을 보냄
//       if (currentRoomId !== roomId || currentNickname !== nickname) {

//           $.ajax({
//               type: 'GET',
//               url: "http://localhost:8080/chatrooms/" + roomId,
//               headers: { Authorization: userToken },
//               success: function (response) {

//                   let productId = response['productId'];
//                   let roomName = response['roomName'];
//                   let productPrice = response['productPrice'];
//                   let productEnum = response['productEnum'];
//                   let productImg = response['productImg'];
//                   $("#apponent_nickname").text(nickname);
//                   $(".roomName").text(roomName);
//                   $(".productPrice").text(`${productPrice}원`);
//                   $(".deal").text(`${productEnum}`);
//                   $(".productImg").text(`${productImg}`);
//                   // 현재 방의 정보를 전역 변수에 저장
//                   currentRoomId = roomId;
//                   currentNickname = nickname;

//                   let messageList = response["messageList"];

//                   for (let i = 0; i < messageList.length; i++) {
//                       let receiver = messageList[i]['receiver'];
//                       let message = messageList[i]['message'];
//                       let sender = messageList[i]['sender'];
//                       let time = messageList[i]['sendDate'];
//                       let sendTime = new Date(time);
//                       let hour = sendTime.getHours();
//                       let min = sendTime.getMinutes();

//                       let sendDay = sendTime.toLocaleDateString().replace(/\./g, '').replace(/\s/g, '/') + " " + hour + ":" + min;

//                       let temp_html = `<li class= ${sender === nickname ? "left" : "right"}>
//                           <div class= ${sender == nickname ? "receiver" : "sender"}>
//                           <span id="userNickname">${sender == receiver ? receiver : sender}</span><br>
//                           <small id="sendDate" class="time">${sendDay}</small>
//                         </div>
//                         <div id="messageNow" class="message">
//                           ${message}
//                         </div>
//                     </li>`;
//                       $('#messageList').append(temp_html);
//                       temp_html = ``

//                   };

//                   $("#send").attr("onclick", `sendChat(${roomId}, ${productId}, '${nickname}', '${sender}')`)// , ${productId} 넣기

//                   $('#messageList').scrollTop($('#chat')[0].scrollHeight);
//               }
//           });
//       }
//   })
// }

$(document).ready(function () {
    const ok = localStorage.getItem('accessToken')
    getProfile(); //프로필
    chatList(); // 내 채팅 리스트
    if (ok.length == 0) {
      console.error("userId 요소를 찾을 수 없습니다.");
      return;
    }
    
  });
  //userToken
  const userToken = localStorage.getItem('accessToken')
  //프로필 불러오기
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
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" style = "color:black">${nickname}님 <b class="caret"></b></a>
        
        <ul class="dropdown-menu dropdown-menu-end" >
            <li class="col-sm-6">
                <ul>
                    <li class="dropdown-header">${nickname}님</li>
                    <li><a href="myinfo.html">내정보</a></li>
                    <li><a href="#">판매상품</a></li>
                    <li><a href="#">구매상품</a></li>
                    <li><a href="chatroom.html">채팅</a></li>
                    <li><a href="myinterest.html">관심목록</a></li>
                </ul>
            </li>               
        </ul>      
    </li>
    <div style = "color:#82ca9c; margin-left 10px; margin-top: 14px" ><a onclick = "logout()" > 로그아웃 </a></div>`
      $('#loginForm').append(temp_html)
      element.innerHTML = '<div style = "color:#82ca9c; margin-top: 14px" ><a onclick = "logout()" > 로그아웃 </a></div>';
    }).fail(function () {
      reissueToken();
    });
  }

  function createChatRoom(productId) {
    $.ajax({
      type: 'POST',
      url: "http://localhost:8080/chatroom/" + productId,
      headers: { Authorization: userToken },
      success: function (response) {
        window.location = "/chatMessage.html"
      },
      error: function (xhr, status, error) {
        console.error(xhr);
      }
    });
  } // -> ?? 생각해보니까 product에 들어가야 함

  //구매 채팅 목록과 판매 채팅 목록으로 api를 나눴음
  function buyChatList() {
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
  
  function sellChatList() {
    $("#roomList").empty()
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/chatroom/sell',
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
  
  