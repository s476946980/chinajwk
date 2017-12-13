        var params = {};
        // 设置获取选项栏宽度
        var win = $(window).width(),
        lengW2 = $(".select-under-back").children().eq(0).find(".select-sfs").children().width();
        if(win >= 320) {
            els = 5;
        } 
        if (win >= 375) {
            els = 12;
        }
        if (win >= 414) {
            els = 18;
        }

        // 选择分类
        $(".pic-con-sf").click(function() {
            var lengW = $(".picture-left-sf").children().eq(0).find(".select-sf").children().width();
            $(this).addClass('pic-con-show').parent().parent().siblings().find(".pic-con-sf").removeClass('pic-con-show');
            $(".custom-under-list li img").removeClass('custom-under-img');
            var leng = $(this).parent().siblings(".select-outer-sf").find(".select-sf").children().length;
            var wid = null;
            if(leng >= 4) {
                $(this).parent().siblings(".select-outer-sf").css({
                    "width": "19rem"
                })
            } else {
                $(this).parent().siblings(".select-outer-sf").css({
                    "width": leng * (4.13) + 2.45 + "rem"
                })
            }
            $(this).parent().siblings(".select-outer-sf").find(".select-sf").css({
                "width": leng * (4.13) + 2.45 + "rem"
            })
            var lef = $(this).parent().next().css("left").split("px")[0];
            console.log(lef);
            if(lef > 0) {
                wid =  $(this).parent().siblings(".select-outer-sf").width();
                console.log(wid);
                $(this).parent().next().animate({
                    "left": -wid + lengW - 6
                },500).parent().siblings().find(".select-outer-sf").animate({
                    "left": "10rem"
                },500);
            } else {
                $(this).removeClass('pic-con-show')
                $(this).parent().next().animate({
                    "left": "10rem"
                },500)
            }
            var ind = $(this).parent().parent().index();
            $(".select-outing-sf").css({
                "left": "-22rem"
            });
        })
        $(".select-sf li").click(function() {
            $(this).addClass('pic-con-show').siblings().removeClass('pic-con-show');
            var index = $(this).parent().parent().parent().index();
            animateLeft();
        })
        $(".select-sf-one li").click(function() {
            var tex = $(this).text();
            $(this).parent().parent().siblings().find(".pic-con-sf").html(tex);
            $("#p-size").val(tex);
        })
        var basic_price = $(".cust-price").attr("pdata");//初始价格


        //点击确认
        $(".replace-confirm").click(function(){
            closeAlert();

        })
        //点击取消
        $(".replace-cancel").click(function(){
            closeAlert();
        })


        //颜色切换
        $(".select-sf-two li").click(function(){
            //判断更换颜色之前是否有工艺存在
            var is_crafts = $("#p-crafts").val();
            if(is_crafts != '0'){
                openAlert();
                return;
            }
            var src = $(this).children().attr("src");
            $(this).parent().parent().siblings().find(".pic-con-sf").find("img").attr("src", src);
            var tag = $(this).attr("tag");
            var de = $(this).attr("de");
            $("#p-crafts").val("0");//初始化工艺值
            $("#crafts-title").attr("src","/jwk/public/static/mobile/images/cancel.png");
            $.ajax({
                cache: true,
                type: "POST",
                url: "/jwk/public/index.php/mobile/index/changeColor",
                data: {'tag': tag},
                async: false,
                error: function (request) {
                    alter("system error!");
                },
                success: function (data) {
                    var img = eval("(" + data + ")");
                    $("#img-color").attr("src", img.img_front);
                    $("#img-color-back").attr("src", img.img_back);
                    $("#img-crafts").css("display", "none");
                    var result = "<li tag=\"\" pdata=\"0\"><img src=\"/jwk/public/static/mobile/images/cancel.png\" class=\"newdow\" alt=\"\" /></li>";
                    $(img.crafts).each(function (i, n) {
                        result += "<li tag=\"" + n.cid + "\"pdata=\"" + n.price + "\"><img src=\"" + n.cover_title + "\" class=\"newdow\" alt=\"\" /></li>";
                    });
                    $("#p-color").val(img.cid);//添加颜色
                    $(".select-sf-four").html(result);
                    $(".newdow").click(function () {
                        var index = $(this).parent().parent().parent().index();
                        animateLeft();
                    })
                    if (de == 1) {
                        $("#img-crafts").attr("src", '');
                        $("#crafts-title").attr("src", "/jwk/public/static/mobile/images/cancel.png");
                        $(".craft-price em").text("+$0.00");//初始化订单工艺的价格
                    }
                    //扣除破洞价格
                    $.post("/jwk/public/index.php/mobile/index/priceSummary", {
                        'craft': 'c',
                        'basic_price': basic_price
                    }, function (d) {
                        var cr = eval("(" + d + ")");
                        $(".cust-price").text("$" + cr.price_total);
                        $(".all-final-price").text("=$" + cr.price_total);
                        $(".item-price").text("$" + cr.price_total);
                        $(".custom-price-r em").text("$" + cr.price_total);//价格清单总额
                    });
                    //初始化配件可选
                    $(".li-11").attr("dat", "yes");
                    $(".li-12").attr("dat", "yes");
                    $(".li-13").attr("dat", "yes");
                    $(".li-14").attr("dat", "yes");
                    //破洞切换
                    $(".select-sf-four li").click(function () {
                        $(this).addClass('pic-con-show').siblings().removeClass('pic-con-show');
                        var tag = $(this).attr("tag");

                        $.ajax({
                            type: "POST",
                            url: "/jwk/public/index.php/mobile/index/changeCrafts",
                            data: {'tag': tag},
                            async: false,
                            error: function (request) {
                                alert("system error!");
                            },
                            success: function (data) {
                                var img = eval("(" + data + ")");
                                if (img == 1) {
                                    //扣除破洞价格
                                    $.post("/jwk/public/index.php/mobile/index/priceSummary", {
                                        'craft': 'c',
                                        'basic_price': basic_price
                                    }, function (d) {
                                        var cr = eval("(" + d + ")");
                                        $(".cust-price").text("$" + cr.price_total);
                                        $(".all-final-price").text("=$" + cr.price_total);
                                        $(".item-price").text("$" + cr.price_total);
                                        $(".custom-price-r em").text("$" + cr.price_total);//价格清单总额
                                    });
                                    $("#img-crafts").css("display", "none");
                                    $("#crafts-title").attr("src", "/jwk/public/static/mobile/images/cancel.png");
                                    $(".craft-price em").text("+$0.00");//初始化订单工艺的价格
                                    $("#p-crafts").val("0");//工艺值
                                } else {
                                    if ($.inArray("1", img.region) >= 0) {
                                        $(".picture-left-t img").attr("src", "");
                                        $(".li-11").attr("dat", "not");
                                    } else {
                                        $(".li-11").attr("dat", "yes");
                                    }
                                    if ($.inArray("2", img.region) >= 0) {
                                        $(".picture-right-t img").attr("src", "");
                                        $(".li-13").attr("dat", "not");
                                    } else {
                                        $(".li-13").attr("dat", "yes");
                                    }
                                    if ($.inArray("3", img.region) >= 0) {
                                        $(".picture-left-b img").attr("src", "");
                                        $(".li-12").attr("dat", "not");
                                    } else {
                                        $(".li-12").attr("dat", "yes");
                                    }
                                    if ($.inArray("4", img.region) >= 0) {
                                        $(".picture-right-b img").attr("src", "");
                                        $(".li-14").attr("dat", "not");
                                    } else {
                                        $(".li-14").attr("dat", "yes");
                                    }
                                    $("#img-crafts").attr("src", img.img_crafts).css("display", "block");
                                    $("#crafts-title").attr("src", img.img_title);
                                    //添加破洞价格
                                    $.post("/jwk/public/index.php/mobile/index/priceSummary", {
                                        "craft": img.cid,
                                        "basic_price": basic_price
                                    }, function (d) {
                                        var cr = eval("(" + d + ")");
                                        $(".cust-price").text("$" + cr.price_total);
                                        $(".all-final-price").text("=$" + cr.price_total);
                                        $(".item-price").text("$" + cr.price_total);
                                        $(".custom-price-r em").text("$" + cr.price_total);//价格清单总额
                                    });
                                    $(".craft-price em").text("+$" + img.price);//修改订单工艺的价格
                                    $("#p-crafts").val(img.cid);//工艺值
                                }
                                sumPrice();
                            }
                        })
                    });
                    sumPrice();
                }
            });
        })
        //纽扣切换
        $(".select-sf-five li").click(function(){
            var tag = $(this).attr("tag");
            $.ajax({
               type : "POST",
                url : "/jwk/public/index.php/mobile/index/changeButton",
                data : {'tag' : tag},
                async : false,
                error : function(request){
                    alert("system error!");
                },
                success:function(data){
                    var img = eval("("+data+")");//console.log(img);
                    $("#img-button").attr("src", img.img_button);
                    $("#button-title").attr("src",img.img_title);
                    //添加纽扣价格
                    $.post("/jwk/public/index.php/mobile/index/priceSummary",{"button":img.bid,"basic_price":basic_price},function(d){
                        var cr = eval("("+d+")");
                        $(".cust-price").text("$"+cr.price_total);
                        $(".all-final-price").text("=$" + cr.price_total);
                        $(".item-price").text("$" + cr.price_total);
                        $(".custom-price-r em").text("$" + cr.price_total);//价格清单总额
                    });
                    $(".button-price em").text("+$"+img.price);//修改订单纽扣的价格
                    $("#p-button").val(img.bid);
                    sumPrice();
                }
            })
        });
        //缝线切换
        $(".select-sf-six li").click(function(){
            var tag = $(this).attr("tag");
            $.ajax({
                type : "POST",
                url : "/jwk/public/index.php/mobile/index/changeThread",
                data : {'tag' : tag},
                async : false,
                error : function(request){
                    alert("system error!");
                },
                success:function(data){
                    var img = eval("("+data+")");
                    $("#img-thread").attr("src", img.img_thread);
                    $("#thread-title").attr("src",img.img_title);
                    $("#img-thread-back").attr("src",img.img_back);
                    //添加缝线价格
                    $.post("/jwk/public/index.php/mobile/index/priceSummary",{"thread":img.tid,"basic_price":basic_price},function(d){
                        var cr = eval("("+d+")");
                        $(".cust-price").text("$"+cr.price_total);
                        $(".all-final-price").text("=$" + cr.price_total);
                        $(".item-price").text("$" + cr.price_total);
                        $(".custom-price-r em").text("$" + cr.price_total);//价格清单总额
                    });
                    $(".thread-price em").text("+$"+img.price);//修改订单缝线的价格
                    $("#p-thread").val(img.tid);
                    sumPrice();
                }
            })
        });

        // 旋转
        var roate = false;
        var descriptionArr=[["左侧小脚","右侧小脚","左侧后袋","右侧后袋"],["正面小脚","正面小脚","正面前袋","正面前袋"]]
        $(".custom-roate").click(function() {
            $(".select-outer-sf").css({
                "left": "10rem"
            });
            if(roate == false) {
                for (var i = 0; i <4; i++) {
                    $(".description-four").children().eq(i).html(descriptionArr[0][i])
                };
                $(".pocket-pattern").show()
                $(".button-hardware").hide()
                $(".swiper-containers").addClass('rote-sf-show').removeClass('rote-sf-show2');
                    roate = true;
                $(".custom-under-back2").addClass('custom-under-show').siblings().removeClass('custom-under-show');
                $(".picture-img-positive .picture-pos-show").fadeOut(500);
                $(".picture-img-back .picture-pos-show").fadeIn(500);
                $(".select-under-sf .select-outing-sf").css({
                    "left": "-22rem"
                });
                $(this).css({
                    "background-position" : "0 0"
                })
                $(".picture-img-positive img").fadeOut(800);
            } else {
                for (var i = 0; i <4; i++) {
                    $(".description-four").children().eq(i).html(descriptionArr[1][i])
                };
                $(".pocket-pattern").hide()
                $(".button-hardware").show()
                $(".swiper-containers").addClass('rote-sf-show2').removeClass('rote-sf-show');
                    roate = false;
                $(".custom-under-back1").addClass('custom-under-show').siblings().removeClass('custom-under-show');
                $(".picture-img-back .picture-pos-show").fadeOut(1000);
                $(".picture-img-positive .picture-pos-show").fadeIn(1000);
                $(".select-under-back .select-outing-sf").css({
                    "left": "-22rem"
                });
                $(this).css({
                    "background-position" : "0 -2.86rem"
                })
                $(".picture-img-positive img").fadeIn(800);
            }
        })

        // 选择定制图案
        $(".custom-under-list li").click(function() {
            var dat = $(this).parent().attr("data");
            var allow = $(this).attr("dat");
            console.log(dat)
            var index = $(this).index();
            $(".select-out-sf").attr("data", dat);
            $(".select-out-sf").attr("index", index);
            $(".select-outer-sf").animate({
                "left": "10rem"
            },500);
            if(dat==1 && allow=="yes") {
                var lefs = $(".select-under-sf").children().eq(index).css("left").split("px")[0];
                var lengt = $(".select-under-sf").children().eq(index).find(".select-sfs").children().length;
                if(lengt >= 4) {
                    $(".select-under-sf").find(".select-out-sf").eq(index).css({
                        "width": "17rem"
                    })
                    $(".select-under-sf").children().eq(index).find(".select-sfs").css({
                        "width": lengt * (4.14) + "rem"
                    })
                }
                if(lefs >= 0) {
                    $(".select-under-sf").children().eq(index).animate({
                        "left": "-22rem"
                    },500)
                    $(this).removeClass('custom-under-img');
                } else {
                    setTimeout(function() {
                        $(".select-under-sf").children().eq(index).siblings(".select-outing-sf").animate({
                            "left": "-22rem"
                        },200);
                    },800)
                    $(".select-under-sf").children().eq(index).siblings(".select-outing-sf").animate({
                        "left": "-22rem"
                    },200,function() {
                        $(".select-under-sf").children().eq(index).stop(true).animate({
                            "left": "0rem"
                        },500)
                    })
                }
            }
            if(dat==2) {
                var lefts = $(".select-under-back").children().eq(index).css("left").split("px")[0];
                var lengts = $(".select-under-back").children().eq(index).find(".select-sfs").children().length;
                console.log($(".select-under-back").children().eq(index).find(".select-out-sf").attr("index"))
                if(lengts >= 4) {
                    $(".select-under-back").find(".select-out-sf").eq(index).css({
                        "width": "17rem"
                    })
                    $(".select-under-back").children().eq(index).find(".select-sfs").css({
                        "width": lengts * (4.14) + "rem"
                    })
                }
                if(lefts >= 0) {
                    $(".select-under-back").children().eq(index).animate({
                        "left": "-22rem"
                    },500)
                    $(this).removeClass('custom-under-img');
                } else {
                    setTimeout(function() {
                        $(".select-under-back").children().eq(index).siblings(".select-outing-sf").animate({
                            "left": "-22rem"
                        },200);
                    },800)
                    $(".select-under-back").children().eq(index).siblings(".select-outing-sf").animate({
                        "left": "-22rem"
                    },200,function() {
                        $(".select-under-back").children().eq(index).stop(true).animate({
                            "left": "0rem"
                        },500)
                    })
                }

            }
        })
        function animateLeft() {
            $(".select-outer-sf").animate({
                "left": "10rem"
            },500)
            $(".select-outing-sf").animate({
                "left": "-22rem"
            },500)
        }
        $(".swiper-containers,.white,.cover").click(function() {
            animateLeft();
        })
        $(".select-sfs li").click(function() {
            var reg = $(this).attr("reg");
            var pr = $(this).attr("pr");

            $(this).addClass('pic-con-show').siblings().removeClass('pic-con-show');
            var data = $(".select-out-sf").attr("data");
            var src = $(this).children("img").attr("tag");
            var index = $(".select-out-sf").attr("index");
            if(data == 1) {
                $(".picture-img-positive").children(".picture-pos").eq(index).addClass("picture-pos-show").css("display","block").find("img").attr("src",src);
            }
            if(data == 2) {
                $(".picture-img-back").children(".picture-pos").eq(index).addClass("picture-pos-show").css("display","block").find("img").attr("src",src);
            }
            //添加配件价格
            $.post("/jwk/public/index.php/mobile/index/priceSummary",{"pr":pr,"reg":reg,"basic_price":basic_price},function(d){
                var cr = eval("("+d+")");
                $(".cust-price").text("$"+cr.price_total);
                $(".all-final-price").text("=$" + cr.price_total);//buy清单总额
                $(".custom-price-r em").text("$" + cr.price_total);//价格清单总额
                $(".item-price").text("$" + cr.price_total);//价格总额
                switch(reg){
                    case "1" :  $("#p-part1").val(pr);
                                 $(".part1-price em").text("+$"+parseFloat(cr.part1_price).toFixed(2));
                                 break;
                    case "2" :  $("#p-part2").val(pr);
                                 $(".part2-price em").text("+$"+parseFloat(cr.part2_price).toFixed(2));
                                 break;
                    case "3" :  $("#p-part3").val(pr);
                                 $(".part3-price em").text("+$"+parseFloat(cr.part3_price).toFixed(2));
                                 break;
                    case "4" :  $("#p-part4").val(pr);
                                 $(".part4-price em").text("+$"+parseFloat(cr.part4_price).toFixed(2));
                                 break;
                    case "5" :  $("#p-part5").val(pr);
                                 $(".part5-price em").text("+$"+parseFloat(cr.part5_price).toFixed(2));
                                 break;
                    case "6" :  $("#p-part6").val(pr);
                                 $(".part6-price em").text("+$"+parseFloat(cr.part6_price).toFixed(2));
                                 break;
                    case "7" :  $("#p-part7").val(pr);
                                 $(".part7-price em").text("+$"+parseFloat(cr.part7_price).toFixed(2));
                                 break;
                    default :   $("#p-part8").val(pr);
                                 $(".part8-price em").text("+$"+parseFloat(cr.part8_price).toFixed(2));
                }
                sumPrice();
            });

        })
        // 取消选项
        $(".cancel-select").click(function() {
            var ins = $(this).parent().parent().attr("index");
            var num = $(this).parent().parent().attr("data");
            if(num == 1) {
                $(".picture-img-positive div").eq(ins).css("display","none").removeClass("picture-pos-show").find("img").attr("src","");
                $(this).parent().parent().parent().animate({
                    "left": "-22rem"
                },800)
            }
            if(num == 2) {
                $(".picture-img-back div").eq(ins).css("display","none").removeClass("picture-pos-show").find("img").attr("src","");
                $(this).parent().parent().parent().animate({
                    "left": "-22rem"
                },800)
            }
        })
        // 保存选项
        $(".custom-save").click(function() {
            var t = confirm("Do you really want to keep your design ?");
            if(!t){
                return;
            }
            var jid = $("input[name='jid']").val();
            var color = $("input[name='color']").val();
            var crafts = $("input[name='crafts']").val();
            var button = $("input[name='button']").val();
            var thread = $("input[name='thread']").val();
            var size = $("input[name='size']").val();
            var word = $("input[name='word']").val();
            var part1 = $("input[name='part1']").val();
            var part2 = $("input[name='part2']").val();
            var part3 = $("input[name='part3']").val();
            var part4 = $("input[name='part4']").val();
            var part5 = $("input[name='part5']").val();
            var part6 = $("input[name='part6']").val();
            var part7 = $("input[name='part7']").val();
            var part8 = $("input[name='part8']").val();
            $.post("/jwk/public/index.php/mobile/index/customSave",{'jid' : jid,'color' : color,'crafts' : crafts,'button' : button,'thread' : thread,'size' : size,'word' : word,'part1' : part1,'part2' : part2,'part3' : part3,'part4' : part4,'part5' : part5,'part6' : part6,'part7' : part7,'part8' : part8},function(data){
                var da = eval("("+data+")");
                if(da.result == true && da.code == '0000'){
                    animateLeft();
                    $(".cust-save-tit").css({
                        "top": "65%"
                    })
                    console.log(6666);
                    $(".custom-save-over").css("display","block");
                    $(".cust-save-tit").css("display","block").animate({
                        "top": "40%"
                    },2000).fadeOut(5000);
                    setTimeout(function() {
                        $(".custom-save-over").css("display","none");
                    },7000);
                }else{
                    alert("Sorry, only after logging in can you save your design!");
                }
            });

        })
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
        var custPrice= true
        $(".cust-share").click(function() {
            //添加阻止事件
            document.addEventListener("touchmove", handler, false); // 添加阻止事件
            var href = window.location.href;
            $(".custom-herf-addr").val(href);
            $(".custom-share-outer").fadeIn(500);
            $(".custom-share-bottom").animate({
                "bottom": "0"
            },500);
            animateLeft();
            $(".custom-price-show").animate({
                "bottom": "-30rem"
            },500)
            custPrice= true
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
            })
            $(".custom-price-show").animate({
                "bottom": "-30rem"
            },500)
            custPrice= true
        })
        $(".cust-price,.cust-buy").click(function() {
            animateLeft();
        })
        //选择区域图案
        $(".custom-under-list li").click(function(){
            var dat = $(this).attr("dat");
            if(dat == 'yes'){
                $(this).css({
                    "background-position" : "0 -2.29rem"
                }).siblings().css({
                    "background-position" : "0 0"
                })
            }else{
                openTrue()
                $(this).css({
                    "background-position" : "0 0"
                }).siblings().css({
                    "background-position" : "0 0"
                })
            }
        })
        $(".picture-sf").click(function() {
            $(".custom-under-list li").css({
                "background-position" : "0 0"
            })
            $(".select-outing-sf").animate({
                "left": "-22rem"
            },500)
        })
        // 点击购买结算菜单
        $(".slide-top").click(function() {
            var dat = $(this).attr("data");
            var id = $(this).parent().index();
            //var heig = $(window).height();
            //var ht = $(".settlement-sf").attr("data");
            //if(id == 4) {
            //    $(".settlement-sf-inner").animate({
            //        "height": heig
            //    })
            //}
            if(dat == 1) {
                //if(id == 4) {
                //    $(".settlement-sf-inner").animate({
                //        "height": heig
                //    })
                //} else {
                //    $(".settlement-sf-inner").animate({
                //        "height": ht
                //    })
                //}
                $(this).css({
                    "background" : '#f2f2f2 url("/jwk/public/static/mobile/images/arrow_t.png")  96.73% center no-repeat',
                    "backgroundSize" : "2.24% auto"
                }).parent().siblings().find(".slide-top").css({
                    "background" : '#f2f2f2 url("/jwk/public/static/mobile/images/arrow_b.png")  96.73% center no-repeat',
                    "backgroundSize" : "2.24% auto"
                })
                $(this).next().slideDown().parent().siblings().find(".slide-bottom").slideUp().siblings(".slide-top").attr("data","1");
                $(this).attr("data","2");
            } else {
                $(this).next().slideUp();
                $(this).attr("data","1");
                $(this).css({
                    "background" : '#f2f2f2 url("/jwk/public/static/mobile/images/arrow_b.png")  96.73% center no-repeat',
                    "backgroundSize" : "2.24% auto"
                })
                $(".settlement-sf-inner").animate({
                    "height": ht
                })             
            }
        })
        // enter
        $(".gift-enter").click(function() {
            $(".gift-money").slideDown();
        })
        $(".gift-money").click(function() {
            $(".gift-money").slideUp();
        })
        $(".cust-buy").click(function() {
            var allow = $(this).attr("allow");
            if(allow == "allow"){
                var h = $(".settlement-sf").height();
                $(".settlement-sf").attr("data",h);
                $(".custom-share-outer").fadeIn(500);
                $(".settlement-sf").animate({
                    "bottom": 0
                })
            }else{
                alert("You can buy it after landing!");
            }
        })
        // 增加产品数量和价格计算
        function sumPrice(){
            var arrP = [];
            for(var i = 0; i < $(".price-detail-list li").length; i++) {
                var priceA = $(".price-detail-list li").eq(i).children("em").text().split("$")[1];
                arrP.push(priceA);
            }
            var priceAll = 0;
            for(var j = 0; j < arrP.length; j++) {
                if(arrP[j]){
                    priceAll += parseFloat(arrP[j]);
                }
            }
            var totalC = $(".all-final-num").text().split("x")[1];
            var allPrice = priceAll * totalC;
            if(parseFloat($(".discount-cust").text().split("$")[1])){
                var startEnd = allPrice + parseFloat($(".postage-cust").text().split("$")[1]) - parseFloat($(".discount-cust").text().split("$")[1]);
            }else{
                var startEnd = allPrice + parseFloat($(".postage-cust").text().split("$")[1]);
            }

            $(".all-final-price").text("=$" + allPrice);
            $(".item-price").text("$" + allPrice);
            $(".total-cust").text("Total piece（" +totalC+ "）");
            $(".final-price").text("$" + startEnd);

            $("#total-price").val(startEnd);//订单价格
        }
        sumPrice();
        //$(".account-number").click(function() {
        //    var num = $(".number-num").text();
        //    num--;
        //    if(num < 1) {
        //        num = 1
        //    }
        //    $("#p-quantity").val(num);
        //    $(".number-num").text(num);
        //    $(".all-final-num").text("x" + num);
        //    $(".all-final-price").text("=$" + (num*priceAll).toFixed(2));
        //    $(".item-price").text("$" + (num*priceAll).toFixed(2));
        //    $(".total-cust").text("Total piece（" +num+ "）");
        //    startEnd = num*priceAll + parseFloat($(".postage-cust").text().split("$")[1]) - parseFloat($(".discount-cust").text().split("$")[1]);
        //    $(".final-price").text("$" + startEnd.toFixed(2));
        //})
        //$(".add-number").click(function() {
        //    var num = $(".number-num").text();
        //    num++;
        //    $(".number-num").text(num);
        //    $("#p-quantity").val(num);
        //    $(".all-final-num").text("x" + num);
        //    $(".all-final-price").text("=$" + (num*priceAll).toFixed(2));
        //    $(".item-price").text("$" + (num*priceAll).toFixed(2));
        //    $(".total-cust").text("Total piece（" +num+ "）");
        //    startEnd = num*priceAll + parseFloat($(".postage-cust").text().split("$")[1]) - parseFloat($(".discount-cust").text().split("$")[1]);
        //    $(".final-price").text("$" + startEnd.toFixed(2));
        //    $("#total-price").val(startEnd);//订单价格
        //})
        //提交定制页面订单
        $(".final-buy a").click(function(){
            $("#t-form").submit();
        })

        // 选择地址功能
        $(".cust-address").click(function() {
            $.ajax({
                url: '/jwk/public/index.php/mobile/user/addrAdd',
                dataType: 'json',
                type:"POST",
                async : false,
                data: {'is_add':'no'},
                success: function(da) {
                    var html = '<header class=\"header-select\">\
                        <span class=\"select-return\"></span>\
                        <h1>Select Address</h1>\
                    </header>\
                    <ul class=\"select-address-outer\">';
                    if(da.res == true){
                        $.each(da.msg, function(i,val){
                            if(val.is_main == 1){
                                html += '<li class=\"select-address selected-ch\" tag=\"'+val.aid+'\">\
                                <div class=\"select-address-all\">\
                                    <span class=\"select-address-name\">'+val.actual_name+'</span>\
                                    <span class=\"select-address-tele\">'+val.mobile+'</span>\
                                </div>\
                                <div class=\"select-address-detail\">\
                                    <p>'+val.addr+'&nbsp;&nbsp;'+val.area+'</p>\
                                </div>\
                                </li>';
                            }else{
                                html +='<li class=\"select-address\" tag=\"'+val.aid+'\">\
                                <div class=\"select-address-all\">\
                                    <span class=\"select-address-name\">'+val.actual_name+'</span>\
                                    <span class=\"select-address-tele\">'+val.mobile+'</span>\
                                </div>\
                                <div class=\"select-address-detail\">\
                                    <p>'+val.addr+'&nbsp;&nbsp;'+val.area+'</p>\
                                </div>\
                                </li>';
                            }
                        });
                        html += '</ul>\
                        <a class=\"save-addr-btn\">\
                            <input value=\"Add\" type=\"button\">\
                            </a>';
                        $(".select-address-alert").html(html);
                        $(".select-address-alert").fadeIn(300);
                    }
                    $(".select-address-outer li").click(function() {
                        $(this).addClass('selected-ch').siblings().removeClass('selected-ch');
                        var selectN = $(this).find(".select-address-name").text();
                        var selectT = $(this).find(".select-address-tele").text();
                        var selectD = $(this).find(".select-address-detail").text();
                        var tag = $(this).attr("tag");
                        $("#p-addr").val(tag);
                        $(".address-name").text(selectN);
                        $(".address-tele").text(selectT);
                        $(".cust-address-detail p").text(selectD);
                        $(".select-address-alert").fadeOut(100);
                    })
                    $(".select-return").click(function() {
                        $(".select-address-alert").fadeOut(300);
                        $(".wrap").fadeOut(300);
                    })
                    //定制页面地址添加
                    $(".save-addr-btn").click(function(){
                        $(".wrap").fadeIn(300);
                        $(".select-address-alert").fadeOut(100);
                    });

                },
                error: function(e) {
                    console.log("system error!")
                }
            })

        })

        $(".addr-back-list").click(function(){
            $(".wrap").fadeOut(100);
            $(".select-address-alert").fadeIn(300);
        });
        //地址添加后返回地址选择列表
        $(".save-btn").click(function(){
            var actual_name = $("input[name='aname']").val();
            var mobile = $("input[name='phone']").val();
            var area = $("input[name='areas']").val();
            var addr = $("input[name='address']").val();
            var is_main = $("input[name='def']:checked").val();
            $.ajax({
                url: '/jwk/public/index.php/mobile/user/addrAdd',
                dataType: 'json',
                type:"POST",
                async : false,
                data: {'actual_name':actual_name,'mobile':mobile,"area":area,"addr":addr,"is_main":is_main},
                success: function(data) {
                    var html = '<header class=\"header-select\">\
                        <span class=\"select-return\"></span>\
                        <h1>Select Address</h1>\
                    </header>\
                    <ul class=\"select-address-outer\">';
                    $("input[name='aname']").val('');
                    $("input[name='areas']").val('');
                    $("input[name='phone']").val('');
                    $("input[name='address']").val('');
                    $("input[name='def']").attr("checked", false);
                    if(data.res == true){
                        $.each(data.msg, function(i,val){
                            if(val.is_main == 1){
                                html += '<li class=\"select-address selected-ch\" tag=\"'+val.aid+'\">\
                                <div class=\"select-address-all\">\
                                    <span class=\"select-address-name\">'+val.actual_name+'</span>\
                                    <span class=\"select-address-tele\">'+val.mobile+'</span>\
                                </div>\
                                <div class=\"select-address-detail\">\
                                    <p>'+val.addr+'&nbsp;&nbsp;'+val.area+'</p>\
                                </div>\
                                </li>';
                            }else{
                                html +='<li class=\"select-address\" tag=\"'+val.aid+'\">\
                                <div class=\"select-address-all\">\
                                    <span class=\"select-address-name\">'+val.actual_name+'</span>\
                                    <span class=\"select-address-tele\">'+val.mobile+'</span>\
                                </div>\
                                <div class=\"select-address-detail\">\
                                    <p>'+val.addr+'&nbsp;&nbsp;'+val.area+'</p>\
                                </div>\
                                </li>';
                            }
                        });
                        html += '</ul>\
                        <a class=\"save-addr-btn\">\
                            <input value=\"Add\" type=\"button\">\
                            </a>';
                        $(".wrap").css("z-index","9996");
                        $(".select-address-alert").html(html);
                        $(".select-address-alert").fadeIn(300);
                        $(".select-address-outer li").click(function() {
                            $(this).addClass('selected-ch').siblings().removeClass('selected-ch');
                            var selectN = $(this).find(".select-address-name").text();
                            var selectT = $(this).find(".select-address-tele").text();
                            var selectD = $(this).find(".select-address-detail").text();
                            var tag = $(this).attr("tag");
                            $("#p-addr").val(tag);
                            $(".address-name").text(selectN);
                            $(".address-tele").text(selectT);
                            $(".cust-address-detail p").text(selectD);
                            $(".select-address-alert").fadeOut(100);
                            $(".wrap").fadeOut(300);
                        })
                        $(".select-return").click(function() {
                            $(".select-address-alert").fadeOut(300);
                            $(".wrap").fadeOut(300);
                        })
                    }
                },
                error: function(e) {
                    console.log("system error!")
                }
            })
        });
        // 点击价格出现价格列表

        $(".cust-price").click(function() {
            if(custPrice) {
                $(".custom-share-outer").fadeIn(500);
                $(".custom-price-show").animate({
                    "bottom": "4rem"
                },500)
                custPrice= false
            }else {
                $(".custom-share-outer").fadeOut(500);
                $(".custom-price-show").animate({
                    "bottom": "-30rem"
                },500)
                custPrice= true
            }

        })
        var clipboard = new Clipboard('.btn');

        clipboard.on('success', function(e) {

        });

        clipboard.on('error', function(e) {

        });
        $(".btn").click(function(){
            $(".btn").css({
                "opacity": 0.5
            })
        })
        //start customozing
        $(".load-page").click(function(){
            $(".background-img").hide()
            $(".background-index").hide()
            $(".load-page").hide()
            $(".custom-footer").show()
            $(".buy-img").hide()
            $(".custom-under-sf").show()
        })
        // 打开提示
        function openTrue(){
            $(".custom-alert").show()
            $(".prompt-confirm").css({
                "top": "65%"
            })
            $(".prompt-confirm").css("display","block").animate({
                "top": "20%"
            },2000);
        }

        // 关闭提示
        function closeTrue(){
            $(".custom-alert").hide()
            $(".prompt-confirm").hide()
        }

        // 打开提示
        function openAlert(){
            $(".custom-alert").show()
            $(".replace-color").css({
                "top": "65%"
            })
            $(".replace-color").css("display","block").animate({
                "top": "20%"
            },2000);
        }
        // 关闭确认框
        function closeAlert(){
            $(".custom-alert").hide()
            $(".replace-color").hide()
        }