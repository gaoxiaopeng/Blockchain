/**
 * Created by Echonessy on 2018/12/27.
 */
$(function () {
    iden_Fade_Evt()
    function iden_Fade_Evt() {
        $('.fade_Close').on('click',function () {
            $(this).parents('.fade_Box').stop(true).fadeOut(150);
        })
    }

})
