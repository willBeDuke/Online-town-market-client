
const userToken = localStorage.getItem('accessToken');
const urlSearchParams = new URLSearchParams(window.location.search);
const productId = urlSearchParams.get('productId');


jQuery(document).ready(function ($) {
    if (localStorage.getItem('accessToken') != '' && localStorage.getItem('accessToken') != null) {
        getProfile();
    }
    // const productId = localStorage.getItem('productId')
    // window.localStorage.removeItem('productId');


    // const geProductId = "";
    // getProductId()
    // window.history.pushState("데이터", "제목", `/product.html?productId=${productId}`);


    const urlSearchParams = new URLSearchParams(window.location.search);
    const productId = urlSearchParams.get('productId');
    getProductInfo(productId);
    checkInterest();
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

function checkInterest() {
    var settings = {
        "url": "http://localhost:8080/interest/check/" + productId,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": localStorage.getItem('accessToken')
        },
    };
    $.ajax(settings).done(function (response) {

        if (response == true) {
            const div = document.getElementById('interested');
            div.remove();
            let temp_html = `<div class="card-body" id = "interested" style="display: flex; justify-content: center; margin-top:50px;align-items: center;">
    <button type="button" class="btn btn-light small-button" style="margin-right:10px" onclick="checkMyProductInterest(${productId})">관심취소</button>
    <button type="button" class="btn btn-light small-button2" onclick="checkMyProductChat(${productId})">판매자와 채팅하기</button>
   </div>`
            $('#info_box').append(temp_html);
        }
    });
}


function getProfile() {
    var settings = {
        "url": "http://localhost:8080/users/profile",
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
        let temp_html = `<li class="dropdown dropdown-large" style="margin-top: 13px; margin-right: 10px">
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
    <div style = "color:#82ca9c; margin-left 10px; margin-top: 14px" ><a onclick = "logout()" > 로그아웃 </a></div>`
        $('#loginForm').append(temp_html)

    }).fail(function () {
        reissueToken();
    });
}

function logout() {
    var settings = {
        "url": "http://localhost:8080/users/logout",
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
        "url": "http://localhost:8080/refresh/regeneration",
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
//         "url": "http://localhost:8080/products/get",
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
        "url": `http://localhost:8080/users/login-username?username=${username}&role=${role}`,
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
        // console.log(response.responseJSON)
        // if (response.responseJSON.statusCode === 400 || response.responseJSON.statusCode === 401)
        //     alert("아이디나 비밀번호를 다시 확인해주세요")
    });
}



// JWT 토큰 디코딩 함수
function decodeJwtToken(userToken) {
    const base64Url = userToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );
  
    return JSON.parse(jsonPayload);
  }
  
  // JWT 토큰에서 user의 id 값을 추출하는 함수
  function getUserIdFromJwtToken(userToken) {
    const decodedToken = decodeJwtToken(userToken);
    return decodedToken.jti;
  }
  
  // 사용자 ID 추출
  const userId = getUserIdFromJwtToken(userToken);
  
  // 사용자 ID 출력
  console.log('User ID:', userId);



function getProductInfo(productId) {

    var settings = {
        "url": "http://localhost:8080/products/" + productId,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {

        console.log(response);
        let productId = response.productId;
        let productName = response.productName;
        let productPrice = response.productPrice;
        let productStatus = response.productStatus;
        let productCategory = response.productCategory;
        let productEnum = response.productEnum;
        let productImg = response.productImg ? response.productImg : "//dummyimage.com/900x350.png/c0c0c0&amp;text=image0x201";
        let createdAt = response.createdAt.substr(0, 10);
        let modifiedAt = response.modifiedAt.substr(0, 10);
        let viewCount = response.viewCount;
        let nickName = response.nickName;
        let region = response.region;
        let profileImg = response.img;
        let userGrade = response.userGrade;
        let interest = response.interest;
        let productContents = response.productContents;
        let sellerId = response.sellerId;
        if (region == null) {
            region = "지역없음"
        }
        if (productContents == null) {
            productContents = "내용없음"
        }


        let temp_html =
            `<div>
       <section id="article-images">
             <h3 class="hide">이미지</h3>
             <div class="image-slider">
                 <div class="slider-wrap">
                     <img src="${productImg}">
                 </div>
             <div>
         </section>
     </div>
       <section id="article-profile">
       <a id="article-profile-link">
           <div style = "display: flex;
           flex-direction: row; margin-top: 3px; border-bottom: 1px solid black; padding: 10px 10px 10px 10px;">
               <div class="article-prodile-image" style="display: flex;  width:50px; ">
                   <img src="${profileImg}">
               </div>
               <div id="article-profile-left">
                   <div id="nickname">${nickName}</div>
                   <div id="region-name">${region}</div>
                   <div> 평점: ${userGrade}</div>
               </div>
               <div style = "display: flex;flex-direction: column;align-items: flex-start;justify-content: flex-end;margin-left: 380px;">
               <div>관심 : ${interest}</div>
               <div>작성일 : ${createdAt}</div>
               <div>조회수:${viewCount}</div>
               </div>
           </div>
       </a>
   </section>

       <div class="card-body" "display: flex;flex-direction: row;>
                 <div style = "font-size: 20px ; margin-top: 5px; ">  ${productName}</div>
                 <div>${productCategory}</div>
               <p style = " display: flex;
               flex-direction: column;
               align-items: flex-start;
               justify-content: flex-end;
               margin-left: 540px;
               margin-top: -40px;
               margin-bottom: 20px; font-size: 15px "> <button onclick = "productReport()">상품신고</button> <br>가격 : ${productPrice} 원<br>상태 : ${productStatus} 급<br>종류 : ${productEnum} </p>
              
              <div>
               <p>${productContents}</p>
           </div>
           <div class="card-body" id = "interested" style="display: flex; justify-content: center; margin-top:50px;align-items: center;">
           <button type="button" class="btn btn-light small-button" style="margin-right:10px" onclick="checkMyProductInterest(${productId})">관심</button>

           ${productEnum !== "판매완료" ? '<button type="button" class="btn btn-light small-button2" style="margin-right:10px" onclick="checkMyProductChat(' + productId + ', ' + sellerId + ', \'' + productName + '\', \'' + productEnum + '\')">판매자와 채팅하기</button>' : ''}
           <button id="deleteProduct" type="button" class="btn btn-light small-button" style="margin-right:10px" onclick="deleteProduct(${productId})">상품 삭제</button>
           <button id="updateproduct" type="button" class="btn btn-light small-button" style="margin-right:10px" onclick="updateOpen(${productId})">상품 수정</button>
        </div>`
        $('#info_box').append(temp_html);

    });
    // 클릭 이벤트 설정
    $(".small-button2").click(function () {
        createChatRoom(productId, sellerId, productName);
    });
    $("#deleteProduct").click(function () {
        deleteProduct(productId);
    })
    $("#updateproduct").click(function () {
        updateOpen(productId)
    })
}

function updateOpen(productId) {
    // window.location.href = "/updateproduct.html?productId=" + productId;
    var url = "/updateproduct.html?productId=" + productId;
    var option = "width = 800, height = 800, top = 100, left = 200, location = no"
    window.open(url, "", option);

}



// 상품 삭제하기
function deleteProduct(productId) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/products/" + productId,
        data: { 'productId': productId },
        headers: { Authorization: userToken }
    })
        .done(function (data) {
            console.log(data)
            console.log(productId)
            alert("삭제되었습니다.")
            window.location.href = "index.html";
        })

        .fail(function (xhr, textStatus, errorThrown) {
            alert("권한이 없습니다.")
        })
}

// 채팅방 만들기
// 채팅 보여주는 부분 쪽 채팅 버튼에 "onclick=함수명(${'productId'})" 해줘야함
function createChatRoom(productId, sellerId, productName) {
    console.log(productName, productId, productName, sellerId)
    $.ajax({
        type: 'POST',
        url: "http://localhost:8080/chatroom/" + productId,
        headers: { Authorization: userToken },
        data: JSON.stringify({
            "roomName": productName,
            "productId": productId,
            "sellerId": sellerId
        }),
        success: function () {
            window.location.href = 'chatroom.html';
        }
    })
};

function interest(productId) {
    var settings = {
        "url": "http://localhost:8080/interest/" + productId,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": localStorage.getItem('accessToken')
        },
    };

    $.ajax(settings).done(function (response) {
        if (response == false) {
            alert("관심내역에 등록되었습니다!")
        } else {
            alert("관심내역에서 삭제되었습니다!")
        }
        window.location.reload();
    }).fail(function () {
        reissueToken();
    })
};


function checkMyProductInterest(productId) {
    var settings = {
        "url": "http://localhost:8080/products/check/" + productId,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": localStorage.getItem("accessToken")
        },
    };
    $.ajax(settings).done(function (response) {
        if (response == true) {
            alert("내 상품은 관심목록에 등록 할 수 없습니다.")
        }
        if (response == false) {
            interest(productId);
        }
    }).fail(function () {
        alert("로그인 해 주세요");
    });
}

function checkMyProductChat(productId) {
    var settings = {
        "url": "http://localhost:8080/products/check/" + productId,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": localStorage.getItem("accessToken")
        },
    };
    $.ajax(settings).done(function (response) {
        console.log(response)
        if (response == true) {
            alert("내 상품에는 채팅을 할 수 없습니다..")
        }
        if (response == false) {
            chatCheck(productId);

        }
    }).fail(function () {
        alert("로그인 해 주세요");
    });
}

function chatCheck(productId) {
    var settings = {
        "url": "http://localhost:8080/chatroom/check/" + productId,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": localStorage.getItem("accessToken")
        },
    };

    $.ajax(settings).done(function (response) {
        if (response == true) {
            window.location.href = window.location = '/chatRoom.html';
        }
        if (response == false) {
            createChatRoom(productId);
        }
    });
}

function productReport() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const productId = urlSearchParams.get('productId');
    var url = `/productreport.html?productId=${productId}`;
    var name = "상품신고";
    var option = "width = 800, height = 800, top = 100, left = 200, location = no"
    window.open(url, name, option)
}

// function getProductId(){
//  const currentUrl = window.location.href;

// const regex = /(\d+)\.html$/;

// // URL에서 숫자 값을 추출
// const match = currentUrl.match(regex);

// if (match) {
//   const numberValue = match[1]; 

// } else {
//   console.log("숫자 값을 찾을 수 없습니다.");
// }
// }