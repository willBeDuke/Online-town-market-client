
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
  
  