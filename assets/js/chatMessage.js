import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

$(function() {
    // WebSocket 연결
    var socket = new SockJS('/ws');
    var stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
      console.log('Connected: ' + frame);
    });

    // 웹소켓 연결 후, 구독할 경로를 등록합니다.
    stompClient.connect({}, function() {
      stompClient.subscribe('/sub/receive/' + receiver + '/product' + productId, function(message) {
        // 메시지가 도착하면, 이곳에서 처리합니다.
        var chatMessage = JSON.parse(message.body);
        if (chatMessage.sender === sender) {
          // 보내는 사람의 메시지
          $("#message").append('<li class="right"><div id="sender" class="sender">' + chatMessage.sender + '</div><div class="message">' + chatMessage.message + '</div></li>');
        } else {
          // 받는 사람의 메시지
          $("#message").append('<li class="left"><div id="receiver" class="receiver">' + chatMessage.receiver + '</div><div class="receiverMessage">' + chatMessage.message + '</div></li>');
        }
      });
    });

    // 메시지를 보내는 함수
    function sendMessage() {
        var message = $('textarea').val();
        var data = {
          roomId: roomId,
          productId: productId,
          sender: sender,
          receiver: receiver,
          message: message
        };
        stompClient.send("/pub/send", {}, JSON.stringify(data));
      }

    $("textarea").keypress(function (e) {
        // Enter key pressed
        if (e.keyCode == 13) {
          e.preventDefault();
          sendMessage();
        }
    });
});
