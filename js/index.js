$("#button").click(function() {
    if($("#user").val() == ""||$("#password").val() == "") {
        $(".password-remind").slideDown();
        return;
    }
    var username = $("#user").val();
    var pwd = $("#password").val();
    $.ajax({
        cache: true,
        type: "POST",
        url:"index",
        data:{'username': username, 'pwd':pwd},
        async: false,
        error: function(request) {
            $(".password-remind").html("Login fail!");
            $(".password-remind").slideDown();
        },
        success: function(data) {
            if(data.code == 1){
                window.location.href="index";
                return false;
            }else{
                $(".password-remind").html(data.msg);
                $(".password-remind").slideDown();
                return false;
            }
        }
    });
})