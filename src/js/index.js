
(function () {

    // 轮播图

    var swiper = new Swiper('.swiper-container', {
        speed: 1000,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.prev',
            prevEl: '.next',
        },
        // mousewheel: true,
        // eventsTarged: '#com_box'
    });

    //鼠标经过轮播停止
    $('#com_box').mouseover(function () {
        swiper.autoplay.stop();
    })

    $('#com_box').mouseout(function () {
        swiper.autoplay.start();
    })


    // 商品分类二级菜单

    //时尚饰品
    $('#com_box').on('mouseenter', '.fashion_accessories', function () {
        $('#com_box .com_main1').css('display', 'block');
        $(this).css('background', '#fff');
        $(this).css('color', '#183b8c')
    })

    $('#com_box').on('mouseleave', '.fashion_accessories', function () {
        $('#com_box .com_main1').css('display', 'none');
        $(this).css('background', '#183b8c');
        $(this).css('color', '#fff')
    })

    //纯银首饰
    $('#com_box').on('mouseenter', '.pure_silver_jewelry', function () {
        $('#com_box .com_main2').css('display', 'block');
        $(this).css('background', '#fff');
        $(this).css('color', '#183b8c')
    })

    $('#com_box').on('mouseleave', '.pure_silver_jewelry', function () {
        $('#com_box .com_main2').css('display', 'none');
        $(this).css('background', '#183b8c');
        $(this).css('color', '#fff')
    })

    //适销平台
    $('#com_box').on('mouseenter', '.marketable_platform', function () {
        $('#com_box .com_main3').css('display', 'block');
        $(this).css('background', '#fff');
        $(this).css('color', '#183b8c')
    })

    $('#com_box').on('mouseleave', '.marketable_platform', function () {
        $('#com_box .com_main3').css('display', 'none');
        $(this).css('background', '#183b8c');
        $(this).css('color', '#fff')
    })

    //商品分类main移入移出
    $('#com_box').on('mouseover', '.com_class_main', function () {
        $(this).css('display', 'block')
    })

    $('#com_box').on('mouseout', '.com_class_main', function () {
        $(this).css('display', 'none')
    })



    //选项卡
    function optc(id, index) {
        var optCard = document.getElementsByClassName(id)[index];
        var optCardSpan = optCard.querySelectorAll('span');
        var optCardContent = optCard.querySelectorAll('.content');

        for (let i = 0; i < optCardSpan.length; i++) {
            optCardSpan[i].onmouseenter = function () {
                for (var j = 0; j < optCardContent.length; j++) {
                    optCardContent[j].style.display = 'none';
                    optCardSpan[j].style.background = '#f5f5f5';
                }
                optCardContent[i].style.display = 'block';
                this.style.background = '#fff';
            }
        }
    }
    optc('optcard', 0);
    optc('optcard', 1);


    //内容右侧小翻页:鼠标移入滚动
    var goodsswiper1 = new Swiper('.gc1', {
        speed: 1000,
        autoplay: false,
        pagination: {
            el: '.gp1',
            clickable: true,
        },
    });

    var goodsswiper2 = new Swiper('.gc2', {
        speed: 1000,
        autoplay: false,
        pagination: {
            el: '.gp2',
            clickable: true,
        },
    });

    $('#fashion_accessories').on('mouseover', '.swiper-pagination-bullet', function () {
        $(this).click();
    })


    //行业资讯轮播图

    var dynamicswiper = new Swiper('.dynamic-container', {
        speed: 1000,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.dynamic-pagination',
            clickable: true,
        },
        mousewheel: true,
    });


    //新品爆款内容渲染

    $.ajax({
        type: "get",
        url: "./api/index-render.php",
        dataType: "json",
        success: function (response) {
            // console.log(response)
            var num = 0;
            for (var key in response) {
                var html = '';

                response[key].map(function (item) {
                    html += `<ul>
                                <li class="goodsimg">
                                    <img src="${item.imgpath}" alt="">
                                </li>
                                <p class="goodsname">${item.name}</p>
                                <p class="price">价格登录可见</p>
                            </ul>`

                    $('#new_product .content').eq(num).html(html);
                })
                num++;
            }
        }
    });


    //点击跳转详情页
    $('#com_box').on('click', 'li', function () {
        location.href = 'html/goodslist.html'
    })
})()