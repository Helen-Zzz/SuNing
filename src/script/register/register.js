// nav shou点击消失
function nav_shou(){
    $('nav.shou div.shou div').click(function(){
        $(this).parents('nav.shou').hide()
    })
}
nav_shou()