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


        // 记住我勾选
        $('#login').on('click', '.check_img', function () {
            if ($('#check').is(':checked')) {
                $('#check').prop('checked', false)
                $(this).css('background', '#fff')
            } else {
                $('#check').prop('checked', true)
                $(this).css('background', "url(../css/img/commom-s50680dba8f.png) 0 -46px")
            }
        })

        //切换登录方式
        $('#login').on('click', 'h2 span', function () {
            if ($(this).index() == 0) {
                $('#login .pwmain').css('display', 'block');
                $('#login .codemain').css('display', 'none');
                $(this).css({
                    'color': '#bc338b',
                    'background': '#fff',
                    'border': '1px solid #dcdcdc',
                    'border-bottom': 0,
                })
                $(this).siblings().css({
                    'border': 0,
                    'color': 'black',
                    'background': 'transparent',
                })
            } else {
                $('#login .pwmain').css('display', 'none');
                $('#login .codemain').css('display', 'block');
                $(this).css({
                    'color': '#bc338b',
                    'background': '#fff',
                    'border': '1px solid #dcdcdc',
                    'border-bottom': 0,
                })
                $(this).siblings().css({
                    'border': 0,
                    'color': 'black',
                    'background': 'transparent',
                })
            }
        })


        //帐号登录验证
        $('#login .pwmain').on('click', '.logbtn', function () {
            var _this = $(this);
            if (_this.parent().find('.phone').val() && _this.parent().find('.password').val()) {
                $.ajax({
                    type: "post",
                    url: "../api/login.php",
                    data: "phone=" + _this.parent().find('.phone').val(),
                    success: function (response) {
                        if (response == 'no') {
                            $('.pswfalse').css('display', 'block');
                            setTimeout(function () {
                                $('.pswfalse').css('display', 'none');
                            }, 3000)
                        } else {
                            var arr = JSON.parse(response);
                            var datapsw = arr[0].password;
                            if (datapsw) {
                                $('.pswts').html('');
                                $('.pswts').css('background', '')
                                if (_this.parent().find('.password').val() == datapsw) {
                                    setCookie('user', _this.parent().find('.phone').val(), 7);
                                    location.href = '../1index.html'
                                } else {
                                    $('.pswfalse').css('display', 'block');
                                    setTimeout(function () {
                                        $('.pswfalse').css('display', 'none');
                                    }, 3000)
                                }
                            } else {
                                _this.parent().find('.pswts').html('密码必填');
                                $('.pswts').css('background', 'url(../css/img/youwarn.png) no-repeat 0 5px')
                            }
                        }


                    }
                });
            }
            if (!_this.parent().find('.phone').val()) {
                _this.parent().find('.phonets').html('手机号码必填');
                _this.parent().find('.phonets').css('background', 'url(../css/img/youwarn.png) no-repeat 0 5px')
            } else {
                _this.parent().find('.phonets').html('');
                _this.parent().find('.phonets').css('background', '')
            }
            if (!_this.parent().find('.password').val()) {
                _this.parent().find('.pswts').html('密码必填');
                _this.parent().find('.pswts').css('background', 'url(../css/img/youwarn.png) no-repeat 0 5px')
            } else {
                _this.parent().find('.pswts').html('');
                _this.parent().find('.pswts').css('background', '')
            }

        })

        $('#login .pwmain').on('blur', '.phone', function () {
            if ($(this).val()) {
                $(this).next().html('');
                $(this).next().css('background', '');
            }
        })
        $('#login .pwmain').on('blur', '.password', function () {
            if ($(this).val()) {
                $(this).next().html('');
                $(this).next().css('background', '');
            }
        })


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


        $('#main').on('click', '.reg', function () {
            location.href = 'register.html'
        })
        //短信登录验证
        // $('#login .codemain').on('click', '.logbtn', function () {
        //     var _this = $(this);
        //     if (_this.parent().find('.phone').val() && _this.parent().find('.password').val()) {
        //         $.ajax({
        //             type: "post",
        //             url: "../api/login.php",
        //             data: "phone=" + _this.parent().find('.phone').val(),
        //             success: function (response) {
        //                 if (response == 'no') {
        //                     $('.pswfalse').css('display', 'block');
        //                     setTimeout(function () {
        //                         $('.pswfalse').css('display', 'none');
        //                     }, 3000)
        //                 } else {
        //                     var arr = JSON.parse(response);
        //                     var datapsw = arr[0].password;
        //                     if (datapsw) {
        //                         $('.pswts').html('');
        //                         $('.pswts').css('background', '')
        //                         if (_this.parent().find('.password').val() == datapsw) {
        //                             setCookie('user', _this.parent().find('.phone').val(), 7);
        //                             location.href = '../1index.html'
        //                         } else {
        //                             $('.pswfalse').css('display', 'block');
        //                             setTimeout(function () {
        //                                 $('.pswfalse').css('display', 'none');
        //                             }, 3000)
        //                         }
        //                     } else {
        //                         $('.pswts').html('请填写手机验证码');
        //                         $('.pswts').css('background', 'url(../css/img/youwarn.png) no-repeat 0 5px')
        //                     }
        //                 }


        //             }
        //         });
        //     }
        //     if (!_this.parent().find('.phone').val()) {
        //         $('.phonets').html('手机号码必填');
        //         $('.phonets').css('background', 'url(../css/img/youwarn.png) no-repeat 0 5px')
        //     } else {
        //         $('.phonets').html('');
        //         $('.phonets').css('background', '')
        //     }
        //     if (!_this.parent().find('.password').val()) {
        //         $('.pswts').html('请填写手机验证码');
        //         $('.pswts').css('background', 'url(../css/img/youwarn.png) no-repeat 0 5px')
        //     } else {
        //         $('.pswts').html('');
        //         $('.pswts').css('background', '')
        //     }

        // })
    })
})