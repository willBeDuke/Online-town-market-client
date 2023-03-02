
const userToken = localStorage.getItem('accessToken');

$('#upload-button').click(function () {
    var fileInput = document.getElementById("image-input");
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append("product", file);
    $.ajax({
        url: "http://localhost:8080/api/images/upload/profiles",
        type: 'POST',
        data: formData,
        headers: {
            Authorization: userToken
        },
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response)
        },
        error: function () {
            // alert("An error occurred while uploading the file.");
        }
    });
});

function updateProfile() {
var imgUrl = $("#image-url").val() || null;
var profileRequestDto = {
    "image-url": imgUrl,
    "nickname": $("#nickname").val()
};

$.ajax({
    url: "http://localhost:8080/users/profile/update",
    type: 'Patch',
    data: JSON.stringify(profileRequestDto),
    headers: {
        Authorization: userToken
    },
    contentType: 'application/json',
    success: function (response) {
        console.log(response);
        location.href = "index.html";
    },
    error: function () {
        // alert("An error occurred while uploading the file.");s
    }
});
}
