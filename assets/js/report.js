import URL_VARIABLE from './export.js';

const userToken = localStorage.getItem('accessToken');

function reportUser() {
    var settings = {
        "url": URL_VARIABLE + "report/user",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Authorization": userToken

        },
        "data": JSON.stringify({
            "reportedUserName": $('#reportedUserName').val(),
            "reportEnum": $('#reportEnum').val(),
            "reason": $('#reason').val()
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        alert("신고 완료");
        closeWindow();
    }).fail(function (response) {
        if (response.responseJSON.statusCode === 400 || response.responseJSON.statusCode === 401)
            alert("입력하신 정보를 다시 확인해 주세요")
    });
}


function reportProducts() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const productId = urlSearchParams.get('productId');
    var settings = {
        "url": URL_VARIABLE + "report/product",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Authorization": userToken

        },
        "data": JSON.stringify({
            "reportEnum": $('#reportEnum').val(),
            "reason": $('#reason').val(),
            "productId": productId
        }),
    };

    $.ajax(settings).done(function (response) {
        alert("신고 완료");
        closeWindow();
    }).fail(function (response) {
        if (response.responseJSON.statusCode === 400 || response.responseJSON.statusCode === 401)
            alert("중복된 신고거나 신고에 실패했습니다")
    });
}

function closeWindow() {
    var returnValue = confirm("창을 닫으시겠습니까?");
     alert(returnValue)
     window.close();
    }

    $("#updatereportProducts").click(function() {
        // reportProducts 함수를 실행합니다.
        reportProducts();
      });

      $("#reportUser").click(reportUser);