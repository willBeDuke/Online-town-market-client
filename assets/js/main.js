"use strict";

import URL_VARIABLE from './export.js';

jQuery(document).ready(function ($) {

    if (localStorage.getItem('accessToken') != '' && localStorage.getItem('accessToken') != null) {
        getProfile();
    }
    // getproducts();

    getProducts(0);
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
var setUrl = "";
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
        // $('#loginForm').siblings('span.nickName').text(response.nickname + "님").parent('.loginForm').addClass('hasNickname');
        document.getElementById('loginbuttons').style.display = 'none';
        let temp_html =
            `<div class="card-body" style="display: flex; justify-content: center; align-items: center;">

            <a type="text" class="btn btn-dark small-button2" id = "addProduct" style="width: 100px; margin-top: -5px;margin-right: 30px;">상품등록하기</a>
            <a type="text" class="btn btn-dark small-button2" id = "userReport" style="width: 100px; margin-top: -5px; margin-right: 40px; ">유저 신고하기</a>
            <a type="text" class="btn btn-dark small-button2" id = "addressCertified" style="width: 100px; margin-top: -5px; margin-right: 40px; ">동네 수정하기</a>
            <a type="text" class="btn btn-dark small-button2" id="townBoards" style="width: 100px; margin-top: -5px; margin-right: 40px; ">동네 생활</a>

        </div>
        <li class="dropdown dropdown-large" style="margin-top: 13px; margin-right: 10px">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" style = "color:black">${nickname}님 <b class="caret"></b></a>
        <ul class="dropdown-menu dropdown-menu-end" >
            <li class="col-sm-6">


                <ul>
                    <li class="dropdown-header">${nickname}님</li>
                    <li><a href="myinfo.html">내정보</a></li>
                    <li><a href="purchaseList.html">구매상품</a></li>
                    <li><a href="salesPage.html">판매상품</a></li>
                    <li><a href="chatroom.html">구매채팅</a></li>
                    <li><a href="SellChatRoom.html">판매채팅</a></li>
                    <li><a href="myinterest.html">관심목록</a></li>
                </ul>

            </li>               
        </ul>      
    </li>
    <div style = "color:#82ca9c; margin-left 10px; margin-top: 14px" ><a id="logout"> 로그아웃 </a></div>`
        $('#loginForm').append(temp_html)

        $("#createaddProduct").click(function () {
            addProduct();
        });

        $("#createuserReport").click(function () {
            userReport();
        });

        $("#createaddressCertified").click(function () {
            addressCertified();
        });

        $("#logout").click(function () {

            logout();

        });

        $("#townBoards").click(function () {
            townBoards();
        })

        $("#addProduct").click(function () {
            addProduct();
        })

        $("#userReport").click(function () {
            userReport();
        })


        $("#addressCertified").click(function () {
            addressCertified();
        })
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
        alert("로그인 해 주세요")
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
// const searchParams = new URLSearchParams(window.location.search);
// const username = searchParams.get('username');
// const role = searchParams.get('role');

// $(document).ready(function () {
//     username !== " " && imp()
// })

// function imp() {
//     console.log(username, role);

//     const settings = {
//         "url": `https://api.knock-knock.shop/users/login-username?username=${username}&role=${role}`,
//         "method": "POST",
//         "timeout": 0,
//         "headers": {
//             "Content-Type": "application/json"
//         },
//         "data": JSON.stringify({}),
//     };

//     $.ajax(settings).done(function (response, status, xhr) {
//         localStorage.setItem('accessToken', xhr.getResponseHeader('Authorization'))
//         localStorage.setItem('refreshToken', xhr.getResponseHeader('Refresh'))
//         location.href = "index.html";
//     }).fail(function (response) {
//         console.log(response.responseJSON)
//         // if (response.responseJSON.statusCode === 400 || response.responseJSON.statusCode === 401)
//         //     alert("아이디나 비밀번호를 다시 확인해주세요")
//     });
// }

// function getProducts(page) {
//     $.ajax({
//       url: URL_VARIABLE + "products",
//       type: 'GET',
//       data: {
//             "page": page,
//             "size": 9,
//             "sortBy":"createdAt",
//             "isAsc":false
//       },
//       success: function(response) {
//         // 페이징된 객체에서 제품 정보를 추출하여 테이블에 추가합니다.
//         var products = response.content;
//         // var tbody = $('#profile-grid tbody');
//         // tbody.empty();
//         $('#profile-grid').empty();
//         for (var i = 0; i < products.length; i++) {
//           let productName =  products[i].productName;
//           let productPrice = products[i].productPrice;
//           let productId = products[i].productId;


//           let temp_html = `<div class="col-sm-4 col-xs-12 profile">
// 		        <div class="panel panel-default">
// 		          <div onclick = "getProduct(${productId})" class="panel-thumbnail">
// 		          	<a  title="image 1" class="thumb">
//                       <img src="//dummyimage.com/900x350.png/c0c0c0&amp;text=image0x201" class="img-responsive img-rounded" data-toggle="modal" data-target=".modal-profile-lg">
// 		          	</a>
// 		          </div>
// 		          <div class="panel-body">
// 		            <p class="profile-name">${productName}</p>
// 		            <p>${productPrice}</p>
// 		          </div>
// 		        </div>
// 		    </div>`

//           $('#profile-grid').append(temp_html);
//         }
//         // 페이징 정보를 추출하여 페이지네이션을 생성합니다.
//         var totalPages = response.totalPages;
//         var pageNumber = response.number;
//         var ul = $('#pagination');
//         ul.empty();
//         for (var i = 0; i < totalPages; i++) {
//           var li = $('<li>');
//           if (i == pageNumber) {
//             li.addClass('active');
//           }
//           var a = $('<a>').attr('href', '#').text(i + 1);
//           li.append(a);
//           ul.append(li);
//           $('#page_nation').append(ul);
//         }
//         // 페이지네이션 링크를 클릭했을 때, 해당 페이지의 제품 정보를 요청합니다.
//         $('#pagination a').click(function(event) {
//           event.preventDefault();
//           var page = $(this).text() - 1;
//           getProducts(page);
//         });
//       }
//     });
//   }

function getProducts(page) {

    $.ajax({
        url: URL_VARIABLE + "products",
        type: 'GET',
        data: {
            "page": page,
            "size": 9,
            "sortBy": "createdAt",
            "isAsc": false
        },
        success: function (response) {
            // 제품 정보를 추출하여 테이블에 추가합니다.
            var products = response.content;
            $('#profile-grid').empty();
            for (var i = 0; i < products.length; i++) {
                let productImg = products[i].productImg ? products[i].productImg : "//dummyimage.com/900x350.png/c0c0c0&amp;text=image0x201";
                let productName = products[i].productName;
                let productPrice = products[i].productPrice;
                let productId = products[i].productId;

                let temp_html = `<div class="col-sm-4 col-xs-12 profile">
                    <div class="panel panel-default">
                      <div id="creategetProduct" productId="${productId}" class="panel-thumbnail">
                        <a title="image 1" class="thumb">
                          <img src=${productImg} style="width: 100%; height: 150px;" class="img-responsive img-rounded" data-toggle="modal" data-target=".modal-profile-lg">
                        </a>
                      </div>
                      <div class="panel-body" id="creategetProduct2" productId="${productId}">
                        <p class="profile-name">${productName}</p>
                        <p>${productPrice}</p>
                      </div>
                    </div>
                  </div>`;

                $('#profile-grid').append(temp_html);
            }
            $("div#creategetProduct").click(function () {
                // 클릭한 div 요소의 productId 값을 가져옵니다.
                var productId = $(this).attr("productId");
                // getProduct 함수에 productId 값을 전달합니다.
                getProduct(productId);
            });

            $("div#creategetProduct2").click(function () {
                // 클릭한 div 요소의 productId 값을 가져옵니다.
                var productId = $(this).attr("productId");
                // getProduct 함수에 productId 값을 전달합니다.
                getProduct(productId);
            });

            var totalPages = response.totalPages;
            var pageNumber = response.number;

            var ul = $('#pagination');
            ul.empty();

            // Add 'First' button
            var firstLi = $('<li>');
            var firstA = $('<a>').attr('href', '#').text('처음');
            firstLi.append(firstA);
            ul.append(firstLi);

            // Add numbered buttons
            var startIndex = Math.max(0, pageNumber - 2);
            var endIndex = Math.min(startIndex + 4, totalPages - 1);
            startIndex = Math.max(0, endIndex - 4);
            for (var i = startIndex; i <= endIndex; i++) {
                var li = $('<li>');
                if (i == pageNumber) {
                    li.addClass('active');
                }
                var a = $('<a>').attr('href', '#').text(i + 1);
                li.append(a);
                ul.append(li);
            }

            // Add 'Last' button
            var lastLi = $('<li>');
            var lastA = $('<a>').attr('href', '#').text('마지막');
            lastLi.append(lastA);
            ul.append(lastLi);

            // Add click event for 'First' button
            $('#pagination li:first-child a').click(function (event) {
                event.preventDefault();
                getProducts(0);
            });

            // Add click event for 'Last' button
            $('#pagination li:last-child a').click(function (event) {
                event.preventDefault();
                getProducts(totalPages - 1);
            });

            $('#page_nation').append(ul);

            $('#pagination a').click(function (event) {
                event.preventDefault();
                var page = $(this).text() - 1;
                getProducts(page);
            });
        }
    });
}
// 페이지 로드시, 첫 번째 페이지의 제품 정보를 요청합니다.


//   function getproducts(){
//     var settings = {
//         "url": URL_VARIABLE + "products",
//         "method": "GET",
//         "timeout": 0,
//         "headers": {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "http://127.0.0.1:5500"
//         },
//         "data": {
//           "page": 1,
//           "size": 10,
//           "isAsc":false
//         },
//       };

//       $.ajax(settings).done(function (response) {
//         console.log(response);
//       });
// }
function search() {
    var keyword = $('#search').val();
    if (keyword.length != 0) {
        localStorage.setItem('keyword', keyword)
        window.location.href = "search.html"
    }
}
function getProduct(productId) {
    window.location.href = `/product.html?productId=${productId}`
}
function addProduct() {
    let url = '/addProduct.html';

    let option = "width = 800, height = 800, top = 100, left = 200, location = no"
    window.open(url, '', option)
}

function userReport() {
    var url = '/userReport.html';

    var option = "width = 800, height = 800, top = 100, left = 200, location = no"
    window.open(url, '', option)
}

function addressCertified() {
    var url = '/address.html';

    var option = "width = 800, height = 800, top = 100, left = 200, location = no"
    window.open(url, '', option)
}


//click
$("#updatesearch").attr("onclick", "").click(function () {
    search(); // 클릭 시 실행할 코드
});




function townBoards() {
    window.location.href = '/board.html'
}

