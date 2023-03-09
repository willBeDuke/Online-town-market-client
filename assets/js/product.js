import URL_VARIABLE from './export.js';

$(document).ready(function () {
  var ok = localStorage.getItem('accessToken');

  if (ok.length === 0) {
    console.error("userId 요소를 찾을 수 없습니다.");
    return;
  }
});

// var productRequestDto = {
//   "productId": $("#productId").val(),
//   "productName": $("#productName").val(),
//   "productPrice": $("#productPrice").val(),
//   "productEnum": $("#productEnum option:selected").val(),
//   "productStatus": $("#productStatus").val(),
//   "productCategory": $("#productCategory").val()
// };

var productId = getProductIdFromUrl();

const userToken = localStorage.getItem('accessToken');

// 사진 등록하기
$('#uploadPhoto').click(function() {
  var fileInput = document.getElementById("fileInput");
  var file = fileInput.files[0];
  var formData = new FormData();
  formData.append("product", file);
  
  $.ajax({
    url: URL_VARIABLE + "api/images/upload/products",
    type: 'POST',
    data: formData,
    headers: {
      Authorization: userToken
    },
    processData: false,
    contentType: false,
    success: function(response) {
      console.log(response)
      document.getElementById("image-url").value = response
      let image_preview = response 
      let temp_html = `<img src=${image_preview} style="width: 300px; height: 300px;">`
      
      $('#image-preview').append(temp_html);
    },
    error: function() {
      alert("An error occurred while uploading the file.");
    }
  });
});

// 상품 등록하기
function addProduct() {
  var productRequestDto = {
    "productImg": $("#image-url").val(),
    "productName": $("#productName").val(),
    "productPrice": $("#productPrice").val(),
    "productEnum": $("#productEnum option:selected").val(),
    "productStatus": $("#productStatus option:selected").val(),
    "productCategory": $("#productCategory option:selected").val()
  };

  $.ajax({
    type: "POST",
    url: URL_VARIABLE + 'products',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: userToken
    },
    // xhrFields: { 
    // 	withCredentials: true // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
    // },
    data: JSON.stringify(productRequestDto),
    success: function (response) {
      console.log(response)
      alert("상품 생성이 완료되었습니다");

    }
  })
}

// function getProduct(productId) {
//   $.ajax({
//     type: "GET", // Post? CORS에 맞춰 고치기
//     url: URL_VARIABLE + "products/" + productId,
//     datatype: "json",
//     data: {'id_give': productId},
//     // headers: {
//     //   Authorization: userToken
//     // },
//     success: function (response) {
//       // 상세페이지 꾸미기 ~ 서비스에 맞춰 꾸미기
//       $('#product-detail').empty();
//       var productInfo = response.content;
//       let temp_html = 
//       `<div class="container-md">
//         <div class="card-body">
//           <p>${productInfo.productName}</p>
//           <p>${productInfo.productPrice}</p>
//           <p>${productInfo.productEnum}</p>
//           <p>${productInfo.productStatus}</p>
//           <p>${productInfo.productCategory}</p>
//         </div>
//       </div>`
//       $('#product-detail').append(temp_html)
//       console.log(response);
//     }
//   })
// }
function getProduct(productId) {
  $.ajax({
    type: "GET", // Post? CORS에 맞춰 고치기
    url: URL_VARIABLE + "products/" + productId,
    datatype: "json",
    data: { 'id_give': productId },
    // headers: {
    //   Authorization: userToken
    // },
    success: function (response) {
      // 상세페이지 꾸미기 ~ 서비스에 맞춰 꾸미기
      console.log("상품쓰" + response)
      $('#product-detail').empty();
      var productInfo = response.content;
      let temp_html =
        `<div class="container-md">
        <div class="card-body">

          <p>${productInfo.productId}</p>
          <p>${productInfo.productName}</p>
          <p>${productInfo.productPrice}</p>
          <p>${productInfo.productEnum}</p>
          <p>${productInfo.productStatus}</p>
          <p>${productInfo.productCategory}</p>
          <p>${productInfo.viewCount}</p>
        </div>
        <button  type="button" class="btn btn-dark" data-product-id="${productId}" id="createChatRoom">판매자와 채팅하기</button>
      </div>`
      $('#product-detail').append(temp_html)
      $("#createChatRoom").click(function() {
        // 클릭 시 실행할 함수 정의
        var productId = $(this).data("product-id"); // 현재 버튼의 data-product-id 값을 가져옵니다.
        createChatRoom(productId); // createChatRoom 함수에 파라미터로 전달합니다.
      });
      console.log(response);
    }
  })
}

// // 상품 수정하기
// function updateproduct() {
//   // checkProductInfo();

//   $.ajax({
//     type: "PUT",
//     url: URL_VARIABLE + "update/" + productId,
//     datatype: "json",
//     contentType: "application/json; charset=UTF-8",
//     data: { "id_give": productId },
//     data: JSON.stringify(productRequestDto),
//     headers: { Authorization: userToken },
//     success: function (response) {
//       console.log(response)
//     }
//   })
// }

// // 상품 삭제하기
// function deleteProduct() {
//   $.ajax({
//     type: "DELETE",
//     url: URL_VARIABLE + "" + productId,
//     data: { 'id_give': productId },
//     headers: { Authorization: userToken },
//     success: function (response) {
//       console.log(response)
//     }
//   })
// }

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

//click
$("#addProduct").click(addProduct);



