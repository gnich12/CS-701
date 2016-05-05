window.onload = init;

function init() {
    // access the canvas element and its context
     var canvas = document.getElementById("draw");
     var context = canvas.getContext("2d");
     
    // fill a circle
    context.fillStyle="red";
    context.beginPath();
    context.arc(200,200, 200, 0, 2 * Math.PI, true);
    context.fill();
    context.closePath();
    
    context.fillStyle="blue";
    context.beginPath();
    context.arc(200,200, 150, 0, 2 * Math.PI, true);
    context.fill();
    context.closePath();
    
    context.fillStyle="red";
    context.beginPath();
    context.arc(200,200, 100, 0, 2 * Math.PI, true);
    context.fill();
    context.closePath();
    
    context.fillStyle="blue";
    context.beginPath();
    context.arc(200,200, 50, 0, 2 * Math.PI, true);
    context.fill();
    context.closePath();     
}
