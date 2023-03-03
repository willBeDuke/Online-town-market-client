const userToken = localStorage.getItem('accessToken');

function reportUser() {
    var settings = {
        "url": "http://localhost:8080/report/user",
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
        "url": "http://localhost:8080/report/product",
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
            alert("입력하신 정보를 다시 확인해 주세요")
    });
}

function closeWindow() {
    var returnValue = confirm("창을 닫으시겠습니까?");
     alert(returnValue)
     window.close();
    }