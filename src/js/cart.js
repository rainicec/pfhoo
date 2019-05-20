require(['config'], function () {
    require(['jquery', 'head', 'common'], function () {
        $('#side').load('sidebar', function () {
            require(['sidebar'], function () {
                $('#side').on('click', '.cart', function () {
                    location.href = 'cart.html'
                })
            })
        })
        $('#bottom_lam').load('bottom_con', function () {
            require(['bottom_con'])
        })
        $('#foot').load('foot', function () { })

        //登录状态
        if (getCookie('user')) {
            $('#topnav .username').html(getCookie('user'));
            $('#topnav .loginout').html('退出');
            $('#topnav .regsj').html('我的数据包');
            $('#topnav .mesg').html('我的私信');

            $('#topnav').on('click', '.loginout', function () {
                removeCookie('user');
                location.href = '../index.html';
            })
        } else {
            $('#topnav').on('click', '.loginout', function () {
                location.href = 'login.html';
            })
            $('#topnav').on('click', '.regsj', function () {
                location.href = 'register.html';
            })
        }
        // 顶部认证信息点击隐藏
        var hideok = true;
        $('#hide').click(function () {
            if (hideok) {
                $('#autinf').css('display', 'block');
                $(this).attr('src', '../css/img/trusted-web3_01.png');
                hideok = !hideok;
            } else {
                $('#autinf').css('display', 'none');
                $(this).attr('src', '../css/img/trusted-web4_01.png');
                hideok = !hideok;
            }
        })

        //顶部认证信息先显示后隐藏
        setTimeout(function () {
            $('#autinf').css('display', 'none');
            $('#hide').attr('src', '../css/img/trusted-web4_01.png');
        }, 3000)


        //渲染购物车
        if (getCookie('user')) {
            var newp = new Promise(function (goit) {
                $.ajax({
                    type: "get",
                    url: "../api/cart.php",
                    data: "user=" + getCookie('user'),
                    success: function (response) {
                        goit(response)
                    }
                });
            })

            newp.then(function (obj) {
                if (obj == 'nothing') {
                    $('#gbox').html('<img src="../css/img/emptycart.jpg" alt="" class="emptycart">')
                } else {
                    var godobj = JSON.parse(obj)
                    var godhtml = '';
                    for (const key in godobj) {
                        var imgpath = godobj[key][0].imgpath.split('&');

                        godhtml += `<div  data-id="${godobj[key]['id']}">
                            <div class="goodsname clearfix">
                                <div class="check_box">
                                    <input type="checkbox" class="check">
                                    <span>${godobj[key][0].name}</span>
                                    <span class="check_img"></span>
                                </div>
                                
                            </div>
                            <table class="goodsmain">
                                <tr>
                                    <td>
                                        <img src="${imgpath[0]}" alt="">
                                        <span>戒指大小 17</span>
                                    </td>
                                    <td>
                                        <span class="reduce"></span>
                                        <input type="text" class="num" value="${godobj[key]['num']}">
                                        <span class="plus"></span>
                                    </td>
                                    <td class="stock">${godobj[key][0].stock}</td>
                                    <td class="onepri">￥${godobj[key][0].price}</td>
                                    <td>≥1&nbsp;&nbsp;&nbsp;13.00</td>
                                    <td class="allpri">￥${godobj[key][0].price * godobj[key]['num']}</td>
                                    <td>
                                        <a href="###" class="delg">删除</a>
                                    </td>
                                </tr>
                            </table>
                            </div>`;
                    }
                    $('#gbox').html(godhtml);

                    if ($('#main').innerHeight() * 1 + 400 > $(window).innerHeight()) {
                        $('#main .add').css({
                            'position': 'fixed',
                            'bottom': 0,
                            'left': '50%',
                            'transform': 'translateX(-50%)'
                        })
                    }

                    //计算栏吸底
                    $(window).scroll(function () {
                        var allheight = $('#main').innerHeight() + $('#top_banner').innerHeight() + $('#topnav').innerHeight() + $('#header').innerHeight();
                        if ($(window).scrollTop() > allheight - 400) {
                            $('#main .add').css({
                                'position': 'absolute',
                                'bottom': '20px',
                                'left': '0',
                                'transform': 'translateX(0)'
                            })
                        } else if ($(window).scrollTop() < allheight - $(window).innerHeight()) {
                            $('#main .add').css({
                                'position': 'fixed',
                                'bottom': 0,
                                'left': '50%',
                                'transform': 'translateX(-50%)'
                            })
                        }
                    })

                    //购物车计算功能
                    var buynum = 0;

                    $('#main').on('click', '.reduce', function () {
                        buynum = $(this).parent().find('.num').val();
                        buynum--
                        if (buynum < 0) {
                            buynum = 0
                        }
                        $(this).parent().find('.num').val(buynum);
                        $.ajax({
                            type: "get",
                            url: "../api/incart.php",
                            data: {
                                "gid": $(this).parent().parent().parent().parent().parent().attr("data-id"),
                                'user': getCookie('user'),
                                'num': buynum
                            },
                            success: function (response) {

                            }
                        });
                        var _this = $(this);
                        anum(_this)
                        alladd()
                    })
                    $('#main').on('click', '.plus', function () {
                        buynum = $(this).parent().find('.num').val();
                        buynum++
                        if (buynum > $(this).parent().parent().find('.stock').text()) {
                            buynum = $(this).parent().parent().find('.stock').text()
                        }
                        $(this).parent().find('.num').val(buynum);
                        $.ajax({
                            type: "get",
                            url: "../api/incart.php",
                            data: {
                                "gid": $(this).parent().parent().parent().parent().parent().attr("data-id"),
                                'user': getCookie('user'),
                                'num': buynum
                            },
                            success: function (response) {

                            }
                        });
                        var _this = $(this);
                        anum(_this)
                        alladd()
                    })

                    var regex = /^[0-9]*$/;
                    $('#main').on('keyup', '.num', function () {
                        if (regex.test($(this).val())) {
                            if ($(this).val() * 1 > $(this).parent().parent().find('.stock').text()) {
                                buynum = $(this).parent().parent().find('.stock').text();
                            } else {
                                buynum = $(this).val()
                            }
                            $(this).val(buynum)
                        } else {

                            $(this).val(buynum)
                        }
                        $.ajax({
                            type: "get",
                            url: "../api/incart.php",
                            data: {
                                "gid": $(this).parent().parent().parent().parent().parent().attr("data-id"),
                                'user': getCookie('user'),
                                'num': buynum
                            },
                            success: function (response) {

                            }
                        });
                        var _this = $(this);
                        anum(_this)
                        alladd()
                    })

                    function anum(abc) {
                        var onepri = abc.parent().parent().find('.onepri').text().slice(1);
                        abc.parent().parent().find('.allpri').text('￥' + buynum * onepri);
                    }


                    //删除
                    $('#main').on('click', '.delg', function () {
                        var farid = $(this).parent().parent().parent().parent().parent().attr('data-id');
                        var _this = $(this);
                        if (confirm('确认要删除吗？')) {
                            $.ajax({
                                type: "get",
                                url: "../api/delcart.php",
                                data: "id=" + farid,
                                success: function (response) {
                                    if (response == 'yes') {
                                        _this.parent().parent().parent().parent().parent().remove();
                                    } else {
                                        alert('删除失败，请稍后再试')
                                    }
                                }
                            });
                        }
                    })
                    // $('#main').on('click', '.alldel', function () {

                    //     if (confirm('确认要删除选中的商品吗？')) {
                    //         $('#main ')
                    //         $.ajax({
                    //             type: "get",
                    //             url: "../api/delcart.php",
                    //             data: "id=" + farid,
                    //             success: function (response) {
                    //                 if (response == 'yes') {
                    //                     _this.parent().parent().parent().parent().parent().remove();
                    //                 } else {
                    //                     alert('删除失败，请稍后再试')
                    //                 }
                    //             }
                    //         });
                    //     }
                    // })

                    //勾选
                    $('#gbox').on('click', '.check_box', function () {
                        if ($(this).find('.check').is(':checked')) {
                            $(this).find('.check').prop('checked', false)
                            $(this).find('.check_img').css('background', '#fff')
                        } else {
                            $(this).find('.check').prop('checked', true)
                            $(this).find('.check_img').css('background', "url(../css/img/commom-s50680dba8f.png) 0 -46px")
                        }
                        var checknum = 0;
                        $('#gbox .check_box').each(function (i, item) {
                            if ($(item).find('.check').is(':checked')) {
                                checknum++;
                            }
                        })
                        if (checknum >= $('#gbox .check_box').length) {
                            $('#main .allcheck .check').prop('checked', true);
                            $('#main .allcheck .check_img').css('background', "url(../css/img/commom-s50680dba8f.png) 0 -46px");
                            $('#main .shopcheck .check').prop('checked', true);
                            $('#main .shopcheck .check_img').css('background', "url(../css/img/commom-s50680dba8f.png) 0 -46px");

                        } else {
                            $('#main .allcheck .check').prop('checked', false);
                            $('#main .allcheck .check_img').css('background', "#fff");
                            $('#main .shopcheck .check').prop('checked', true);
                            $('#main .shopcheck .check_img').css('background', "#fff");
                        }
                        alladd()
                    })

                    //全选
                    $('#main').on('click', '.shopcheck', function () {
                        if ($(this).find('.check').is(':checked')) {
                            $(this).find('.check').prop('checked', false)
                            $(this).find('.check_img').css('background', '#fff')
                        } else {
                            $(this).find('.check').prop('checked', true)
                            $(this).find('.check_img').css('background', "url(../css/img/commom-s50680dba8f.png) 0 -46px")
                        }
                        if ($(this).find('.check').is(':checked')) {
                            $('#gbox .check').prop('checked', true);
                            $('#gbox').find('.check_img').css('background', "url(../css/img/commom-s50680dba8f.png) 0 -46px");
                            $('#main .allcheck .check').prop('checked', true);
                            $('#main .allcheck .check_img').css('background', "url(../css/img/commom-s50680dba8f.png) 0 -46px");
                        } else {
                            $('#gbox .check').prop('checked', false);
                            $('#gbox').find('.check_img').css('background', "#fff");
                            $('#main .allcheck .check').prop('checked', false);
                            $('#main .allcheck .check_img').css('background', "#fff");
                        }
                        alladd()
                    })


                    $('#main').on('click', '.allcheck', function () {
                        if ($(this).find('.check').is(':checked')) {
                            $(this).find('.check').prop('checked', false)
                            $(this).find('.check_img').css('background', '#fff')
                        } else {
                            $(this).find('.check').prop('checked', true)
                            $(this).find('.check_img').css('background', "url(../css/img/commom-s50680dba8f.png) 0 -46px")
                        }
                        if ($(this).find('.check').is(':checked')) {
                            $('#main .check').prop('checked', true);
                            $('#main').find('.check_img').css('background', "url(../css/img/commom-s50680dba8f.png) 0 -46px")
                        } else {
                            $('#main .check').prop('checked', false);
                            $('#main').find('.check_img').css('background', "#fff")
                        }
                        alladd()
                    })

                    function moren() {
                        $('#main .allcheck').find('.check').prop('checked', true);
                        if ($('#main .allcheck').find('.check').is(':checked')) {
                            $('#main .check').prop('checked', true);
                            $('#main').find('.check_img').css('background', "url(../css/img/commom-s50680dba8f.png) 0 -46px")
                        } else {
                            $('#main .check').prop('checked', false);
                            $('#main').find('.check_img').css('background', "#fff");
                        }
                        alladd()
                    }
                    moren()

                    //结算栏计算
                    function alladd() {
                        var ty = 0;
                        var allnum = 0;
                        var alltar = 0;
                        $('#gbox .check_box').each(function (i, item) {
                            if ($(item).find('.check').is(':checked')) {
                                ty++;
                                allnum += $(item).parent().next().find('.num').val() * 1;
                                alltar += $(item).parent().next().find('.allpri').text().slice(1) * 1;
                            }
                        })
                        $('.add .ssbox span:eq(0)').text(ty);
                        $('.add .ssbox span:eq(1)').text(allnum);
                        $('.add .alltar').text('￥' + alltar)
                    }
                    alladd()

                }
            })
        } else {
            $('#gbox').html('<img src="../css/img/emptycart.jpg" alt="" class="emptycart">')
        }



    })
})