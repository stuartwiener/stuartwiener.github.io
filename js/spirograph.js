function drawSpirograph(context, cx, cy, radius1, radius2, ratio) {
    var x, y, theta;
  
    // Move to starting point (theta = 0)
    context.beginPath();
    context.moveTo(cx + radius1 + radius2, cy);
  
    // Draw segments from theta = 0 to theta = 2PI
    for (theta = 0; theta <= Math.PI * 2; theta += 0.01) {
      x = cx + radius1 * Math.cos(theta) + radius2 * Math.cos(theta * ratio);
      y = cy + radius1 * Math.sin(theta) + radius2 * Math.sin(theta * ratio);
      context.lineTo(x, y);
    }
  
    // Apply stroke
    context.strokeStyle = "#FFE279";
    context.lineWidth = 1;
    context.stroke();
}
  
// Get drawing context
var canvas = document.getElementById('maincanvas');
var context = canvas.getContext('2d');

// Set the wobbles you want
var radius1wobble = window.innerHeight / 12;
var radius2wobble = window.innerHeight / 6;
var speed = 0.35;

// Temp variables used by loop. Don't change these they will be overridden.
var radius1wobbletemp = Math.random() * radius1wobble;
var radius1wobbledirection = 1;
var radius2wobbletemp = Math.random() * radius2wobble;
var radius2wobbledirection = 1;

// Draw spirograph
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);

    if(radius1wobbletemp < radius1wobble && radius1wobbletemp >= -1 * radius1wobble) {
        radius1wobbletemp += radius1wobbledirection * speed;
    } else {
        radius1wobbledirection = -1 * radius1wobbledirection;
        radius1wobbletemp += radius1wobbledirection * speed;
    }

    if(radius2wobbletemp < radius2wobble && radius2wobbletemp >= 0) {
        radius2wobbletemp += radius2wobbledirection * speed;
    } else {
        radius2wobbledirection = -1 * radius2wobbledirection;
        radius2wobbletemp += radius2wobbledirection * speed;
    }

    drawSpirograph(context, canvas.width / 2, canvas.height / 2, canvas.height / 4 - radius1wobbletemp, canvas.height / 8 + radius2wobbletemp, 12);
    drawSpirograph(context, canvas.width / 2, canvas.height / 2, canvas.height / 3 + radius1wobbletemp, canvas.height / 7 + radius2wobbletemp, 15);
}
setInterval(resizeCanvas, 15);