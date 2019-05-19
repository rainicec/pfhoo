(function () {

    //留言栏隐藏显示
    var lamok = true;
    $('#lam').on('click', '.hide_show', function () {
        $('#lam .lam_send').slideToggle(10);
        if (lamok) {
            $('#lam').css('bottom', '-275px')
            $('#lam .hide_show i').css({
                'font-size': '10px',
                'line-height': '10px',
                'border-width': '1.5px',
                'border': '1.5px solid'
            })
            $('#lam .hide_show').css({
                'padding': '10px'
            })
        } else {
            $('#lam').css('bottom', '0')
            $('#lam .hide_show i').css({
                'font-size': '0',
                'line-height': '0',
                'border-bottom': '2px'
            })
            $('#lam .hide_show').css({
                'padding': '16px 8px'
            })
        }
        lamok = !lamok;
    })

})()