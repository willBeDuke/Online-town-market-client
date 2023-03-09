import URL_VARIABLE from './export.js';
const userToken = localStorage.getItem('accessToken');

function uploadImage() {
    var fileInput = document.getElementById("image-input");
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append("profile", file);
    $.ajax({
        url: URL_VARIABLE + "api/images/upload/profiles",
        type: 'POST',
        data: formData,
        headers: {
            Authorization: userToken
        },
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response)
            window.open('', '_self', ''); 
            window.close();
        },
        error: function () {
            // alert("An error occurred while uploading the file.");
        }
    });
}

// $('#upload-button').click(function () {
    // var fileInput = document.getElementById("image-input");
    // var file = fileInput.files[0];
    // var formData = new FormData();
    // formData.append("profile", file);
    // $.ajax({
    //     url: URL_VARIABLE + "api/images/upload/profiles",
    //     type: 'POST',
    //     data: formData,
    //     headers: {
    //         Authorization: userToken
    //     },
    //     processData: false,
    //     contentType: false,
    //     success: function (response) {
    //         console.log(response)
    //         document.getElementById("image-url").value = response.s;
    //     },
    //     error: function () {
    //         // alert("An error occurred while uploading the file.");
    //     }
    // });
// });

function updateProfile() {
const imgUrl = $("#image-url").val() ? $("#image-url").val() : null;

const profileRequestDto = {
    "img_url": imgUrl,
    "nickname": $("#nickname").val()
};

$.ajax({
    url: URL_VARIABLE + "users/profile/update",
    type: 'PATCH',
    data: JSON.stringify(profileRequestDto),
    headers: {
        Authorization: userToken
    },
    contentType: 'application/json',
    success: function (response) {
        console.log(response)
    //    closeWindow();
    },
    error: function () {
        // alert("An error occurred while uploading the file.");s
    }
});
}

function closeWindow() {
    var returnValue = confirm("창을 닫으시겠습니까?");
     alert(returnValue)
     window.close();
    }

    $("#upload-button").click(uploadImage);
    $("#updateProfile").click(updateProfile);

