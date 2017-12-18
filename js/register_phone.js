 $(".button").click(function(){
    var num = 60;
    $(".button").html(num + "s");
    $(".button").attr("disabled","disabled");
    $(".button").css({"opacity":"0.5"})
    num--;
    var timer = setInterval(function() {
        $(".button").html(num + "s");
        if (num > 0) {
          num--;
        } else {
          clearInterval(timer);
          $(".button").html("获取验证码");
          $(".button").css({"opacity":"1"})
          $(".button").removeAttr("disabled");
        }
    }, 1000);
})

