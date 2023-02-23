// 토큰 불러오기
$(document).ready(function() {
  var ok = localStorage.getItem('accessToken');

  if (ok.length === 0) {
  console.error("userId 요소를 찾을 수 없습니다.");
  return;
  }
});

var productRequestDto = {
  "productName" : $("#productName").val(),
  "productPrice" :  $("#productPrice").val(),
  "productEnum" : $("#productEnum option:selected").val(),
  "productStatus" : $("#productStatus").val(),
  "productCategory" : $("#productCategory").val()
};

var productId = getProductIdFromUrl();

const userToken = localStorage.getItem('accessToken');

// 상품 등록하기
function addProduct() {

  $.ajax({
    type: "POST",
    url: 'http://localhost:8080/products',
    contentType: "application/json; charset=utf-8",
	  dataType: "json",
    headers: {
      Authorization: userToken
    },
    // xhrFields: { 
    // 	withCredentials: true // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
    // },
    data: JSON.stringify(productRequestDto),
    success : function(response) {
      console.log(response)
    }
  })


}

function getProduct(productId) {
  $.ajax({
    type: "GET", // Post? CORS에 맞춰 고치기
    url: "http://localhost:8080/products/" + productId,
    datatype: "json",
    data: {'id_give': productId},
    // headers: {
    //   Authorization: userToken
    // },
    success: function (response) {
      // 상세페이지 꾸미기 ~ 서비스에 맞춰 꾸미기
      $('#product-detail').empty();
      var productInfo = response.content;
      let temp_html = 
      `<div class="container-md">
        <div class="card-body">
          <p>${productInfo.productName}</p>
          <p>${productInfo.productPrice}</p>
          <p>${productInfo.productEnum}</p>
          <p>${productInfo.productStatus}</p>
          <p>${productInfo.productCategory}</p>
        </div>
      </div>`
      $('#product-detail').append(temp_html)
      console.log(response);
    }
  })
}


// 상품 수정하기
function updateproduct() {
  // checkProductInfo();

  $.ajax({
    type: "PUT",
    url: "http://localhost:8080/update/" + productId,
    datatype: "json",
    contentType: "application/json; charset=UTF-8",
    data : {"id_give": productId}, 
    data : JSON.stringify(productRequestDto),
    headers: {Authorization: userToken},
    success : function(response) {
      console.log(response)
    }
  })
}

// 상품 삭제하기
function deleteProduct() {
  $.ajax({
    type: "DELETE",
    url: "http://localhost:8080/" + productId,
    data: {'id_give': productId},
    headers: {Authorization: userToken},
    success: function(response) {
      console.log(response)
    }
  })
}

  // 상품 정보 유효성 검사
// function checkProductInfo() {
// if (productRequestDto.productName == "") {
//   alert("상품명을 입력해주세요");
//   productRequestDto.productName.focus();
// } 
// if (productRequestDto.productPrice == "") {
//   alert("상품 가격을 입력해주세요");
//   productRequestDto.productPrice.focus();
// } 
// if (productRequestDto.productStatus == "") {
//   alert("상품의 품질 상태를 입력해주세요");
// } 
// if (productRequestDto.productCategory == "") {
//   alert("상품의 카테고리를 입력해주세요");
// }
// }

// URL에서 Id값 가져오기
function getProductIdFromUrl() {
  // Get the URL parameters
  const urlParams = new URLSearchParams(window.location.search);

  // Get the product ID parameter
  return urlParams.get('productId');
}