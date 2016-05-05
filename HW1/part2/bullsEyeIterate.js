window.onload = init;

function init() {
    // access the canvas element and its context
     var canvas = document.getElementById("draw");
     var context = canvas.getContext("2d");
     var rad=200;
     var color=["red","blue"];
     var count=0;
     context.fillStyle = "red";
     while(rad>0){
        //alternate the color of the filling 
        if (count%2===0){
            context.fillStyle=color[0];
        }else{
            context.fillStyle=color[1];    
        }
        context.beginPath();
        context.arc(200, 200, rad, 0, 2 * Math.PI, true);
        context.fill();
        context.closePath();
        count++;
        rad=rad-25; // decrease radius by 25
       
       console.log(rad);
     }    
    
}
