import URL_VARIABLE from './export.js';

$(document).ready(function () {
  var ok = localStorage.getItem('accessToken');

  if (ok.length === 0) {
    console.error("userId 요소를 찾을 수 없습니다.");
    return;
  }
});



const userToken = localStorage.getItem('accessToken');

// 사진 등록하기
$('#uploadPhoto').click(function(event) {
  event.preventDefault();
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


function addProduct() {
  var settings = {
    "url": URL_VARIABLE + "products",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Authorization": userToken,
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
    "productImg": $("#image-url").val(),
    "productName": $("#productName").val(),
    "productPrice": $("#productPrice").val(),
    "productEnum": $("#productEnum option:selected").val(),
    "productStatus": $("#productStatus option:selected").val(),
    "productCategory": $("#productCategory option:selected").val()
    }),
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    alert("등록 완료");
    window.location.href = "index.html"
  }).fail(function(response){
    alert("상품을 등록하는데 실패하였습니다. 입력하신 내용을 다시 확인해 주세요");
  });
}


//click
$("#addProductButton").click(addProduct);



