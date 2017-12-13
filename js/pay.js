// 信用卡有效期年份
for (var i = 2017; i <= 2050; i++) {
   
   var html = '<option value='+i+'>'+i+'</option>'
   $("#year").append(html)

};

var book = 1;
$(".pay").click(function(){
    $(".info").slideUp();
    book=2
});

$("#creditCard").click(function(){
    if(book==2) {
        $(".info").slideDown()
        book=1
    } else {
        $(".info").slideUp()
        book=2
    }
});