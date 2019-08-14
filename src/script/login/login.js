// top点击
$login_btn = $('main div.w div.r div.top a')
// console.log($login_btn)
$login_btn.on('click',function(){
    $login_btn.css('border-bottom','0')
    var index = $(this).index()
    $(this).css('border-bottom','3px solid #f70')
    $login_btn.parent().next().children('.mid').css('display','none')
    $login_btn.parent().next().children('.mid').eq(index).css('display','block')
    // console.log($login_btn.parent().next().children('.mid').eq(index))
    // console.log('===='+index)
    // console.log('++++'+$login_btn.index('1'))
})

// 错误信息
$errorP = $('main div.w div.middle div.middle2 p.error')
$inputName = $('main div.w div.middle div.middle2 div.name input')
$inputPw = $('main div.w div.middle div.middle2 div.pw input')
$loginSubmit = $('main div.w div.middle div.middle2>input')
$loginSubmit.click(function(){
    if(! /^\w{6,16}$/.test($inputPw.val()) || !/^[a-zA-Z0-9_]{6,20}$/.test($inputName.val())){
        $errorP.html('请输入正确用户名及密码').css('display','block');
    } else {
        // 发送Ajax请求 判断用户名密码是否匹配 跳转还是报错
        var xhr = new XMLHttpRequest()
        xhr.open('post','../php/login.php',true)
        xhr.onload = function(){
            if(this.status<200 || this.status>=300)return;
            if(this.responseText){
                $errorP.css('display','none')
                location.href('../index.html')
            }
            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
            xhr.send('name='+$inputName.val()+'&pw='+$inputPw.val())
        }
        // $errorP.css('display','none')
        // location.href = '../../index.html'

    }
    // console.log('meizou')
})