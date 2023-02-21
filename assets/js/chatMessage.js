
/*
위 코드에서 Stomp.js 라이브러리를 사용하여 WebSocket 연결을 설정하고, 
stompClient.subscribe() 함수를 호출하여 서버로부터 메시지를 받을 때마다 실행될 콜백 함수를 등록합니다. 
이후 sendMessage() 함수를 호출하여 새로운 메시지를 전송하며, onMessageReceived() 함수를 통해 새로운 메시지가 도착하면 화면에 표시할 수 있습니다. 
마지막으로, 페이지가 로드될 때 connect() 함수를 호출하여 WebSocket 연결을 설정합니다.
*/

// STOMP 클라이언트 객체 생성
const stompClient = Stomp.client("ws://localhost:8080/chat");

// STOMP 클라이언트 연결
stompClient.connet({}, function(){
  console.log("stomp 연결 성공")
})

// 메시지 구독
stompClient.subscribe()




// WebSocket 연결
var socket = new SockJS('ws://localhost:8080/chat');

// STOMP 클라이언트 생성
// var stompClient = Stomp.over(socket);

// STOMP 연결
stompClient.connect({}, function(frame) {
  console.log('Connected: ' + frame);
  
  // 채팅방 입장
  stompClient.subscribe('/topic/room/' + roomId, function(message) {
    showMessage(JSON.parse(message.body));
  });
});

// 메시지 전송
function sendMessage() {
  var message = {
    sender: $('#sender').text(),
    receiver: $('#receiver').text(),
    message: $('textarea').val(),
    productId: $('#productId').text()
  };
  stompClient.send('/app/chat', {}, JSON.stringify(message));
}

// 메시지 표시
function showMessage(message) {
  var $message = $('.chat.format ul li').clone();

  $message.find('.sender span').text(message.sender);
  $message.find('.message span').text(message.message);

  $('.chat ul').append($message);
  $('textarea').val('');
}
