import URL_VARIABLE from './export.js';


const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const boardId = parseInt(params.get("boardId"));
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
        "url": URL_VARIABLE + 'users/profile',
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
    <div style = "color:#82ca9c; margin-left 10px; margin-top: 14px" ><a onclick = "logout()" > ???????????? </a></div>`
        $('#loginForm').append(temp_html)
        element.innerHTML = '<div style = "color:#82ca9c; margin-top: 14px" ><a onclick = "logout()" > ???????????? </a></div>';
    }).fail(function () {
        reissueToken();
    });
}
function logout() {
    var settings = {
        "url": URL_VARIABLE + 'users/logout',
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
        "url": URL_VARIABLE + 'refresh/regeneration',
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

// ?????? ????????????
$(document).ready(function () {
    const ok = localStorage.getItem('accessToken')
    if (ok.length == 0) {
        console.error("userId ????????? ?????? ??? ????????????.");
        return;
    }
    getBoards(0)
});

const userToken = localStorage.getItem('accessToken')
// let ?????? ??????, const ???????????????; -> ?????????



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

function getUserIdFromJwtToken(userToken) {
    const decodedToken = decodeJwtToken(userToken);
    return decodedToken.sub;
}
const loginUsername = getUserIdFromJwtToken(userToken);

function getUserauthFromJwtToken(userToken) {
    const decodedToken = decodeJwtToken(userToken);
    return decodedToken.auth;
}
const loginUserRole = getUserauthFromJwtToken(userToken);


function createButton() {
    var url = "/addBoard.html"
    var windowOption = "width = 800, height = 800, top = 100, left = 200, location = no"

    var popupWindow = window.open(url, "", windowOption);

    popupWindow.onload = function () {
        // ???????????? ???????????? ???????????? ??????
        var subject = popupWindow.document.getElementById("notice");

        if (loginUserRole === "MEMBER") {
            // auth??? MEMBER??? ??????, ???????????? ????????? ????????????.
            subject.style.display = "none";
        } else {
            // auth??? MEMBER??? ?????? ??????, ???????????? ????????? ????????????.
            subject.style.display = "block";
        }
    };
}

$("#addBoard").click(function () {
    createBoards();
});

$("#updateBoards").click(function () {
    updateBoard();
});

function createBoards() {
    var title = $("#title").val();
    var content = $("#content").val();
    var subject = $("#subject").val();

    if (!title || !content || !subject) {
        alert("??????, ??????, ????????? ?????? ?????? ???????????????.");
        return;
    }
    $.ajax({
        type: "POST",
        url: URL_VARIABLE + 'boards',
        headers: {
            Authorization: userToken,
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            "title": title,
            "content": content,
            "subject": subject
        }),
        success: function (response) {
            console.log(response)
            alert("????????? ????????? ?????? ???????????????.")
            window.close();
            window.opener.location.reload();
        }
    })
}

function getBoards(page) {
    $("#boardList").empty()
    $("#create").empty()
    $.ajax({
        type: 'GET',
        url: URL_VARIABLE + 'boards',
        headers: { Authorization: userToken },
        dataType: 'json',
        data: {
            "page": page
        },
        success: function (response) {
            let boards = response.content;
            let temp_careatBtn = `<button id="createBoard" type="button">?????????</button>`
            $('#create').append(temp_careatBtn);
            for (let i = 0; i < boards.length; i++) {
                let boardId = boards[i]['boardId']
                let subject = boards[i]['subject']
                let title = boards[i]['title']

                let temp_html = `<tr id="getBoard" class="text-center" data-board-id="${boardId}")">
                                        <td>${subject}</td>
                                        <td class="text-center">
                                            <p>${title}</p>
                                        </td>
                                        <td></td>
                                </tr>`;

                // ?????? ????????? HTML ????????? DOM??? ???????????????.
                $('#boardList').append(temp_html);
            }

            $(document).on("click", "#getBoard", function () {
                var boardId = $(this).data("board-id");
                getBoard(boardId);
            });

            $('#createBoard').click(function () {
                createButton();
            })


            var totalPages = response.totalPages;
            var pageNumber = response.number;

            var ul = $('#pagination');
            ul.empty();

            // Add 'First' button
            var firstLi = $('<li>');
            var firstA = $('<a>').attr('href', '#').text('??????');
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
            var lastA = $('<a>').attr('href', '#').text('?????????');
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
                if (page >= 0 && page < totalPages) {
                    getBoards(page);
                }
            });
        }
    });
}

function updateBtn(boardId) {
    var url = "/updateBoard.html?boardId=" + boardId
    var windowOption = "width = 800, height = 800, top = 100, left = 200, location = no"

    var popupWindow = window.open(url, "", windowOption);

    popupWindow.onload = function () {
        // ???????????? ???????????? ???????????? ??????
        var subject = popupWindow.document.getElementById("notice");

        if (loginUserRole === "MEMBER") {
            // auth??? MEMBER??? ??????, ???????????? ????????? ????????????.
            subject.style.display = "none";
        } else {
            // auth??? MEMBER??? ?????? ??????, ???????????? ????????? ????????????.
            subject.style.display = "block";
        }
    };
}

function updateBoard() {

    var title = $("#title").val();
    var content = $("#content").val();
    var subject = $("#subject").val();

    if (!title || !content || !subject) {
        alert("??????, ??????, ????????? ?????? ?????? ???????????????.");
        return;
    }

    $.ajax({
        type: "PUT",
        url: URL_VARIABLE + 'boards/' + boardId,

        headers: {
            Authorization: userToken,
        },
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            "title": title,
            "content": content,
            "subject": subject
        }),
        success: function (response) {
            console.log(response)
            alert("????????? ????????? ?????? ???????????????.")
            window.close();
            window.opener.location.reload();
        }
    })
}


function deleteBoard(boardId) {
    $.ajax({
        type: "DELETE",
        url: URL_VARIABLE + 'boards/' + boardId,
        headers: { Authorization: userToken },
        success: function (response) {
            alert("?????????????????????.");
            window.location.href = `board.html`
        }
    });
}

function getBoard(boardId) {
    $("#boards").empty();
    $.ajax({
        type: 'GET',
        url: URL_VARIABLE + "boards/" + boardId,
        headers: { Authorization: userToken },
        success: function (response) {
            let title = response.title;
            let content = response.content;
            let subject = response.subject;
            let comments = response.comments;
            let username = response.username;
            let createdAt = response.createdAt;
            let modifiedAt = response.modifiedAt;

            boardId = boardId;

            let temp_html =
                `<div class="card border-success mb-3" style="width= 100% max-width: 800px height=100% max-height= 500px">
                    <h1 class="card-title">${title}</h5>
                    <div class="card-header bg-transparent border-success">${username}</div>
                    <div class="info_wrap">
                        <span>${subject}</span>
                        <span class="dateTime">?????? ?????? : ${createdAt} ?????? ?????? ?????? : ${modifiedAt}</span>
                    </div>
                </div>
                <div class="card-body text-success">
                  <p class="card-text">${content}</p>
                </div>
                <div class="card-footer bg-transparent border-success">${comments}</div>
                ${loginUsername == username ? `<button id="deleteBoard" type="button" data-board-id="${boardId}">??????</button>` : ''}
                ${loginUsername == username ? `<button id="updateBoard" type="button" data-board-id="${boardId}">??????</button>` : ''}
                <button type="button" class="btn btn-success" id="backtolist">????????????</button>
                </div>`

            $('#boards').append(temp_html);

            $("#deleteBoard").click(function () {
                deleteBoard(boardId);
            });

            $("#updateBoard").click(function () {
                updateBtn(boardId);
            });

            $("#backtolist").click(function () {
                window.location.href = `board.html`
            });
        }
    });
}