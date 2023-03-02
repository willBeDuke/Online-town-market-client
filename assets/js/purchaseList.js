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
                <li><a href="#">구매상품</a></li>
                <li><a href="#">판매상품</a></li>
                <li><a href="chatroom.html">구매채팅</a></li>
                <li><a href="SellChatRoom.html">판매채팅</a></li>
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

function getPurchaseList() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/trade/purchase',
        headers: { Authorization: userToken },
        dataType: 'json',
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let productImg = response[i]['productImg'];
                let productName = response[i]['productName'];
                let seller = response[i]['username'];

                let temp_html = `<div class="container-fluid" style="margin-left: 300px; margin-right: 300px;">
                                    <div class="row" id="profile-grid" style="margin-top: 30px;">
                                        <div class="col-sm-4 col-xs-12 profile">
                                            <div class="panel panel-default">
                                                <div onclick="getProduct(${productImg})" class="panel-thumbnail">
                                                    <a title="image 1" class="thumb">
                                                        <img src="//dummyimage.com/900x350.png/c0c0c0&amp;text=image0x201"
                                                            class="img-responsive img-rounded" data-toggle="modal"
                                                            data-target=".modal-profile-lg">
                                                    </a>
                                                </div>
                                                <div class="panel-body">
                                                    <p class="profile-name">${productName}</p>
                                                    <p>${seller}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="page_wrap">
                                        <div id="page_nation">
                                            <ul id="pagination">
                                            </ul>
                                        </div>
                                    </div>
                                </div>`
                $('#purchaseList').append(temp_html);
            }

            var totalPages = response.totalPages;
            var pageNumber = response.number;
                            
            var ul = $('#pagination');
            ul.empty();
                            
            // Add 'First' button
            var firstLi = $('<li>');
            var firstA = $('<a>').attr('href', '#').text('처음');
            firstLi.append(firstA);
            ul.append(firstLi);
            
            // Add numbered buttons
            var startIndex = Math.max(0, pageNumber - 2);
            var endIndex = Math.min(startIndex + 4, totalPages - 1);
            startIndex = Math.max(0, endIndex - 4);
            for (var i = startIndex; i <= endIndex; i++) {
              var li = $('<li>');
              if (i == pageNumber) {
                li.addClass('active');
              }
              var a = $('<a>').attr('href', '#').text(i + 1);
              li.append(a);
              ul.append(li);
            }
            
            // Add 'Last' button
            var lastLi = $('<li>');
            var lastA = $('<a>').attr('href', '#').text('마지막');
            lastLi.append(lastA);
            ul.append(lastLi);
                 
            // Add click event for 'First' button
            $('#pagination li:first-child a').click(function(event) {
                event.preventDefault();
                getProducts(0);
            });
            
            // Add click event for 'Last' button
            $('#pagination li:last-child a').click(function(event) {
                event.preventDefault();
                getProducts(totalPages - 1);
            });
            
            $('#page_nation').append(ul);
            
            $('#pagination a').click(function(event) {
                event.preventDefault();
                var page = $(this).text() - 1;
                getProducts(page);
            });
        },
        error: function (xhr, status, error) {
            console.error(xhr);
        }
    });
}