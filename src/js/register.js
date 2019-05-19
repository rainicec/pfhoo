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


        // 注册同意选项
        $('#register').on('click', '.check_img', function () {
            if ($('#check').is(':checked')) {
                $('#check').prop('checked', false)
                $(this).css('background', '#fff')
            } else {
                $('#check').prop('checked', true)
                $(this).css('background', "url(../css/img/commom-s50680dba8f.png) 0 -46px")
            }

        })

        //注册信息验证
        var twpok = false;//用于判断手机跟密码正则是否通过
        var twwok = false;
        function verification() {
            $('#phone').blur(function () {
                if ($(this).val()) {//非空验证
                    if (checkReg.tel($(this).val())) {//手机号正则验证
                        $('#phone').next().html(' ');
                        $('#phone').next().css('background', 'url(../css/img/youright.png) no-repeat 0 5px');
                        twpok = true;
                    } else {
                        $(this).next().html('手机号码格式不正确');
                        $(this).next().css('background', 'url(../css/img/youwarn.png) no-repeat 0 5px')
                    }
                } else {
                    if ($(this).next().html()) {
                        $(this).next().css('background', 'url(../css/img/youwarn.png) no-repeat 0 5px');
                        $(this).next().html('手机号码必填')
                    }
                }
            })

            $('#password').blur(function () {
                if ($(this).val()) {//非空验证
                    if (checkReg.password($(this).val())) {//密码正则验证
                        $('.pswts').html(' ');
                        $('.pswts').css('background', 'url(../css/img/youright.png) no-repeat 0 5px');
                        twwok = true;
                    } else {
                        $('.pswts').html('密码长度必须是6到20位');
                        $('.pswts').css('background', 'url(../css/img/youwarn.png) no-repeat 0 5px')
                    }
                } else {
                    if ($('.pswts').html()) {
                        $('.pswts').css('background', 'url(../css/img/youwarn.png) no-repeat 0 5px')
                        $('.pswts').html('密码必填')
                    }
                }
            })

        }
        verification()

        $('#register').on('mouseenter', '.code', function () {
            $(this).css('background', '#c6c6c6')
        })
        $('#register').on('mouseleave', '.code', function () {
            $(this).css('background', '#f5f5f5')
        })

        //点击弹出验证码弹窗
        var yznum = 0;
        var btntrue = true;//用于判断发送验证码按钮可否点击
        var nokong = false;//用于判断信息填写完整性
        var pswok = false;//用于判断两次密码一致性

        $('#register').on('click', '.code', function () {
            if ($('#phone').val() && $('#password').val()) {
                nokong = true;
                if ($('#password').val() == $('#passwordagain').val()) {
                    pswok = true;
                }
            }
            if (nokong && pswok) {
                if (twpok && twwok) {
                    if (btntrue) {
                        yznum = parseInt(Math.random() * 9000 + 1000);
                        $('#cobox').css('display', 'block');
                        $('#cobox span').eq(1).html(yznum)
                        btntrue = false;
                    }
                }
            } else if (!nokong) {
                $('.inpnokong').css('display', 'block');
                $('.inpnokong').html('请填写完整信息');
                setTimeout(function () {
                    $('.inpnokong').css('display', 'none');
                }, 2000)
            } else if (!pswok) {
                $('.inpnokong').css('display', 'block');
                $('.inpnokong').html('两次密码不一致');
                setTimeout(function () {
                    $('.inpnokong').css('display', 'none');
                }, 2000)
            }


        })
        $('#cobox').on('click', 'i', function () {
            console.log(1)
            yznum = parseInt(Math.random() * 9000 + 1000);
            $('#cobox span').eq(1).html(yznum)
        })


        //关闭验证码弹窗
        $('#cobox').on('click', '.close', function () {
            $('#cobox').css('display', 'none');
            btntrue = true;
        })

        var phoneconum = 0;//手机验证码
        //验证码弹窗验证+发送手机验证码
        $('#cobox').on('click', '.cobox_btn', function () {
            phoneconum = parseInt(Math.random() * 9000 + 1000);
            if ($('.codenow').val() == yznum) {
                var pcd = new Promise(function (resolve) {
                    $.ajax({//验证手机号是否被注册
                        type: "get",
                        url: "../api/register.php",
                        data: "phone=" + $('#phone').val(),
                        success: function (response) {
                            resolve(response);
                        }
                    });
                })

                pcd.then(function (data) {
                    if (data == 'yes') {
                        $('.coboxok').css('display', 'block');
                        $('#cobox').css('display', 'none');
                        setTimeout(function () {
                            $('.coboxok').css('display', 'none');
                        }, 3000);
                        $.ajax({//未注册发送手机验证码
                            type: "post",
                            url: "../api/phonecode.php",
                            data: {
                                'num': phoneconum,
                                'phone': $('#phone').val()
                            },
                            success: function (response) {
                                var nowtime = 60;
                                var cxfs = setInterval(function () {
                                    $('#register .code').html('重新发送(' + nowtime + ')')
                                    nowtime--;
                                    if (nowtime < 0) {
                                        clearInterval(cxfs);
                                        btntrue = true;
                                        $('#register .code').html('重新发送')
                                    }
                                }, 1000)
                            }
                        });
                    } else {
                        $('.phonereged').css('display', 'block');
                        setTimeout(function () {
                            $('.phonereged').css('display', 'none');
                        }, 3000)
                    }
                });
            } else {
                $('.coboxno').css('display', 'block');
                setTimeout(function () {
                    $('.coboxno').css('display', 'none');
                }, 3000)
            }
        })



        //注册按钮功能:验证必填行
        $('#regbtn').click(function () {
            if (!$('#phone').val()) {
                $('#phone').next().html('手机号码必填');
                $('#phone').next().css('background', 'url(../css/img/youwarn.png) no-repeat 0 5px')
            }
            if (!$('#password').val()) {
                $('.pswts').html('密码必填');
                $('.pswts').css('background', 'url(../css/img/youwarn.png) no-repeat 0 5px')
            }
            if (!$('#password').val()) {
                $('.codets').html('请填写手机验证码');
                $('.codets').css('background', 'url(../css/img/youwarn.png) no-repeat 0 5px')
            }
            verification()

            //验证用户输入的手机验证码
            if ($('#phonecode').val() == phoneconum) {
                $.ajax({
                    type: "post",
                    url: "../api/register.php",
                    data: {
                        'phonenow': $('#phone').val(),
                        'psw': $('#password').val()
                    },
                    success: function (response) {
                        if (response) {
                            setCookie('user', $('#phone').val(), 7);
                            location.href = '../index.html';
                        }
                    }
                });
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
    })
})