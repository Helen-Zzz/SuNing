// nav shou点击消失
function nav_shou() {
    $('nav.shou div.shou div').click(function () {
        $(this).parents('nav.shou').hide()
    })
}
nav_shou()

// 点击注册验证手机号验证码密码是否注册成功 是否跳转登录页
$errorP = $('main div.all p.error')
$registerSubmit = $('main div.all div.submit')
$inputPhone = $('main div.all div.phone input')
$inputPw = $('main div.all div.pw input')
$registerSubmit.click(function () {
    console.log($inputPw.val())
    console.log($inputPhone.val())
    if (!/^1[3-9]\w{9}$/.test($inputPhone.val())) {
        $errorP.html('请输入正确手机号！')
        $errorP.css('display', 'block')
    } else if (!/^\w{6,16}$/.test($inputPw.val())) {
        $errorP.html('密码只能由6-16位 数字、字母、下划线组成')
        $errorP.css('display', 'block')
        console.log('zouemizou')
    } else {
        $.ajax({
            method: 'post',
            url: '../../php/register.php',
            data: {
                phone: $inputPhone.val(),
                pw: $inputPw.val()
            },
            success: function (resp) {
                if (resp.result === 'chong') {
                    $errorP.html('此手机号已经注册过，可以直接登录')
                    $errorP.css('display', 'block')
                } else if (resp.result === true){
                    $errorP.css('display', 'block')

                    $errorP.html('注册成功')
                    $errorP.css({
                        background:"#b3d70d",
                        color:'red'
                    })
                    setTimeout(function(){
                        location.href='../../html/login/login.html'
                    },500)
                }
                console.log('成功')

            },
            error: function () {
                console.log('ajax发送失败')
            }
        }
        )
    }
    console.log('=====')
})