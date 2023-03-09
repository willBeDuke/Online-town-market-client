const urlSearchParams = new URLSearchParams(window.location.search);
const boardId = urlSearchParams.get('boardId');

jQuery(document).ready(function ($) {
    if (localStorage.getItem('accessToken') != '' && localStorage.getItem('accessToken') != null) {
        getProfile();
    }
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
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" style = "color:black">${nickname}님 </a>
        
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
        element.innerHTML = '<div style = "color:#82ca9c; margin-top: 14px" ><a onclick = "logout()" > 로그아웃 </a></div>';
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


// 토큰 불러오기
$(document).ready(function () {
    const ok = localStorage.getItem('accessToken')
    if (ok.length == 0) {
        console.error("userId 요소를 찾을 수 없습니다.");
        return;
    }
    getBoards(0)
});

const userToken = localStorage.getItem('accessToken')
// let 변경 가능, const 변경불가능; -> 개발자


// function crerateBoards() {
//     $.ajax({
//         type: "POST",
//         url: "http://localhost:8080/boards",
//         headers: {Authorization: userToken},
//         dataType
//     })
// }


function getBoards(page) {
    console.log(boardId);
    $("#boardList").empty()
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/boards',
        headers: { Authorization: userToken },
        dataType: 'json',
        data: {"page" : page},
        success: function (response) {
            let boards = response.content;
            for (let i = 0; i < boards.length; i++) {
                let subject = boards[i]['subject']
                let title = boards[i]['title']

                let temp_html = `<tr class="text-center">
                <a style="color: black; text-decoration: none;" onclick="getBoard(${boardId})">
                                <td>${subject}</td>
                                <td class="text-center">
                                    <p>${title}</p>
                                </td>
                                <td></td>
                            </a>
                        </tr>`;

                // 새로 생성한 HTML 코드를 DOM에 추가합니다.
                $('#boardList').append(temp_html);
            }
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
                getBoards(0);
            });

            // Add click event for 'Last' button
            $('#pagination li:last-child a').click(function (event) {
                event.preventDefault();
                getBoards(totalPages - 1);
            });

            $('#page_nation').append(ul);

            $('#pagination a').click(function (event) {
                event.preventDefault();
                var page = $(this).text() - 1;
                getBoards(page);
            });
        },
        error: function (xhr, status, error) {
            console.error(xhr);
        }
    });
}

function getBoard(boardId) {
    var settings = {
        "url": "http://localhost:8080/boards/" + boardId,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {

        let boardTitle = response.title;
        let boardContent = response.content;
        let boardSubject = response.subject;
        let comments = response.comments;
        let createdAt = response.createdAt;
        let modifiedAt = response.modifiedAt;

        let temp_html =
        `<div class="board_view_wrap">
            <div class="title_wrap">
                <div class="title">${boardTitle}</dvi>
            </div>
            <div class="info_wrap">
                <span class="writer"></span>
                <span class="dateTime">작성 날짜 : ${createdAt} 최종 수정 날짜 : ${modifiedAt}</span>
            </div>
            <div class="content_wrap>
                <div class="boardSubject">${boardSubject}</div>
                <div class="boardContent>${boardContent}</div>
            </dvi>
            <div class="comments_wrap>
                <div class="comments>${comments}</div>
            </div>
        </div>`

        $('#info_box').append(temp_html);

    });
}