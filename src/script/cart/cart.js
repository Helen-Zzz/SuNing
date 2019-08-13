// nav 左边第一个li 的二级菜单
(function () {
    var ul1Li = $('nav.top .w ul li.write')
    // console.log(ul1Li)
    ul1Li.on('mouseenter', function () {
        // console.log($(this))
        $(this).children('.sec').css('display', 'block')
    }).on('mouseleave', function () {
        $(this).children('.sec').css('display', 'none')
    })
    // nav loca
    var liLoca = $('nav.top .w ul.l li.loca')
    liLoca.on('click', function (evt) {
        evt.stopPropagation()
        $(this).children('div.loca').css('display', 'block')

        liLoca.find('div.loca a').on('click', function (evt) {
            evt.stopPropagation()
            var inner = $(this).html()
            liLoca.children('a').eq(0).html("<span class='iconfont icon-_fuzhi' style='color:#f70'></span>" + inner)
            $($(this).parent()).parent().css('display', 'none')
        })
    })
})()
