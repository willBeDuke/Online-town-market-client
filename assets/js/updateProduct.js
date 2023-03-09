import URL_VARIABLE from './export.js';
  
  // 현재 URL의 쿼리 문자열을 가져옵니다.
  const queryString = window.location.search;

  // URLSearchParams 객체를 생성합니다.
  const params = new URLSearchParams(queryString);
  
  // "productId"의 값을 가져와서 숫자로 변환합니다.
  const productId = parseInt(params.get("productId"));

  const userToken = localStorage.getItem('accessToken');


function updateProduct() {
    console.log(productId)

    console.log(
        $("#productName").val(),
        $("#productPrice").val(),
        $("#productEnum").val(),
        $("#productStatus").val(),
        $("#productCategory").val()
    )
    
    let productRequestDto = {
        "productName": $("#productName").val(),
        "productPrice": $("#productPrice").val(),
        "productEnum": $("#productEnum").val(),
        "productStatus": $("#productStatus").val(),
        "productCategory": $("#productCategory").val()
    };
    $.ajax({
        type: "PUT",
        url: URL_VARIABLE + "products/update/" +productId,
        headers: {
            Authorization: userToken
        },
        contentType: "application/json",
        data: JSON.stringify(productRequestDto),
        dataType: "json",
        
    })
    
        .done(function (data) {
            alert("수정이 완료되었습니다.");
            window.close();
            window.opener.location.reload();
        })

        .fail(function (xhr, textStatus, errorThrown) {
            alert("권한이 없습니다.");
        })

}
