var page = {
    defaultColor: "#df072e",//默认的背景颜色值,可自行修改
    changeHeaderColor: function () {
        $(".header").css({//修改顶部背景颜色
            backgroundColor:this.defaultColor
        });
        $(".nav").css({//修改导航字体颜色值
            color:'#2e3192'
        })
    },
    changeFooterColor: function () {//修改底部颜色值
        $('footer').css({
            backgroundColor:'#2e3192'
        })
    },
    gotoIndex: function () {//logo打开主页
        $('.logo_index').on('click', function () {
            initUrl.goto();
        })
    },
    navEvent: function () {//pc端导航栏跳转
        var nav = $('.pc_nav li');
        nav.on("click",function(){
            switch ($(this).index()) {
                    case 0: {
                        initUrl.goto('mg');
                        break;
                    }
                    case 1: {
                        initUrl.goto();
                        break;
                    }
                    case 2: {
                        initUrl.goto('register');
                        break;
                    }
                    case 3: {
                        initUrl.goto('login');
                        break;
                    }
                    case 4: {
                        initUrl.goto('', true);
                        break;
                    }
                }
        })
    },

    init: function () {
        this.changeHeaderColor();
        this.changeFooterColor();
        this.navEvent();
        this.gotoIndex();
        this.mobileNav();
    },
    mobileNav: function () { //移动端导航跳转
        var that = this;
        var $menu_icon=$(".menu_icon");//减少$的调用
        var $menu_list=$('.menu_list');
        var $menu_list_li=$(".mobile_nav li");
        var $mobile_cover=$('.mobile_cover');
        $menu_icon.prop('isOff',true);
        $menu_icon.on('click', function () {
            if ($menu_icon.prop('isOff')) {
                $(".menu_crust_top").css({
                    transform:'rotate(-45deg) translateY(0)'
                });
                $('.menu_crust_bottom').css({
                    transform:'rotate(45deg) translateY(0)'
                });
                $menu_list.css({
                    height:($menu_list.prop('scrollHeight')) + 'px',
                    visibility:'visible',
                    transitionDelay:'0.2s'
                });
                $menu_icon.prop('isOff',false);
                $menu_list_li.addClass('active');
                $mobile_cover.addClass('mobile_cover_active');
                $(document).on('touchmove',function(){},false)
            } else {
                $(".menu_crust_top").css({
                    transform:'rotate(0deg) translateY(-3px)'
                });
                $('.menu_crust_bottom').css({
                    transform:'rotate(0deg) translateY(3px)'
                });
                $menu_list.css({
                    height:($menu_list.height(0)) + 'px',
                    visibility:'hidden',
                    transitionDelay:'0.15s'
                });
                $menu_icon.prop('isOff',true);
                $menu_list_li.removeClass('active');
                $mobile_cover.removeClass('mobile_cover_active');
                $(document).off('touchmove')
            }
        });
        var nav = $('.menu_list li');
        nav.on("click",function(){
            switch ($(this).index()) {
                case 0: {
                    initUrl.goto('mg');
                    break;
                }
                case 1: {
                    initUrl.goto();
                    break;
                }
                case 2: {
                    initUrl.goto('register');
                    break;
                }
                case 3: {
                    initUrl.goto('login');
                    break;
                }
                case 4: {
                    initUrl.goto('', true);
                    break;
                }
            }
        })
    }
};
$(function(){
    page.init();
    $("#video-intro").on("ended",function(){
        $(this).hide().next().show();
    });
});
