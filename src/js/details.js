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


        //拿id查询数据库渲染页面
        var date = decodeURI(location.search);
        var str0 = date.slice(1);
        var obj0 = strToObj(str0);

        function init() {
            var fapp = new Promise(function (rendering) {
                $.ajax({
                    type: "get",
                    url: "../api/details.php",
                    data: 'gid=' + obj0.gid,
                    success: function (str) {
                        rendering(str)
                    }
                });
            })
            fapp.then(function (str) {
                var obj = JSON.parse(str);
                var imgarr = obj[0].imgpath.split('&');
                var html = `<div class="left">
                                <div class="img">
                                    <img src="${imgarr[0]}" alt="">
                                    <div class="lay"></div>
                                </div>
                                <div class="bigimg">
                                    <img src="${imgarr[0]}" alt="">
                                </div>
                                <ul class="xy clearfix">
                                    <li>
                                        <img src="${imgarr[0]}" alt="">
                                    </li>
                                    <li>
                                        <img src="${imgarr[1]}" alt="">
                                    </li>
                                    <li>
                                        <img src="${imgarr[2]}" alt="">
                                    </li>
                                    <li>
                                        <img src="${imgarr[3]}" alt="">
                                    </li>
                                </ul>
                                <ul class="keep clearfix">
                                    <li>&我要专属图</li>
                                    <li>
                                        <span></span>收藏货品</li>
                                    <li>
                                        <span></span>告诉我们更低的价格</li>
                                </ul>
                                <div class="btnbox">
                                    <input type="button" value="数据包">
                                    <input type="button" value="专属定制">
                                </div>
                            </div>
                            <div class="right">
                                <h2>${obj[0].name}</h2>
                                <ul class="shopname clearfix">
                                    <li>spu:${obj[0].spu}</li>
                                    <li>产业带：${obj[0].origin}</li>
                                    <li>店铺名称：${obj[0].shopname}</li>
                                </ul>
                                <ul class="pri">
                                    <li>
                                        <span>批发: ￥</span>
                                        <span class="price">${obj[0].price}.00</span>
                                    </li>
                                    <li>
                                        ≥1件
                                    </li>
                                </ul>
                                <ul class="sit">
                                    <li>
                                        <span>款式</span>
                                        <span>金属颜色/戒指大小</span>
                                    </li>
                                    <li>
                                        <img src="${imgarr[0]}" alt="">
                                        <span>镀银/8</span>
                                        <span>${obj[0].spu}</span>
                                        <span>$${obj[0].price}</span>
                                        <span>现货销售(库存${obj[0].stock})</span>
                                        <input type="button" class="reduce" value="-">
                                        <input type="text" class="buynum" value="0">
                                        <input type="button" class="plus" value="+">
                                    </li>
                                </ul>
                                <div class="buybox">
                                    <ul>
                                        <li>共
                                            <span>0</span>&nbsp;件</li>
                                        <li>￥
                                            <span>0</span>
                                        </li>
                                    </ul>
                                    <input type="button" value="加入数据包" class="inbag">
                                    <input type="button" value="加入进货单" class="incart">
                                </div>
                                <dl class="guarantee clearfix">
                                    <dt>交易保障:</dt>
                                    <dd>
                                        <img src="../css/img/details1.png" alt=""> 15天退换</dd>
                                    <dd>
                                        <img src="../css/img/details2.png" alt="">正品保障</dd>
                                    <dd>
                                        <img src="../css/img/details3.png" alt="">闪电发货</dd>
                                    <dd>
                                        <img src="../css/img/details4.png" alt="">安全购物</dd>
                                </dl>
                                <dl class="payment clearfix">
                                    <dt>支付方式:</dt>
                                    <dd>
                                        <img src="../css/img/details5.png" alt="">支付宝</dd>
                                    <dd>
                                        <img src="../css/img/details6.png" alt="">微信支付</dd>
                                    <dd>
                                        <img src="../css/img/details7.png" alt="">信用支付</dd>
                                </dl>
                            </div>`;
                $('#aff').html(html);

                function paita() {
                    $('#aff .xy li').each(function (i, item) {
                        if ($(item).find('img').attr('src') == $('#aff .left .img img').attr('src')) {
                            $(item).css('border', '2px solid #bc338b');
                            $(item).siblings().css('border', 'none')
                        }

                    })
                }
                paita();


                //切换图片小特效
                $('#aff').on('mouseenter', '.xy img', function () {
                    $('#aff .left .img img').attr('src', $(this).attr('src'));
                    $('#aff .left .bigimg img').attr('src', $(this).attr('src'));
                    paita()
                })


                //加减数量
                var buynum = 0
                $('#aff').on('click', '.reduce', function () {
                    buynum--
                    if (buynum < 0) {
                        buynum = 0
                    }
                    $('#aff .buynum').val(buynum);
                    anum()
                })
                $('#aff').on('click', '.plus', function () {
                    buynum++
                    if (buynum > obj[0].stock) {
                        buynum = obj[0].stock
                    }
                    $('#aff .buynum').val(buynum);
                    anum()
                })

                var regex = /^[0-9]*$/;
                $('#aff').on('keyup', '.buynum', function () {
                    if (regex.test($('#aff .buynum').val())) {
                        if ($('#aff .buynum').val() * 1 > obj[0].stock) {
                            buynum = obj[0].stock;
                        } else {
                            buynum = $('#aff .buynum').val()
                        }
                        $('#aff .buynum').val(buynum)
                    } else {

                        $('#aff .buynum').val(buynum)
                    }
                    anum()
                })

                function anum() {
                    $('#aff .buybox ul li:eq(0) span').text(buynum);
                    $('#aff .buybox ul li:eq(1) span').text(buynum * obj[0].price);
                }


                //加入购物车

                $('#aff').on('click', '.incart', function () {
                    if (buynum == 0) {
                        $('#tips').css('display', 'block');
                        $('#tips').text('购买数量最少为1');
                        setTimeout(function () {
                            $('#tips').css('display', 'none');
                        }, 2000)
                    } else {
                        if (getCookie('user')) {
                            $.ajax({
                                type: "get",
                                url: "../api/incart.php",
                                data: {
                                    "gid": obj0.gid,
                                    'user': getCookie('user'),
                                    'num': buynum
                                },
                                success: function (response) {
                                    if (response == 'ok') {
                                        $('#tips').css('display', 'block');
                                        $('#tips').text('添加成功');
                                        setTimeout(function () {
                                            $('#tips').css('display', 'none');
                                        }, 2000)
                                    }
                                }
                            });
                        } else {
                            $('#tips').css('display', 'block');
                            $('#tips').text('请先登录');
                            setTimeout(function () {
                                $('#tips').css('display', 'none');
                            }, 2000)
                        }
                    }
                })


                //放大镜
                $('#aff').on('mouseenter', '.img', function () {
                    $('#aff .bigimg').css('display', 'block');
                    $('#aff .lay').css('display', 'block');

                })

                $('#aff').on('mouseleave', '.img', function () {
                    $('#aff .bigimg').css('display', 'none');
                    $('#aff .lay').css('display', 'none');
                })

                $('#aff').on('mousemove', '.img', function (event) {
                    var x = event.pageX - $('#aff .img').offset().left - $('#aff .lay').width() / 2;
                    var y = event.pageY - $('#aff .img').offset().top - $('#aff .lay').height() / 2;

                    $('#aff .lay').css({
                        'top': y,
                        'left': x
                    })
                    $('#aff .bigimg img').css({
                        'margin-left': -x * 1.6,
                        'margin-top': -y * 1.6,
                    })
                    if (x < 0) {
                        $('#aff .lay').css('left', 0)
                        $('#aff .bigimg img').css('margin-left', 0)
                    }
                    if (x > $('#aff .img').width() - $('#aff .lay').width()) {
                        $('#aff .lay').css('left', $('#aff .img').width() - $('#aff .lay').width())
                        $('#aff .bigimg img').css('margin-left', -$('#aff .bigimg img').width() / 2)
                    }
                    if (y < 0) {
                        $('#aff .lay').css('top', 0)
                        $('#aff .bigimg img').css('margin-top', 0)
                    }
                    if (y > $('#aff .img').height() - $('#aff .lay').height()) {
                        $('#aff .lay').css('top', $('#aff .img').height() - $('#aff .lay').height())
                        $('#aff .bigimg img').css('margin-top', -$('#aff .bigimg img').height() / 2)
                    }
                })
            })
        };
        init();

        //商品信息选项卡
        $('#optcard').on('click', 'span', function () {
            $('#optcard .content').each(function (i, item) {
                $(item).css('display', 'none')
            })
            $('#optcard .content').eq($(this).index()).css('display', 'block');
        })
    });
});