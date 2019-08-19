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
})();

// 全选设置
(function(){
    $ul = $('main div.goods ul.goods')   //事件代理
    $all = $('main div.goods div.title p.p1 input')
    $little = $('main div.goods ul.goods input')
    $all.change(function(){
        $ul.find('input').prop('checked',$(this).prop('checked'))
    })
    $ul.on('click','input',function(){
        $(this).change(function(){
            $all.prop('checked',$('main div.goods ul.goods input:checked').length === $('main div.goods ul.goods input').length)
        })
    })
    // $little.change(function(){
    // })
})();

// 改数量设置
(function(){
    function price($li){
        var price = parseInt($li.find('div.price span').html())
        var count = parseInt($li.find('i').html())
        console.log(count)
        $li.find('div.pay').html('￥'+price*count)
    }
    $ul = $('main div.goods ul.goods')   //事件代理
    $ul.on('click','span.num span.min',function(){
        var count = $(this).next().html()
        if(count==='1')return;
        count--
        $(this).next().html(count)
        price($(this).parents('li'))
    })
    $ul.on('click','span.num span.add',function(){
        var count = $(this).prev().html()
        if(count==='99')return;
        count++
        $(this).prev().html(count)
        price($(this).parents('li'))
    })
})();

// 发送ajax 获取购物车信息
$.get('../../php/cart.php',function(resp){
    console.log(resp)
    if (resp === null){
        $('main div.null').css('display','block')
        $('main div.goods').css('display','none')
    } else {
        $('main div.null').css('display','none')
        $('main div.goods').css('display','block')

        var lis = resp.map(function(goods){
            return '<li goodsid='+goods.id+'><div class="check"><input type="checkbox"></div><dl><dt class="l"><img src="../../resource/imgs/banner_62_1.jpg" alt=""></dt><dd class="r"><h6>'+goods.goodsname+'</h6></dd></dl><div class="spec"><p class="spec">颜色：黑色</p></div><div class="price">￥<span>'+goods.price+'</span></div><div class="count"><span class="num"><span class="min en l">-</span><i>'+goods.count+'</i><span class="add en r">+</span></span></div><div class="pay">￥'+goods.price*goods.count+'</div><div class="dele">删除</div></li>'
        })
        $('main ul.goods').html(lis.join(''))
    }
})

// 如果cookie有值显示欢迎
if (document.cookie) {
    $('a.wel').html('欢迎回来')
    $('li.leave').css('display', 'block')
} else {
    $('a.wel').html('请登录')
    $('li.leave').css('display', 'none')
}

// 删除cookie
function removeCookie(name,path){
    var date = new Date()
    date.setDate(date.getDate()-100)
    document.cookie =name+'="";path='+path+';expires='+date;
}
$('li.leave a.leave').click(function () {
    removeCookie('userid', '/')
    $('a.wel').html('请登录')
    $('li.leave').css('display', 'none')
    $('main div.null').css('display','block')
    $('main div.goods').css('display','none')

})

    // 删除商品信息 删除数据库
    $ul.on('click','li div.dele',function(){
        var $goodsid = $(this).parent().attr('goodsid')
        // var $goodsname = $(this).prevAll('dl').find('h6').html()
        // var $descript = $(this).prevAll('div.spec').find('p').html()
        // var $price = $(this).prevAll('div.price').find('span').html()
        // var $count = $(this).prevAll('div.count').find('i').html()
        console.log($goodsid)
        $.ajax({
            method:'post',
            url:'../../php/cart_dele.php',
            data:{
                goodsid:$goodsid
            },
            success:function(){
                console.log('成功')
            },
            error:function(){
                console.log('失败')
            }
        })
        if($('li div.dele').length === 0){
            $('main div.null').css('display','block')
            $('main div.goods').css('display','none')    
        }
        $(this).parents('li').remove()

        // console.log($('li div.dele'))
    })
