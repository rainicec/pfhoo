require(['config'], function () {
    //引入模块
    require(['jquery', 'common', 'index'], function ($, res) {
        $('#head').load('html/head', function () {
            require(['head'], function () {
                // 顶部认证信息点击隐藏
                var hideok = true;
                $('#hide').click(function () {
                    if (hideok) {
                        $('#autinf').css('display', 'block');
                        $(this).attr('src', 'css/img/trusted-web3_01.png');
                        hideok = !hideok;
                    } else {
                        $('#autinf').css('display', 'none');
                        $(this).attr('src', 'css/img/trusted-web4_01.png');
                        hideok = !hideok;
                    }
                })

                //顶部认证信息先显示后隐藏
                setTimeout(function () {
                    $('#autinf').css('display', 'none');
                    $('#hide').attr('src', 'css/img/trusted-web4_01.png');
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
                        location.href = './html/login.html';
                    })
                    $('#topnav').on('click', '.regsj', function () {
                        location.href = './html/register.html';
                    })
                }
            })
        })

        //引入侧栏
        $('#side').load('html/sidebar', function () {
            require(['sidebar'], function () {
                $('#side').on('click', '.cart', function () {
                    location.href = './html/cart.html'
                })
            })
        })
        //引入底部留言框
        $('#bottom_lam').load('html/bottom_con', function () {
            require(['bottom_con'])
        })
        //引入底部
        $('#foot').load('html/foot', function () { })

    });
});
