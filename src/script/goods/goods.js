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
    console.log('===')
})();

// 如果cookie有值显示欢迎
if (document.cookie) {
    $('a.wel').html('欢迎回来')
    $('li.leave').css('display', 'block')
} else {
    $('a.wel').html('请登录')
    $('li.leave').css('display', 'none')
}

// 删除cookie
function removeCookie(name, path) {
    var date = new Date()
    date.setDate(date.getDate() - 100)
    document.cookie = name + '="";path=' + path + ';expires=' + date;
}
$('li.leave a.leave').click(function () {
    removeCookie('userid', '/')
    $('a.wel').html('请登录')
    $('li.leave').css('display', 'none')
    $('main div.null').css('display', 'block')
    $('main div.goods').css('display', 'none')

});

// 放大镜效果
(function () {
    var $small = $('main div.l div.img div.small')
    var $mask = $('main div.l div.img div.small div.mask')
    var $big = $('main div.l div.img div.small div.big')
    $small.mouseenter(function () {
        $mask.fadeIn(200)
        $big.fadeIn(200)
    }).mouseleave(function () {
        $mask.hide(200)
        $big.hide(200)
    })
    $small.mousemove(function (evt) {
        var x = evt.offsetX
        var y = evt.offsetY
        x = x - $mask.width() / 2
        y = y - $mask.height() / 2
        if (x < 0) { x = 0 }
        if (y < 0) { y = 0 }
        if (x > $small.width() - $mask.width()) {
            x = $small.width() - $mask.width()
        }
        if (y > $small.height() - $mask.height()) {
            y = $small.height() - $mask.height()
        }

        $mask.css({
            left: x + 'px',
            top: y + 'px'
        })
        $big.css({
            backgroundPosition:-2*x+'px '+(-2)*y+'px'
        })
    })
})();


// 改数量设置
(function(){
    // function price($li){
    //     var price = parseInt($li.find('div.price span').html())
    //     var count = parseInt($li.find('i').html())
    //     console.log(count)
    //     $li.find('div.pay').html('￥'+price*count)
    // }
    $count = $('main div.r div.count')   //事件代理
    $count.on('click','span.min',function(){
        var count = $(this).next().html()
        if(count==='1')return;
        count--
        $(this).next().html(count)
        // price($(this).parents('li'))
    })
    $count.on('click','span.add',function(){
        var count = $(this).prev().html()
        if(count==='99')return;
        count++
        $(this).prev().html(count)
        // price($(this).parents('li'))
    })
})();

// 加入购物车
var $goodsname = $('main div.w div.r div.title h3').html()
var $describe = $('main div.w div.r div.title p.title').html()
var $price = $('main div.w div.r div.menu div.right').html().slice(1)
var $count = $('main div.w div.r div.count div.right p.top span.count').html()
var $userid = document.cookie.split('=')[1]
// console.log($goodsname)
var cart = $('main div.w div.r div.count div.right div.down a.cart')
cart.click(function(){
    if($userid === undefined){
        alert('请先登录，再添加购物车')
    } else {
        $.ajax({
            method:'post',
            url:'../../php/goods.php',
            data:{
                goodsname:$goodsname,
                describe:$describe,
                price:$price,
                count:$('main div.w div.r div.count div.right p.top span.count').html(),
                userid:$userid
            },
            success:function(resp){
                alert('添加成功')
            },
            error:function(){
                console.log('shibai')
            }
        })
    }
})


