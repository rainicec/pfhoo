(function () {
    //顶部下拉菜单
    $('#topnav').on('mouseover', '.navpar', function () {
        $(this).next().stop().slideToggle(200);
    })

    $('#topnav').on('mouseover', '.topnav_right_selnav', function () {
        $(this).stop().slideToggle(200);
    })

    $('#topnav').on('mouseout', '.navpar', function () {
        $(this).next().stop().slideToggle(200);
    })

    $('#topnav').on('mouseout', '.topnav_right_selnav', function () {
        $(this).stop().slideToggle(200);
    })




    //搜索栏下拉菜单
    var selisok = true;
    $('#search_box').on('click', '.select', function () {
        if (selisok) {
            $('.select_nav').stop(false, true).slideDown(100);
            selisok = !selisok;
        } else {
            $('.select_nav').stop(false, true).slideUp(100);
            selisok = !selisok;
        }
        $(this).css('border-color', '#bc348b');
        var _this = $(this).find('i').html()
        $('#search_box .select_nav p').each(function (i, item) {
            if (_this == $(item).html()) {
                $(item).css('color', '#e52d88');
                $(item).siblings().css('color', 'black');
            }
        })

    })

    $('#search_box').on('click', '.select_nav p', function () {
        $('#search_box .select i').html($(this).html());
        $('.select_nav').stop(false, true).slideUp(100);
        selisok = !selisok;
    })

    $('#search_box').on('mouseover', '.select_nav p', function () {
        $(this).css('color', '#e52d88');
        $(this).siblings().css('color', 'black');
    })

})()
