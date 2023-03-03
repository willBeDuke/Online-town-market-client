
const userToken = localStorage.getItem('accessToken');

function uploadImage() {
    var fileInput = document.getElementById("image-input");
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append("profile", file);
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
            document.getElementById("image-url").value = response;
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
    //     url: "http://localhost:8080/api/images/upload/profiles",
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
