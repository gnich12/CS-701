window.onload = init;

// canvas and context variables
var canvas;
var context;

// center of the pattern
var centerX, centerY;

function init() {

    canvas = document.getElementById("draw");
    context = canvas.getContext("2d");

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    // draw the initial pattern
    drawPattern();
}

// called whenever the slider value changes
function drawPattern() {
    // clear the drawing area
    context.clearRect(0, 0, canvas.width, canvas.height);

    // get the current radius
    var radius = document.getElementById("radius").value;
    var rad= 200;
    var color = ["red", "blue"];
    var count = 0;
    context.fillStyle = "red";
    while (rad >0 ) {
        //alternate color
        if (count % 2 === 0) {
            context.fillStyle = color[0];
        } else {
            context.fillStyle = color[1];
        }
        context.beginPath();
        context.arc(centerX, centerY, rad, 0, 2 * Math.PI, true);
        context.fill();
        context.closePath();
        count++;
        rad = rad - radius; //change radius by slider value 

        console.log(rad);
    }
}