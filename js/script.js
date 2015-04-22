$(document).ready( function() {
    
    
    var time_up = 0;
    
    // PART 2
    $("#touch").bind('touchstart touchend', function(e) {
        e.preventDefault();
        $(this).toggleClass('hovering');
    });
    
    
    function updatePreview () {
        //fetch text
        document.getElementById('info').innerHTML = map_info[$(".selected").attr('id')];
        
        //fetch image
        var selected_image_path = $(".selected").attr('src');                           
        $(".preview_image").attr('src',selected_image_path);
        
    }
    
    function openPreview () {
        $("#preview").stop( true, true ).slideToggle(); //.show();
        $("#touch").trigger("touchend");
        updatePreview()
    }
    
    function tiltUp() {
        var d = new Date();
        time_up = d.getTime();
        //if ($("#touch:hover").length) {
        if ($("#touch").hasClass("hovering")) {
            if(!$("#preview").is(":visible")) {
                openPreview();
            }
            else {
                //alert("already open");
                changeColor ();
            }
        }
        else {
            //alert("hold and tilt up to open")
        }
    }
    
    function closePreview () {
        $("#preview").stop( true, true ).slideToggle(); //.hide();
        $("#touch").trigger("touchend");
    }
    
    function tiltDown() {
         
        if ($("#preview").is(":visible")) {
            var d = new Date();
            var time_down = d.getTime();
            //alert(time_down);
            if ((time_down - time_up) < 500) {
                //alert("time up: " +time_up +"\ntime down: " +time_down);
                //alert("Time interval under 500ms!");
                $("#info").stop( true, true ).slideToggle();//.Toggle();
                return;
            }
            else {
                //alert("TOO SLOOW!\ " +(time_down-time_up) +"ms");

                //only
            }
        }
        // PREVIEW LOGIC

        //if ($("#touch:hover").length) {
        if (!$("#touch").hasClass("hovering")) {
            if($("#preview").is(":visible")) {
                closePreview();
            }
            else {
                //alert("already closed");
                changeColor ();
            }
        }
        else {
            //alert("hold and tilt down to close")
        }
        
        
         
     }
    
    
    // PART 1

    function nav_left () {
        //alert("nav_left");
        var prev_img = $(".selected").parent().prev().children("img");
        if (prev_img.length) { //check existence
            $(".selected").removeClass("selected").addClass("notselected");
            prev_img.removeClass("notselected").addClass("selected");
        }
        /*else {
            $("body").auditory_feedback({ audio_file: "sound/test.mp3" });
        }*/
        
        //part2
        updatePreview();
    };

    function nav_right () {
        //alert("nav_right")
        var next_img = $(".selected").parent().next().children("img");
        //alert(next_img);
        //next_img.attr("src","img/img1.jpg");
        
        if (next_img.length) { //check existence
            $(".selected").removeClass("selected").addClass("notselected");
            next_img.removeClass("notselected").addClass("selected");
        }
        
        //part2
        updatePreview();
    };





    $("#thumbs_block").tiltandtap({
        onTiltLeft  : nav_left,
        onTiltRight : nav_right, 
        onTiltUp    : tiltUp,
        onTiltDown  : tiltDown
    });
    
    
    function changeColor () {
        var rcolor=Math.floor((Math.random() * 250) + 1);
        var gcolor=Math.floor((Math.random() * 250) + 1);
        var bcolor=Math.floor((Math.random() * 250) + 1);
        $("#thumbs_block").css("background-color", "rgb(" + rcolor + "," + gcolor + "," + bcolor + ")");
    }
});

    