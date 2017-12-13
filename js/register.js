$("#button").click(function(){
    var h2 = $("#email").val();

    if($("#email").val() == "") {
        $(".number-remind").slideDown();
        return;
    }
    if($("#psd").val().length < 6){
        $(".password-remind").html("The password must be no less than 6 characters!");
        $(".password-remind").slideDown();
        return;
    }

    if($("#psd").val()!==$("#psdcon").val()|| $("#psd").val()=="" ||$("#psdcon").val()=="") {
        $(".password-remind").html("The password must be no less than 6 characters!");
        $(".password-remind").slideDown();
        return;
    } else {
        $.ajax({
            cache: true,
            type: "POST",
            url:"is_registered",
            data:{'username': h2},
            async: false,
            error: function(request) {
                $(".number-remind").html("Registered fail!");
                $(".number-remind").slideDown();
            },
            success: function(data) {
                var res = eval("("+data+")");
                if(res == 'allow'){
                    $(".page-first").hide();
                    $(".page-secend").show();
                    $(".wrap h2").text(h2);
                    $("h2").show();
                }else{
                    $(".number-remind").html("This mailbox has been registered!");
                    $(".number-remind").slideDown();
                }
            }
        });
    }
})
$(".back").click(function(){
    $(".number-remind").slideUp();
    $(".password-remind").slideUp();
    $(".page-first").show();
    $(".page-secend").hide();
    $("h2").hide();

})
