$(document).ready( function() {
    
    
    // PART 2
    
    
    
    function updatePreview () {
        //fetch text
        //fetch image
        $(".selected").attr('src','img/i3.png');
        
    }
    
    function openPreview () {
        alert("opened");
        $("#preview").show();
        updatePreview()
    }
    
    function tiltUp() {
        if ($("#touch:hover").length) {
            openPreview();
        }
        else {
            alert("hold and tilt up to open")
        }
    }
    
    function closePreview () {
        alert("closed");
        $("#preview").hide();
    }
    
     function tiltDown() {
        if ($("#touch:hover").length) {
            closePreview();
        }
        else {
            alert("hold and tilt down to close")
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

    