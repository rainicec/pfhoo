require(['config'], function () {
    //引入模块
    require(['jquery', 'common'], function ($, res) {
        $('#head').load('head', function () {
            require(['head'], function () {
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

                //登录状态
                if (getCookie('user')) {
                    $('#topnav .username').html(getCookie('user'));
                    $('#topnav .loginout').html('退出');
                    $('#topnav .regsj').html('我的数据包');
                    $('#topnav .mesg').html('我的私信');

                    $('#topnav').on('click', '.loginout', function () {
                        removeCookie('user');
                        location.href = 'index.html';
                    })
                } else {
                    $('#topnav').on('click', '.loginout', function () {
                        location.href = 'login.html';
                    })
                    $('#topnav').on('click', '.regsj', function () {
                        location.href = 'register.html';
                    })
                }
            })
        })
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


        // 商品分类二级菜单
        $('#total_nav').on('mouseenter', '.classification', function () {
            $('#com_box').css('display', 'block');
            $('#total_nav .classification').css({
                'background': ' #bc338b',
                'color': '#fff'
            });
            $('#total_nav .classification li:eq(0)').css('background-position', ' 0 -87px')
        })
        $('#total_nav').on('mouseleave', '.classification', function () {
            $('#com_box').css('display', 'none');
            $('#total_nav .classification').css({
                'background': '#fff',
                'color': '#bc338b'
            });
            $('#total_nav .classification li:eq(0)').css('background-position', ' 0 -59px')
        })

        $('#com_box').mouseenter(function () {
            $(this).css('display', 'block');
            $('#total_nav .classification').css({
                'background': ' #bc338b',
                'color': '#fff'
            });
            $('#total_nav .classification li:eq(0)').css('background-position', ' 0 -87px')
        })
        $('#com_box').mouseleave(function () {
            $(this).css('display', 'none');
            $('#total_nav .classification').css({
                'background': '#fff',
                'color': '#bc338b'
            });
            $('#total_nav .classification li:eq(0)').css('background-position', ' 0 -59px')
        })

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

        //勾选
        // $('#goods_main').on('click', '.check_img', function () {
        //     if ($('.check').is(':checked')) {
        //         $('.check').prop('checked', false)
        //         $(this).css('background', '#fff')
        //     } else {
        //         $('.check').prop('checked', true)
        //         $(this).css('background', "url(../css/img/commom-s50680dba8f.png) 0 -46px")
        //     }
        // })

        //隐藏更多
        var ulmianheight = $('#goods_main ul li').outerHeight()
        $('#goods_main dl ul').css('height', ulmianheight)//初始化ul高度

        $('#goods_main').on('click', '.main_check_hide', function () {
            var num = $(this).prev().find('li').length / 7;
            if ($(this).find('span').html() == '更多') {
                $(this).prev().animate({
                    'height': Math.ceil(num) * ulmianheight
                }, 500)
                $(this).find('span').html('隐藏')
            } else {
                $(this).prev().animate({
                    'height': ulmianheight
                }, 500)
                $(this).find('span').html('更多')
            }

        })

        //产业带下拉选项
        var selok = false;
        $('#goods_main').on('click', '.sel', function () {
            if (!selok) {
                $(this).parent().find('.selmain').slideToggle(100, function () {
                    selok = true;
                });
                var _this = $(this).find('span').text();
                $('#goods_main .selmain div').each(function (i, item) {
                    if (_this == $(item).text()) {
                        $(item).css('color', '#bc338b');
                        $(item).siblings().css('color', 'black');
                    }
                })
            }
        })
        $('#goods_main').on('click', '.selmain div', function () {
            $('#goods_main .sel span').html($(this).text())
        })
        $('#goods_main').on('mouseenter', '.selmain div', function () {
            $(this).css('color', '#bc338b');
            $(this).siblings().css('color', 'black');
        })

        $(window).on('click', function () {
            if (selok) {
                $('#goods_main').find('.selmain').slideToggle(100, function () {
                    selok = false;
                });

            }
        })

        //渲染产品列表
        var num = 60;
        var ipage = 1;
        var ipam = 0;
        var isok1 = false;
        var isok2 = false;
        var udok = true;
        var updown = 'up';

        $('#goods_main .listbox .sort span:eq(4)').click(function () {
            if (udok) {
                updown = 'down';
                udok = false;
            } else {
                updown = 'up';
                udok = true;
            }
            init(ipage, updown);
        })
        //初始渲染
        function init(nowipage, ud) {
            var app = new Promise(function (rendering) {
                $.ajax({
                    type: "get",
                    url: "../api/goodslist.php",
                    data: 'num=' + num + '&ipage=' + nowipage + '&isud=' + ud,
                    success: function (str) {
                        rendering(str)
                    }
                });
            });
            app.then(function (str) {
                var obj = JSON.parse(str);
                alluse(obj)
                if (obj.isud == 'up') {
                    $('#goods_main .listbox .sort span:eq(4) i').css('background', 'url(../css/img/btnup.png)');
                } else {
                    $('#goods_main .listbox .sort span:eq(4) i').css('background', 'url(../css/img/btndown.png)');
                }

            })
        }
        init(ipage, updown);

        function alluse(obj) {
            var html = obj.np.map(function (item) {
                var imgarr = item.imgpath.split('&');
                return ` <li class="list"  data-id="${item.gid}">
                        <div class="box">
                            <a href="###" class="img_vol">
                                <img src="${imgarr[0]}" alt="" class="brow_img">
                            </a>
                        </div>
                        <div class="opt">
                            <span>
                                <img src="${imgarr[0]}" alt="">
                            </span>
                            <span>
                                <img src="${imgarr[1]}" alt="">
                            </span>
                            <span>
                                <img src="${imgarr[2]}" alt="">
                            </span>
                        </div>
                        <span class="price">批发：￥${item.price}</span>
                        <span class="sales">成交额￥${item.price}</span>
                        <p class="name">${item.name}</p>
                        <span class="data_packet">数据包</span>
                        <span class="incart">加入进货单</span>
                        <div class="placeof_origin">
                        ${item.origin}：LKN
                        </div>
                        <span class="nowsal">现货销售</span>
                        <span class="uptime">上架时间：2019/02</span>
                    </li>`
            }).join('');
            $('#vol_list').html(html);

            ipam = Math.ceil(obj.nr / obj.num)
            var html2 = '<span id="fist">首页</span><span id="pre">上一页</span>';
            if (obj.ipage <= 3) {
                for (var i = 0; i < 5; i++) {
                    html2 += '<li data-id="' + (i + 1) + '">' + (i + 1) + '</li>';
                }
            } else if (obj.ipage > 3 && obj.ipage < ipam - 2) {
                for (var i = obj.ipage * 1 - 2; i < obj.ipage * 1 + 3; i++) {
                    html2 += '<li data-id="' + i + '">' + i + '</li>';
                }
            } else if (obj.ipage >= ipam - 2) {
                for (var i = ipam - 4; i < ipam + 1; i++) {
                    html2 += '<li data-id="' + i + '">' + i + '</li>';
                }
            }
            if (ipam > 5 && ipam - obj.ipage > 2) {
                html2 += '<i>...</i>';
            }
            html2 += '<span id="next">下一页</span><span id="last">尾页</span>';
            $('#pig').html(html2);

            $ipli = $('#pig li')
            if (obj.ipage <= 3) {
                $ipli.eq(obj.ipage - 1).addClass('nice');
            } else if (obj.ipage > 3 && obj.ipage <= ipam - 2) {
                $ipli.eq(2).addClass('nice');
            } else if (obj.ipage == ipam - 1) {
                $ipli.eq(3).addClass('nice');
            } else if (obj.ipage == ipam) {
                $ipli.eq(4).addClass('nice');
            }

            ipage = obj.ipage;
            if (ipage != 1) {
                isok1 = true;
            } else {
                isok1 = false;
            }
            if (ipage != ipam) {
                isok2 = true;
            } else {
                isok2 = false;
            }

            var list = document.getElementsByClassName('list');
            var aDet = document.getElementsByClassName('brow_img');
            for (i = 0; i < list.length; i++) {
                list[i].onclick = function (ev) {
                    if (ev.target.className == 'brow_img' || ev.target.className == 'name') {
                        location.href = 'details.html?gid=' + this.dataset.id;
                    }
                }
            }
        }



        var pig = document.getElementById('pig');
        pig.onclick = function (ev) {
            if (ev.target.tagName == 'LI') {
                init(ev.target.innerHTML, updown);
            }
            if (ev.target.id == 'fist') {
                if (isok1) {
                    init(1, updown);
                }
            }
            if (ev.target.id == 'pre') {
                if (isok1) {
                    init(ipage - 1, updown);
                }
            }

            if (ev.target.id == 'last') {
                if (isok2) {
                    init(ipam, updown);
                }
            }
            if (ev.target.id == 'next') {
                if (isok2) {
                    init(ipage * 1 + 1, updown);
                }
            }
        }
    });
});
