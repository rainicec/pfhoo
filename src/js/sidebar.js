
(function () {

    //右侧固定栏鼠标移入提示信息
    $('#sidebar').on('mouseover', '.minicon li', function () {
        $('#sidebar .hide_inf li').eq($(this).index()).show(150, 'swing')
    })

    $('#sidebar').on('mouseout', '.minicon li', function () {
        $('#sidebar .hide_inf li').eq($(this).index()).hide(150, 'swing')
    })

    //回到顶部
    function gotop(id) {
        var goTop = document.getElementById(id);

        $(window).scroll(function () {
            if (window.scrollY > 110) {
                goTop.style.display = 'block';
            } else {
                goTop.style.display = 'none';
            }
        })

        goTop.onclick = function () {
            var scrollTop = window.scrollY;
            var num = 250;
            var timer = setInterval(function () {
                scrollTop -= num;
                if (scrollTop < 700) {
                    num = 50;
                }
                if (scrollTop < 0) {
                    clearInterval(timer);
                    window.scrollTo(0, 0);
                } else {
                    window.scrollTo(0, scrollTop);
                }
            }, 30);
        }
    }
    gotop('totop');

})()