 $(function() {
        $("img.lazy").lazyload({
            effect : "fadeIn"
        });
    });

// 分享
        var heig = $(".custom-share-bottom").height() + 50;
        var wind = $(window).height() - $(".custom-share-bottom").height();
        $(".custom-share-bottom").css({
            "bottom": -heig
        })
        // 禁止和解除默认事件：
        var handler = function(e) { //禁止浏览器默认行为
            e.preventDefault();
        };
        $(".share").click(function() {
            //添加阻止事件
            document.addEventListener("touchmove", handler, false); // 添加阻止事件
            var href = window.location.href;
            $(".custom-herf-addr").val(href);
            $(".custom-share-outer").fadeIn(500);
            $(".custom-share-bottom").animate({
                "bottom": "0"
            },500);
        })
        $(".close-share, .custom-share-outer").click(function() {
            //移除阻止事件
            document.removeEventListener("touchmove", handler, false); // 移除阻止事件
            $(".custom-share-outer").fadeOut(500);
            $(".custom-share-bottom").animate({
                "bottom": -heig
            },500);
            $(".settlement-sf").animate({
                "bottom": "-30rem"
            });
            $(".custom-share-outer").fadeOut(500);
            $(".custom-price-show").animate({
                "bottom": "-30rem"
            },500);
        })