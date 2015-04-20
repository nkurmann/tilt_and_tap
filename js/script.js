$(document).ready( function() {
    var thumbs_block = $('#thumbs_block');
    alert("thumbs up");

    function nav_left () {
        alert("nav_left");
        var prev_sib = $(".selected").previousSibling;
        if (prev_sib != null) {
            $(".selected").removeClass("selected").addClass("notselected");
            prev_sib.removeClass("notselected").addClass("selected");
        }
    };

    function nav_right () {
        alert("nav_right");
        var next_sib = $(".selected").nextSibling;
        if (next_sib != null) {
            $(".selected").removeClass("selected").addClass("notselected");
            next_sib.removeClass("notselected").addClass("selected");
        }
    };





    $("#thumbs_block").tiltandtap({
        onTiltLeft  : nav_left,
        onTiltRight    : nav_right
    });
});

    