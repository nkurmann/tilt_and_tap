<html>
<head>
<title> tiltandtap - Hard Tilting - easy example </title>
<?php include '../auth_script.php';?>

<style>
#box {
width:80%;
height:50%;
position:absolute;
top:10%;
left: 10%;

background-color:black;
}
</style>

<script src="../js/jquery-2.1.1.min.js"></script>
<script src="../js/jquery_tiltandtap.js"></script>

</head>


<body>

<div id="box">

</div>
<script>
$("#box").tiltandtap({
    tiltDown  : {
        onTiltDown: changeColor
        
    },
    tiltUp    : {
        onTiltUp: changeColor
        
    }
 
});

function changeColor ()
{
      
    var rcolor=Math.floor((Math.random() * 250) + 1);
    var gcolor=Math.floor((Math.random() * 250) + 1);
    var bcolor=Math.floor((Math.random() * 250) + 1);
    $("#box").css("background-color","rgb("+rcolor+","+gcolor+","+bcolor+")");
}
</script>
</body>




</html>