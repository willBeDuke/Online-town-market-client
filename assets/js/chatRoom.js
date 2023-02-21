
// 채팅 만들기
function createChat(){
  $.ajax({
    url: "/chatroom/" + productId,
    type: "POST",
    success: function(data) {
      console.log(data);
      $("#chat").show();
    },
    error: function(xhr, status, error) {
      console.error(error);
    }
  });
}



// 토큰 불러오기
$(document).ready(function() {
  const ok = localStorage.getItem('accessToken')

  if (ok.length === 0) {
    console.error("userId 요소를 찾을 수 없습니다.");
    return;
  }

  chatList();
});

// 채팅 보기
const userToken = localStorage.getItem('accessToken') 
// let 변경 가능, const 변경불가능; -> 개발자

function chatView(roomId,nickname){
  
  $.ajax({
    url: "http://localhost:8080/chatroom" + roomId,
    type: "GET",
    data: {nickname:nickname},
    dataType: "json",
    headers: {
      Authorization: userToken},
    success: function(data) {
      $("#chatMessage").show();
      console.log(data);
      
    },
    error: function(xhr, status, error) {
      console.error(error);
    }
  })
  }


  // 채팅리스트
  function chatList(){
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/chatrooms',
      headers: {
        Authorization: userToken},
      dataType:'json',
      success: function(response) {
        console.log(response);
        // 가져온 데이터로 채팅 리스트를 렌더링합니다.
        var roomList = response.roomList;
    
        // 가져온 채팅방 리스트를 동적으로 추가합니다.
        for (let i = 0; i < roomList.length; i++) {
          let profileImg = roomList[i]['profileImg'];
          let nickname = roomList[i]['nickname'];
          let region = roomList[i]['region'];
          let productName = roomList[i]['productName'];
          let roomId = roomList[i]['roomId'];
          console.log(profileImg, nickname, region, productName, roomId)
    
          let temp_html = `
          <li>
            <a onclick="chatView(${roomId}, ${nickname})">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td class="profile_td">
                    <img src="${profileImg}" alt="userImg"/>
                  </td>
                  <td class="chat_td">
                    <div class="nickname">
                      ${nickname}
                    </div>
                    <div class="region">
                      ${region}
                    </div>
                  </td>
                  <td class="product_td">
                    <div class="productName">
                      ${productName}
                    </div>
                    <div class="check">
                      <p></p>
                    </div>
                  </td>
                </tr>
              </table>
            </a>
          </li>
        `;
        
            // 새로 생성한 HTML 코드를 DOM에 추가합니다.
            $('#roomList').append(temp_html);
          }
        },
        error: function (xhr, status, error) {
          console.error(xhr);
        }
      });    
  }
