$(document).ready( function() {
    var thumbs_block = $('#thumbs_block');
    //alert("thumbs up");

    function nav_left () {
        //alert("nav_left");
        var prev_img = $(".selected").parent().prev().children("img");
        if (prev_img.length) { //check existence
            $(".selected").removeClass("selected").addClass("notselected");
            prev_img.removeClass("notselected").addClass("selected");
        }
        else {
            $("body").auditory_feedback({ audio_file: "sound/test.mp3" });
        }
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
       
    };





    $("#thumbs_block").tiltandtap({
        onTiltLeft  : nav_left,
        onTiltRight : nav_right, 
        onTiltUp    : changeColor
    });
    
    
    function changeColor () {
        var rcolor=Math.floor((Math.random() * 250) + 1);
        var gcolor=Math.floor((Math.random() * 250) + 1);
        var bcolor=Math.floor((Math.random() * 250) + 1);
        $("#thumbs_block").css("background-color", "rgb(" + rcolor + "," + gcolor + "," + bcolor + ")");
    }
});

    