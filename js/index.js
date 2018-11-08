$(function () {
    var red_packet2 = null;
    var isStart = false;
    var page = {
        init: function () {
            this.startGame();
            document.addEventListener('touchmove', function (event) {
                if (event.scale !== 1) {
                    event.preventDefault();
                }
            }, false);
        },
        elDom: {
            el: '<div class="red_packet_box">' +
                '<img src="images/rednormal.png" class="red_now" alt="">' +
                '<img src="images/rednone.png" class="" alt="">' +
                '<img src="images/redopen.png" class="" alt="">' +
                '</div>',
            el2: '<div class="treasurebox">' +
                '<img src="images/treasureboxnormal.png" class="red_now" alt="">' +
                '<img src="images/treasureboxnone.png" class="" alt="">' +
                '<img src="images/treasureboxopen.png" class="" alt="">' +
                '</div>',
            red_packet2: '<img src="images/rednormal.png"  id="myImage" onclick="changeImage()">'  //支持红包换素材

        },
        redSetting: {
            redPacketNumber: 0,
            treasureBox: 0,
            redPacketStartX: function () {
                return ($(document).width() - 40) * (Math.random());
            },//修改红包掉落X位置
            redPacketStartY: function () {
                return -100;
            },//修改红包掉落Y位置
            redPacketEndY: $(window).height(),//红包最后掉落的位置
            redPacketAngle: (Math.random() * 30) * Math.PI > 45 ? (Math.random() * 10) * Math.PI : -((Math.random() * 20) * Math.PI),//修改红包的角度
            redPacketDuration: 1.7,//红包掉落持续时间，修改红包雨的速度
            redPacketTimeFun: 'cubic-bezier(0, 0, 0.65, 0.2)',
            time: 30,
            isTrue: true
        },
        startGame: function () {
            var judgementData = [
                '由于您的存款尚未达标，未能取红包！',
                '您今天的抢红包次数已经用完了哦',
                "您还未登录不能开始抢红包哦"
            ];


            /*
            *
            * 请求数据判断是否开始游戏
            *
            * */
            $('.start').click(function () {
                this.newRedPacket();
            }.bind(page));

        },

        newRedPacket: function () {
            var el = null;
            var that = this;
            /*
            * 初始化数据
            * */
            if (this.redSetting.isTrue) {
                this.redSetting.isTrue = false;
                this.redSetting.time = 10;
                this.redSetting.redPacketNumber = 0;
                this.redSetting.treasureBox = 0;
                $('.red_packet_time').html(this.redSetting.time + '<span>秒</span>');
                var timer01 = setInterval(function () {
                    this.redSetting.time--;
                    $('.red_packet_time').html(this.redSetting.time + '<span>秒</span>');
                    if (this.redSetting.time <= 0) {
                        clearInterval(timer01);
                    }
                }.bind(page), 1000);
                $('.redpacket_cover').css({
                    visibility: 'visible',
                    opacity: 1,
                });
                $('.redpacket_wrap').css({
                    visibility: 'visible',
                    opacity: 1,
                });
            }

            var x = this.redSetting.redPacketStartX();
            var y = this.redSetting.redPacketStartY();
            var angle = (Math.random() * 30) * Math.PI > 45 ? (Math.random() * 10) * Math.PI : -((Math.random() * 20) * Math.PI);//调整角度
            var duration = this.redSetting.redPacketDuration;
            var timeFun = this.redSetting.redPacketTimeFun;//调整transition效果
            // $('.redpacket_cover').html(this.redSetting.redPacketEndY);

            if (Math.floor(Math.random() * 10 + 1) === 1) {//十分之一的概率掉落宝箱
                el = $(this.elDom.el2).css({
                    "transition-property": "transform",
                    "transform": 'translate3d(' + x + 'px,' + y + 'px,0) rotateZ(' + angle + 'deg)',
                    "transition-duration": '' + duration + 's',
                    "transition-timing-function": timeFun
                })
            } else {
                el = $(this.elDom.el).css({
                    "transition-property": "transform",
                    "transform": 'translate3d(' + x + 'px,' + y + 'px,0) rotateZ(' + angle + 'deg)',
                    "transition-duration": '' + duration + 's',
                    "transition-timing-function": timeFun
                });
            }

            if (red_packet2 === null) {
                isStart = true
                red_packet2 = $(this.elDom.red_packet2)
                $('.red_packet2').append(red_packet2);
            }

            $('.red_packet').append(el);
            var redTimer = null;
            var timer = setTimeout(function () {
                if (this.redSetting.time <= 0) {
                    clearTimeout(timer);
                }
                $(el).css({
                    'transform': 'translate3d(' + x + 'px,' + this.redSetting.redPacketEndY + 'px,0) rotateZ(' + angle + 'deg)',
                    "transition-duration": '' + duration + 's',
                    "transition-timing-function": timeFun
                });
                $(el).on('webkitTransitionEnd animationed', function () {
                    $(this).remove();
                });
                $(el).on('webkitAnimationEnd animationed MSAnimationEnd', function () {

                });
                $(el).one('click', function () {
                    $(this).find('img').eq(0).removeClass('red_now');
                    if ((Math.floor(Math.random() * 10 + 1)) === 1) {
                        $(this).find('img').eq(1).addClass('red_now');
                    } else {
                        if ($(this).attr('class') === 'red_packet_box') {
                            $(this).find('img').eq(2).addClass('redhave red_now');
                        } else if ($(this).attr('class') === 'treasurebox') {
                            $(this).find('img').eq(2).addClass('treasurehave red_now');
                        }
                    }

                    var className = $(this).find('img').eq(2).attr('class').split(' ')[0];
                    // console.log(className);
                    if (className === 'redhave') {
                        that.redSetting.redPacketNumber++;
                    } else if (className === 'treasurehave') {
                        that.redSetting.treasureBox++;
                    }
                });
                redTimer = setTimeout(function () {
                    if (this.redSetting.time <= 0) {
                        clearTimeout(redTimer);
                        red_packet2 = null;
                        $('.red_packet').children().remove();
                        $('.red_packet2').children().remove();
                        this.redSetting.isTrue = true;
                        if (this.redSetting.redPacketNumber === 0 && this.redSetting.treasureBox === 0) {
                            $('.prize .title').html("您木有点中红包和宝箱!");
                            $('.prize .text').html('');
                        } else {
                            $('.prize .title').html("恭喜您得奖啦!");
                            $('.prize .text').html(' 您获得了' + this.redSetting.redPacketNumber + '个红包和' + this.redSetting.treasureBox + '个宝箱<br/>' + '工作人员将会折算成金额发放到您的账户中。');
                        }
                        $('.prize').css({
                            visibility: 'visible',
                            opacity: 1
                        });
                        $('.prize .btn').click(function () {
                            $('.prize').css({
                                visibility: 'hidden',
                                opacity: 0
                            });
                            $('.redpacket_cover').css({
                                visibility: 'hidden',
                                opacity: 0
                            });
                            $('.redpacket_wrap').css({
                                visibility: 'hidden',
                                opacity: 0
                            });
                            /*判断是否需要上传数据,因为用户有没有点中宝箱和红包*/
                            if (that.redSetting.redPacketNumber === 0 && that.redSetting.treasureBox === 0) {
                                console.log(true)
                            } else {
                                console.log(false)
                            }
                        })
                    } else {
                        this.newRedPacket();

                    }
                }.bind(page), 300)
                // $(el).one('click',function(){

                // })

            }.bind(page), 40)


            // console.log(isStart)
            if (isStart === true) {

                $(document).ready(function () {
                    animateDiv('.red_packet2');
                });

            }

        }
    };
    page.init();

})


function makeNewPosition() {

    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 100;
    var w = $(window).width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];

}

function animateDiv(myclass) {
    var newq = makeNewPosition();
    $(myclass).animate({top: newq[0], left: newq[1]}, 800, function () {  //修改单个红包的速度
        animateDiv(myclass);
    });

};

function changeImage() {
    var image = document.getElementById('myImage');
    if (image.src.match("images/rednormal.png")) {
        image.src = "images/redopen.png";

    }

}
