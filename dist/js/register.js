"use strict";require(["config"],function(){require(["jquery","head","common"],function(){$("#side").load("sidebar",function(){require(["sidebar"],function(){$("#side").on("click",".cart",function(){location.href="cart.html"})})}),$("#bottom_lam").load("bottom_con",function(){require(["bottom_con"])}),$("#foot").load("foot",function(){});var o=!0;$("#hide").click(function(){o=(o?($("#autinf").css("display","block"),$(this).attr("src","../css/img/trusted-web3_01.png")):($("#autinf").css("display","none"),$(this).attr("src","../css/img/trusted-web4_01.png")),!o)}),setTimeout(function(){$("#autinf").css("display","none"),$("#hide").attr("src","../css/img/trusted-web4_01.png")},3e3),$("#register").on("click",".check_img",function(){$("#check").is(":checked")?($("#check").prop("checked",!1),$(this).css("background","#fff")):($("#check").prop("checked",!0),$(this).css("background","url(../css/img/commom-s50680dba8f.png) 0 -46px"))});var n=!1,s=!1;function e(){$("#phone").blur(function(){$(this).val()?checkReg.tel($(this).val())?($("#phone").next().html(" "),$("#phone").next().css("background","url(../css/img/youright.png) no-repeat 0 5px"),n=!0):($(this).next().html("手机号码格式不正确"),$(this).next().css("background","url(../css/img/youwarn.png) no-repeat 0 5px")):$(this).next().html()&&($(this).next().css("background","url(../css/img/youwarn.png) no-repeat 0 5px"),$(this).next().html("手机号码必填"))}),$("#password").blur(function(){$(this).val()?checkReg.password($(this).val())?($(".pswts").html(" "),$(".pswts").css("background","url(../css/img/youright.png) no-repeat 0 5px"),s=!0):($(".pswts").html("密码长度必须是6到20位"),$(".pswts").css("background","url(../css/img/youwarn.png) no-repeat 0 5px")):$(".pswts").html()&&($(".pswts").css("background","url(../css/img/youwarn.png) no-repeat 0 5px"),$(".pswts").html("密码必填"))})}e(),$("#register").on("mouseenter",".code",function(){$(this).css("background","#c6c6c6")}),$("#register").on("mouseleave",".code",function(){$(this).css("background","#f5f5f5")});var t=0,c=!0,i=!1,a=!1;$("#register").on("click",".code",function(){$("#phone").val()&&$("#password").val()&&(i=!0,$("#password").val()==$("#passwordagain").val()&&(a=!0)),i&&a?n&&s&&c&&(t=parseInt(9e3*Math.random()+1e3),$("#cobox").css("display","block"),$("#cobox span").eq(1).html(t),c=!1):i?a||($(".inpnokong").css("display","block"),$(".inpnokong").html("两次密码不一致"),setTimeout(function(){$(".inpnokong").css("display","none")},2e3)):($(".inpnokong").css("display","block"),$(".inpnokong").html("请填写完整信息"),setTimeout(function(){$(".inpnokong").css("display","none")},2e3))}),$("#cobox").on("click","i",function(){console.log(1),t=parseInt(9e3*Math.random()+1e3),$("#cobox span").eq(1).html(t)}),$("#cobox").on("click",".close",function(){$("#cobox").css("display","none"),c=!0});var r=0;$("#cobox").on("click",".cobox_btn",function(){(r=parseInt(9e3*Math.random()+1e3),$(".codenow").val()==t)?new Promise(function(n){$.ajax({type:"get",url:"../api/register.php",data:"phone="+$("#phone").val(),success:function(o){n(o)}})}).then(function(o){"yes"==o?($(".coboxok").css("display","block"),$("#cobox").css("display","none"),setTimeout(function(){$(".coboxok").css("display","none")},3e3),$.ajax({type:"post",url:"../api/phonecode.php",data:{num:r,phone:$("#phone").val()},success:function(o){var n=60,s=setInterval(function(){$("#register .code").html("重新发送("+n+")"),--n<0&&(clearInterval(s),c=!0,$("#register .code").html("重新发送"))},1e3)}})):($(".phonereged").css("display","block"),setTimeout(function(){$(".phonereged").css("display","none")},3e3))}):($(".coboxno").css("display","block"),setTimeout(function(){$(".coboxno").css("display","none")},3e3))}),$("#regbtn").click(function(){$("#phone").val()||($("#phone").next().html("手机号码必填"),$("#phone").next().css("background","url(../css/img/youwarn.png) no-repeat 0 5px")),$("#password").val()||($(".pswts").html("密码必填"),$(".pswts").css("background","url(../css/img/youwarn.png) no-repeat 0 5px")),$("#password").val()||($(".codets").html("请填写手机验证码"),$(".codets").css("background","url(../css/img/youwarn.png) no-repeat 0 5px")),e(),$("#phonecode").val()==r&&$.ajax({type:"post",url:"../api/register.php",data:{phonenow:$("#phone").val(),psw:$("#password").val()},success:function(o){o&&(setCookie("user",$("#phone").val(),7),location.href="../index.html")}})}),getCookie("user")?($("#topnav .username").html(getCookie("user")),$("#topnav .loginout").html("退出"),$("#topnav .regsj").html("我的数据包"),$("#topnav .mesg").html("我的私信"),$("#topnav").on("click",".loginout",function(){removeCookie("user"),location.href="index.html"})):($("#topnav").on("click",".loginout",function(){location.href="login.html"}),$("#topnav").on("click",".regsj",function(){location.href="register.html"}))})});