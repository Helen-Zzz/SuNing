// top点击
$login_btn = $('main div.w div.r div.top a')
console.log($login_btn)
$login_btn.on('click',function(){
    $login_btn.css('border-bottom','0')
    var index = $(this).index()
    $(this).css('border-bottom','3px solid #f70')
    $login_btn.parent().next().children('.mid').css('display','none')
    $login_btn.parent().next().children('.mid').eq(index).css('display','block')
    console.log($login_btn.parent().next().children('.mid').eq(index))
    console.log('===='+index)
    console.log('++++'+$login_btn.index('1'))
})