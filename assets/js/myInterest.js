"use strict";

import URL_VARIABLE from './export.js';
jQuery(document).ready(function ($) {
    if(localStorage.getItem('accessToken') != '' && localStorage.getItem('accessToken') != null){
        getProfile();
    }
    getinterest(0);
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
        $("html, body").animate({scrollTop: 0}, 1000);
        return false;
    });


    //End
});

function getProfile(){
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
        let temp_html = `<li class="dropdown dropdown-large" style="margin-top: 13px; margin-right: 10px">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" style = "color:black">${nickname}??? </a>
        
        <ul class="dropdown-menu dropdown-menu-end" >
            <li class="col-sm-6">
            <ul>
            <li class="dropdown-header">${nickname}???</li>
            <li><a href="myinfo.html">?????????</a></li>
            <li><a href="purchaseList.html">????????????</a></li>
            <li><a href="salesPage.html">????????????</a></li>
            <li><a href="chatroom.html">????????????</a></li>
            <li><a href="SellChatRoom.html">????????????</a></li>
            <li><a href="myinterest.html">????????????</a></li>
            </ul>
            </li>               
        </ul>      
    </li>
    <div style = "color:#82ca9c; margin-left 10px; margin-top: 14px" ><a id = "logout" > ???????????? </a></div>`
    $('#loginForm').append(temp_html)
    $("#logout").click(logout);
      }).fail(function(){
        reissueToken();
});
}

function logout(){
    var settings = {
        "url": URL_VARIABLE + "users/logout",
        "method": "POST",
        "timeout": 0,
        "headers": {
        "Authorization": localStorage.getItem('accessToken'),
          "Refresh":localStorage.getItem('refreshToken')
        },
      }; 
      
      $.ajax(settings).done(function (response) {
        localStorage.setItem('accessToken','');
        window.location.reload();
      });
    
}
function reissueToken(){
    var settings = {
        "url": URL_VARIABLE + "refresh/regeneration",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Refresh":localStorage.getItem('refreshToken')
        },
      };
      
      $.ajax(settings).done(function (response,status,xhr) {
        localStorage.setItem('accessToken',xhr.getResponseHeader('Authorization'))
      }).fail(function(){
        alert("????????? ??? ?????????")
        localStorage.setItem('accessToken','');
        localStorage.setItem('refreshToken','');
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
        
        function getinterest(page) {
            $.ajax({
              url: URL_VARIABLE + "interest/list",
              type: 'GET',
              data: {
                    "page": page,
                    "size": 9,
                    "sortBy":"createdAt",
                    "isAsc":false
              },
              headers: {
                "Authorization": localStorage.getItem('accessToken')
              },
              success: function(response) {
                // ???????????? ???????????? ?????? ????????? ???????????? ???????????? ???????????????.
                console.log(response)
                var products = response.content;
                // var tbody = $('#profile-grid tbody');
                // tbody.empty();
                $('#info_box').empty();
                for (var i = 0; i < products.length; i++) {
                    let productImg = products[i].productImg ? products[i].productImg : "//dummyimage.com/900x350.png/c0c0c0&amp;text=image0x201";
                  let productName =  products[i].productName;
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
                $("div#creategetProduct").click(function() {
                    // ????????? div ????????? productId ?????? ???????????????.
                    var productId = $(this).attr("productId");
                    // getProduct ????????? productId ?????? ???????????????.
                    getProduct(productId);
                  });
        
                  $("div#creategetProduct2").click(function() {
                    // ????????? div ????????? productId ?????? ???????????????.
                    var productId = $(this).attr("productId");
                    // getProduct ????????? productId ?????? ???????????????.
                    getProduct(productId);
                  });
                // ????????? ????????? ???????????? ????????????????????? ???????????????.
                var totalPages = response.totalPages;
                var pageNumber = response.number;
                var ul = $('#pagination');
                ul.empty();
                for (var i = 0; i < totalPages; i++) {
                  var li = $('<li>');
                  if (i == pageNumber) {
                    li.addClass('active');
                  }
                  var a = $('<a>').attr('href', '#').text(i + 1);
                  li.append(a);
                  ul.append(li);
                  $('#page_nation').append(ul);
                }
                // ?????????????????? ????????? ???????????? ???, ?????? ???????????? ?????? ????????? ???????????????.
                $('#pagination a').click(function(event) {
                  event.preventDefault();
                  var page = $(this).text() - 1;
                  getProducts(page);
                });
              }, fail : function(){
                reissueToken();
              } 
            });
          }
          function getProduct(productId){
            localStorage.setItem('productId',productId)
            window.location.href = "product.html"
        }

        

        

     