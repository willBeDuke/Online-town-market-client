"use strict";

import URL_VARIABLE from './export.js';
jQuery(document).ready(function ($) {
    if (localStorage.getItem('accessToken') != '' && localStorage.getItem('accessToken') != null) {
        getProfile();
    }
    getUserInfo();
    $("#longinForm").empty();
    $("#longinForm").append('loginform')


    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    $('#navbar-collapse').find('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 40)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });

    /*---------------------------------------------*
     * For Price Table
     ---------------------------------------------*/

    checkScrolling($('.cd-pricing-body'));
    $(window).on('resize', function () {
        window.requestAnimationFrame(function () {
            checkScrolling($('.cd-pricing-body'))
        });
    });
    $('.cd-pricing-body').on('scroll', function () {
        var selected = $(this);
        window.requestAnimationFrame(function () {
            checkScrolling(selected)
        });
    });

    function checkScrolling(tables) {
        tables.each(function () {
            var table = $(this),
                totalTableWidth = parseInt(table.children('.cd-pricing-features').width()),
                tableViewport = parseInt(table.width());
            if (table.scrollLeft() >= totalTableWidth - tableViewport - 1) {
                table.parent('li').addClass('is-ended');
            } else {
                table.parent('li').removeClass('is-ended');
            }
        });
    }

    //switch from monthly to annual pricing tables
    bouncy_filter($('.cd-pricing-container'));

    function bouncy_filter(container) {
        container.each(function () {
            var pricing_table = $(this);
            var filter_list_container = pricing_table.children('.cd-pricing-switcher'),
                filter_radios = filter_list_container.find('input[type="radio"]'),
                pricing_table_wrapper = pricing_table.find('.cd-pricing-wrapper');

            //store pricing table items
            var table_elements = {};
            filter_radios.each(function () {
                var filter_type = $(this).val();
                table_elements[filter_type] = pricing_table_wrapper.find('li[data-type="' + filter_type + '"]');
            });

            //detect input change event
            filter_radios.on('change', function (event) {
                event.preventDefault();
                //detect which radio input item was checked
                var selected_filter = $(event.target).val();

                //give higher z-index to the pricing table items selected by the radio input
                show_selected_items(table_elements[selected_filter]);

                //rotate each cd-pricing-wrapper 
                //at the end of the animation hide the not-selected pricing tables and rotate back the .cd-pricing-wrapper

                if (!Modernizr.cssanimations) {
                    hide_not_selected_items(table_elements, selected_filter);
                    pricing_table_wrapper.removeClass('is-switched');
                } else {
                    pricing_table_wrapper.addClass('is-switched').eq(0).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
                        hide_not_selected_items(table_elements, selected_filter);
                        pricing_table_wrapper.removeClass('is-switched');
                        //change rotation direction if .cd-pricing-list has the .cd-bounce-invert class
                        if (pricing_table.find('.cd-pricing-list').hasClass('cd-bounce-invert'))
                            pricing_table_wrapper.toggleClass('reverse-animation');
                    });
                }
            });
        });
    }
    function show_selected_items(selected_elements) {
        selected_elements.addClass('is-selected');
    }

    function hide_not_selected_items(table_containers, filter) {
        $.each(table_containers, function (key, value) {
            if (key != filter) {
                $(this).removeClass('is-visible is-selected').addClass('is-hidden');

            } else {
                $(this).addClass('is-visible').removeClass('is-hidden is-selected');
            }
        });
    }


    /*---------------------------------------------*
     * STICKY scroll
     ---------------------------------------------*/

    $.localScroll();



    // scroll Up

    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });
    $('.scrollup').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });


    //End
});

function getProfile() {
    var settings = {
        "url": URL_VARIABLE + "users/profile",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": localStorage.getItem('accessToken')
        },
    };
    $.ajax(settings).done(function (response) {
        const nickname = response.nickname;
        // $('#loginForm').siblings('span.nickName').text(response.nickname + "???").parent('.loginForm').addClass('hasNickname');
        document.getElementById('loginbuttons').style.display = 'none';
        let temp_html = `  
    <div style = "color:#82ca9c; margin-left 10px; margin-top: 14px" ><a id= "logout"> ???????????? </a></div>`
        $('#container').append(temp_html)
        $("#logout").click(logout);
    }).fail(function () {       
        reissueToken();
    });
}

function logout() {
    var settings = {
        "url": URL_VARIABLE + "users/logout",
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
function reissueToken() {
    var settings = {
        "url": URL_VARIABLE + "refresh/regeneration",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Refresh": localStorage.getItem('refreshToken')
        },
    };

    $.ajax(settings).done(function (response, status, xhr) {
        localStorage.setItem('accessToken', xhr.getResponseHeader('Authorization'))
    }).fail(function () {
        alert("????????? ??? ?????????")
        localStorage.setItem('accessToken', '');
        localStorage.setItem('refreshToken', '');
    });
}


// function getproducts(){
//     var settings = {
//         "url": URL_VARIABLE + "products/get",
//         "method": "POST",
//         "timeout": 0,
//         "headers": {
//           "Content-Type": "application/json"
//         },
//         "data": JSON.stringify({
//           "page": 1,
//           "size": 10,

//         }),
//       };

//       $.ajax(settings).done(function (response) {
//         console.log(response);
//       });
// }
const searchParams = new URLSearchParams(window.location.search);
const username = searchParams.get('username');
const role = searchParams.get('role');

$(document).ready(function () {
    username !== " " && imp()
})

function imp() {
    console.log(username, role);

    const settings = {
        "url": URL_VARIABLE + `users/login-username?username=${username}&role=${role}`,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({}),
    };

    $.ajax(settings).done(function (response, status, xhr) {
        localStorage.setItem('accessToken', xhr.getResponseHeader('Authorization'))
        localStorage.setItem('refreshToken', xhr.getResponseHeader('Refresh'))
        location.href = "index.html";
    }).fail(function (response) {
        console.log(response.responseJSON)
        // if (response.responseJSON.statusCode === 400 || response.responseJSON.statusCode === 401)
        //     alert("???????????? ??????????????? ?????? ??????????????????")
    });
}
function getUserInfo() {
    var settings = {
        "url": URL_VARIABLE + "users/info",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": localStorage.getItem('accessToken')
        },
    };

    $.ajax(settings).done(function (response) {

        console.log(response);
        let img = response.img
        let email = response.email;
        let username = response.username;
        let nickname = response.nickname;
        let address = response.address[0].address;

        let temp_html = `<div class="info1" style="justify-content: flex-start; display: flex; flex-direction: column; margin-left: -200px; padding: 10px 0px 10px 0px;">
       <p>ID : ${username}</p>
       <p>nickname : ${nickname}</p>
       <p>email : ${email}</p>
       <p>address : ${address} </p>
       <p>Image : ${img}</p>
       <!-- Button trigger modal -->
       <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >
         ????????? ??????
       </button>
       
       <!-- Modal -->
       <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-sm">
           <div class="modal-content">
             <div class="modal-header">
               <h1 class="modal-title fs-5" id="exampleModalLabel">????????? ??????</h1>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div class="modal-body">
               <p>Loading...</p>
             </div>
           </div>
         </div>
       </div>
    </div>`
        $('#info_box').append(temp_html);
        $("#exampleModal .modal-body").load("/updateProfile.html");
    });
}

function updateProfilePopup() {
    var url = 'http://127.0.0.1:5500/updateProfile.html';
    var name = "????????? ????????????";
    var option = "width = 800, height = 800, top = 100, left = 200, location = no"
    window.open(url, name, option)
}



