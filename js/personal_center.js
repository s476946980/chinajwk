/* 
* @Author: anchen
* @Date:   2017-11-04 21:44:19
* @Last Modified by:   anchen
* @Last Modified time: 2018-01-25 16:49:16
*/

$(document).ready(function(){
    $(".wrap-tap li").each(function(index, val) {
        $(this).on('click',  function(event) {
            event.preventDefault();
            var index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parent().siblings('.js-wrap').eq(index).addClass('wrap-block').siblings('.js-wrap').removeClass('wrap-block');
        });
    }); 
    $(".order-main h3 i").on('click', function(event) {
        event.preventDefault();
        alert("confirm delete")
    });
});
$(".btn-payment").click(function() {
    window.location.href="pay.html"
})