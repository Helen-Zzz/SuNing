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
            // console.log(liLoca.children('a').eq(0).html('<span class="iconfont icon-_fuzhi"
            // style="color:#f70"></span>'+inner))
            liLoca.children('a').eq(0).html("<span class='iconfont icon-_fuzhi' style='color:#f70'></span>" + inner)
            $($(this).parent()).parent().css('display', 'none')
            // console.log(liLoca.children('div.loca'))
        })
    })
})()

// imgs轮播图
// (function(){
var currentIndex = 0;
var bannerColor = ['#ff3a4b', '#b31828', '#ff6877', '#4318e4', '#4b83fc', '#7b49e0', '#5906ca', '#7d00ff']
auto()
function slide(index) {
    if (index > 7) { index = 0; currentIndex = 0 }
    if (index < 0) { index = 7; currentIndex = 7 }
    $('div.imgBan ul.imgs li.current').removeClass('current')
    $('div.imgBan ul.imgs li').eq(index).addClass('current')
    $('div.imgBan ul.dotes li.focus').removeClass('focus')
    $('div.imgBan ul.dotes li').eq(index).addClass('focus')
    $('div.banner').css('background', bannerColor[currentIndex])
}
var id;
function auto() {
    id = setInterval(function () {
        toNext()
    }, 3000)
}
function stop() {
    clearInterval(id)
}
function toNext() {
    currentIndex++;
    slide(currentIndex)
}
function toPrev() {
    currentIndex--;
    slide(currentIndex)
}
$('div.imgBan span.left').click(function () {
    toPrev()
})
$('div.imgBan span.right').click(function () {
    toNext()
})
$('div.imgBan ul.imgs').mouseover(function () {
    stop()
})
$('div.imgBan ul.imgs').mouseout(function () {
    auto()
})
$('div.imgBan ul.dotes li').mouseover(function () {
    currentIndex = $(this).index();
    stop()
    slide(currentIndex)
}).mouseout(function () { auto() })
// })()


// banner手风琴效果TODO:
var banner_down_one = $('div.banner div.down ul.one li')
var banner_down_two = $('div.banner div.down ul.two>li')
var banner_down_two_word = $('div.banner div.down ul.two>li div.word')
banner_down_one.on('mouseenter', function () {
    var index = $(this).index()
    $(this).parent().css('display', 'none')
    banner_down_two.parent().css('display', 'block')
    banner_down_two.removeClass('current')
    banner_down_two.eq(index).addClass('current')
})

banner_down_two.on('mouseenter', function (evt) {
    evt.stopPropagation()
    banner_down_two.removeClass('current')
    //隐藏word
    $(this).find('.word').hide()
    $(this).addClass('current')
    var index = $(this).index()
})
banner_down_two.parent().on('mouseleave', function (evt) {
    evt.stopPropagation()
    $(this).css('display', 'none')
    banner_down_one.parent().css('display', 'block')
})

//监听transition结束的事件
banner_down_two.on('transitionend', function () {
    console.log('=====================动画时间结束.width=', $(this).width())
    if ($(this).width() === 53) {
        $(this).find('.word').show()
    }
})

// banner 文字轮播
var banner_word_ul = $('div.banner div.hello div.middle ul.middle')
var idBt1, idBt2;
var top_time = 0

function banner_top(time) {
    // console.log('cishi' + time)
    if (time === 2) {
        banner_word_ul.css('transition', '0s')
        banner_word_ul.css('top', '0')
        top_time = time = 1
        idBt2 = setInterval(function () {
            banner_word_ul.css('transition', 'top .5s')
            banner_word_ul.css('top', '-180px')
            clearInterval(idBt2)
        }, 50)
        // console.log('================')
        return;
    }
    time = (time + 1) * (-180)
    banner_word_ul.css('top', time + 'px')
    top_time++
    // console.log('====' + top_time)
    // console.log('==top' + banner_word_ul.css('top'))
}
function autoBanner() {
    idBt1 = setInterval(function () {
        banner_top(top_time)
    }, 2000)
}
banner_word_ul.mouseenter(function () {
    clearInterval(idBt1)
}).mouseleave(function () {
    autoBanner()
})
autoBanner()

// 回到顶部
function aside2Top() {
    var aside2top = $('div.aside aside.right div.bottom a.toTop,div.aside aside.left ul li.asidetoTop')
    // var asideLeft2top = $()
    // console.log(aside2top)
    var toTopInter;
    aside2top.click(function () {
        toTopInter = setInterval(function () {
            var nowTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
            document.documentElement.scrollTop = nowTop - 50;
            document.body.scrollTop = nowTop - 50;
            if (nowTop === 0) {
                clearInterval(toTopInter)
            }
        }, 16)
    })
    window.onmousewheel = function () {
        clearInterval(toTopInter)
    }
}
aside2Top()

// 底端是否显示
function asideShowBottom() {
    var asideBottom = $('div.aside aside.bottom ')
    var showBottom
    showBottom = setInterval(function () {
        var nowTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
        if (nowTop > 1000) {
            asideBottom.css('bottom', '0px')
            // asideBottom.css('display','block')
        } else {
            asideBottom.css('bottom', '-100px')
            // asideBottom.css('display','none')
        }
    }, 16)
}
asideShowBottom()

// 吸顶
function xiding() {
    var asideTop = $('div.aside aside.top')//不定位static
    var asideCart = $('nav.top ul.r li.cart')//re 没坐标
    var asideCartSec = asideCart.find('div,rTre')
    var asideInput = $('header div.w div.ab div.search')//re 没坐标
    var asideNav = $('nav.main div.w div.nav')//ab 没坐标 可以是l0 t0
    var asideLogin = $('nav.top ul.r li.login')//wu
    var asideRegister = $('nav.top ul.r li.register')//wu
    console.log(asideCart)
    var showTop
    window.onscroll = function(){
        var nowTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        if (nowTop > 800) {
            asideTop.css('top', '0')
            // console.log('成功')
            asideCart.css({     // 改定位cart
                position: 'fixed',
                right: '100px',
                top: '5px',
                width: '60px'
            })
            asideCartSec.css('left', '-272px')
            asideInput.css({        //改定位input
                position:'fixed',
                left:'400px',
                top:'-25px',
                zIndex:8
            })
            asideNav.css({      //改坐标 nav
                position:'fixed',
                top:'5px',
                left:'120px'
            })
            asideNav.find('ul.sec').css({
                display:'none'
            })
            asideNav.hover(function(){
                asideNav.find('ul.sec').css({
                    display:'block',
                })
            },function(){
                asideNav.find('ul.sec').css({
                    display:'none'
                })
            })

        } else {
            asideTop.css('top', '-100px')    // 改定位cart
            asideCart.css({
                position: 'relative',
                top: '0px',
                right: '0',
                width: '60px'
            })
            asideCartSec.css({
                top: '35px',
                left: ''
            })
            asideInput.css({        //改定位input
                position:'relative',
                top:'',
                left:'',
                zIndex:1
            })
            asideNav.css({      //改定位nav
                position:'absolute',
                top:'',
                left:''
            })
            asideNav.find('ul.sec').css({
                display:'block'
            })
        }

    }
}
xiding()
