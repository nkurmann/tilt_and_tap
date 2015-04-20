(function($){

    //play music as a user feedback
    $.fn.auditory_feedback = function(options) {

        settings = $.extend({
            audio_file: "test.mp3"
        }, options);

        return this.each(function(){
            var audio = new Audio(settings.audio_file);
            audio.play();
        });
    };


    //logic for the sliding ball
    //$.fn.sliding_ball = function(ball_radius, ball_color, ball_left, ball_top, ball_opacity, ball_speed, ball_sensitivity, ball_visibility) {
    $.fn.sliding_ball = function(options) {

        settings = $.extend({
            ball_radius: "50px",
            ball_color: "red",
            ball_left: "45%",
            ball_top: "45%",
            ball_opacity: 0.3,
            ball_speed: 1,
            ball_sensitivity: 0.8,
            ball_visibility: true
        }, options);


        return this.each(function(){

            if(! document.getElementById('ball')) { //comment this out to have >1 balls
                var ball = document.createElement("div");
                ball.id = "ball";
                ball.style.zIndex = 10;
                ball.style.background = settings.ball_color;
                ball.style.width = parseInt(settings.ball_radius) * 2 + "px";
                ball.style.height = parseInt(settings.ball_radius) * 2 + "px";
                ball.style.position = "absolute";
                ball.style.top = settings.ball_top;
                ball.style.left = settings.ball_left;
                ball.style.opacity = settings.ball_opacity; // 0 <= ball_opacity <= 1
                ball.style.borderRadius = "50%";
                ball.style.display = (settings.ball_visibility == true) ? "inline" : "none"; // none, inline
                var list = document.body;
                list.insertBefore(ball, list.childNodes[0]);
            }

            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', deviceMotionHandler, true);
            }

            var arti = 1, eksi = -1, speed = 10*settings.ball_speed, curgamma = 0, curfb = 0, prevgamma = 0,
                prevfb = 0, firstgamma = 0, firstfb = 0, threshold = settings.ball_sensitivity, gotfirstvalues = false;

            firstgamma = curgamma; firstfb = curfb;

            function deviceMotionHandler(eventData) {
                var granularity = 100;

                var acc_grav = eventData.accelerationIncludingGravity;
                var tilt_lr = Math.round(granularity * acc_grav.x) / granularity; var tilt_fb = Math.round(granularity * acc_grav.y) / granularity; var qacc_grav_z = Math.round(granularity * acc_grav.z) / granularity;

                document.getElementById("msg3").innerHTML = tilt_lr + " / " + tilt_fb + " / " + qacc_grav_z;

                if(gotfirstvalues == false){
                    if(curgamma == 0 && prevgamma == 0 && curfb == 0 && prevfb == 0) {
                        firstgamma = tilt_lr; firstfb = tilt_fb;
                        gotfirstvalues = true;
                    }
                }

                curgamma = tilt_lr;  curfb = tilt_fb;
                var ballgamma; var ballfb;
                var deltagamma = curgamma - firstgamma; var deltafb = curfb - firstfb;
                if(Math.abs(deltagamma) < threshold){ deltagamma = 0; }
                if(Math.abs(deltafb) < threshold){ deltafb = 0; }
                ballgamma = deltagamma; ballfb = deltafb;

                var os = $("#ball").offset();
                var bottomn = $(window).height() - ((os.top + ((arti * ballfb) * speed))) - $("#ball").height();
                var rightn = $(window).width() - (os.left + (eksi * ballgamma * speed)) - $("#ball").width();
                var leftn = os.left + (eksi * ballgamma * speed);
                var topn = os.top + ((arti * ballfb) * speed);
                var original_top = $(window).height() - $("#ball").height();
                var on_the_right = $(window).width() - $("#ball").width();

                document.getElementById("msg4").innerHTML = topn + " " + leftn;

                if(bottomn > speed){
                    if(leftn < 0){
                        if(topn < 0){ $("#ball").offset({left:0, top:0 }); }
                        else{ $("#ball").offset({left:0, top:os.top + ((arti * ballfb) * speed)}); }
                    }
                    else{
                        if(topn < 0){
                            if(rightn < 0){ $("#ball").offset({left:on_the_right, top:0 }); }
                            else{ $("#ball").offset({left:os.left + (eksi * ballgamma * speed), top:0 }); }
                        }
                        else{
                            if(rightn < 0){ $("#ball").offset({left:on_the_right, top:os.top + ((arti * ballfb) * speed)}); }
                            else{ $("#ball").offset({left:os.left + (eksi * ballgamma * speed),top:os.top + ((arti * ballfb) * speed)}); }
                        }
                    }
                }
                if(bottomn <= speed){
                    if(leftn < 0){
                        if(topn < 0){ $("#ball").offset({left:0, top:0}); }
                        else{ $("#ball").offset({left:0, top:original_top}); }
                    }
                    else{
                        if(topn < 0){
                            if(rightn < 0){ $("#ball").offset({left:on_the_right, top:0}); }
                            else{ $("#ball").offset({left:os.left+(eksi * ballgamma * speed), top:0}); }
                        }
                        else{
                            if(rightn < 0){ $("#ball").offset({left:on_the_right, top:original_top});  }
                            else{ $("#ball").offset({left:os.left+(eksi * ballgamma * speed), top:original_top}); }
                        }
                    }
                }

                prevgamma = curgamma;
                prevfb = curfb;
            }

        });
    };


    //detect single-tap and double-tap
    $.fn.tapping = function(single_tap, double_tap, interval) {
        return this.each(function(){
            var number_of_taps = 0;

            $(this).click(function(event){
                number_of_taps = number_of_taps + 1;

                if (number_of_taps == 1) {
                    setTimeout(function(){
                        if(number_of_taps == 1) { single_tap.call(this, event); }
                        else { double_tap.call(this, event); }
                        number_of_taps = 0;
                    }, interval);
                }

            });

        });
    };


    //detect press
    //TODO: do it with the very easy method


    //detect press
    $.fn.pressing = function(func_start, func_end) {
        return this.each(function() {
            $(this).data['pressing'] = new Func_press(this);
            $(this).bind('press_start', func_start).bind('press_end', func_end);
        });
    };

    function Func_press(elem) {
        var _this = this;
        this.$elem = $(elem).touching();

        $(elem).bind('press', func_forward);
        $(elem).bind('touch_end', func_forward);

        function func_forward(e){
            if(e.type === 'press'){
                return _this.$elem.trigger('press_start', this);
            }
            else if(e.type === 'touch_end'){
                return _this.$elem.trigger('press_end', this);
            }
        }
    }

    $.fn.touching = function(){
        return this.each(function() {
            $(this).data['touching'] = new Func_touch(this);
        });
    };

    function Func_touch(elem){
        var _this = this;
        this.elem = elem;

        $(elem).bind('touchstart', touchstart);
        $(elem).bind('touchend', touchend);

        function touchstart() {
            //document.getElementById("msg2").innerHTML = e.type; //touchstart
            _this.interval = setTimeout(function() {
                $(_this.elem).trigger('press', this);
            }, 500);
        }

        function touchend() {
            //document.getElementById("msg2").innerHTML = e.type; //touchend
            if (_this.interval){ clearTimeout(_this.interval); }
            $(_this.elem).trigger('touch_end', this);
        }
    }

})(jQuery);