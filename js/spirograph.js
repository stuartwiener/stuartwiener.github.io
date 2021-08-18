function drawSpirograph(context, cx, cy, radius1, radius2, ratio, colour) {
    var x, y, theta;
  
    // Move to starting point (theta = 0)
    context.beginPath();
    context.moveTo(cx + radius1 + radius2, cy);
  
    // Draw segments from theta = 0 to theta = 2PI
    for (theta = 0; theta <= Math.PI * 2; theta += 0.0025) {
      x = cx + radius1 * Math.cos(theta) + radius2 * Math.cos(theta * ratio);
      y = cy + radius1 * Math.sin(theta) + radius2 * Math.sin(theta * ratio);
      context.lineTo(x, y);
    }
  
    // Apply stroke
    context.strokeStyle = colour;
    context.lineWidth = 1;
    context.stroke();
}
  
// Get drawing context
var canvas = document.getElementById('maincanvas');
var context = canvas.getContext('2d');

// Set the wobbles you want
var radius1wobble = window.innerHeight / 12;
var radius2wobble = window.innerHeight / 6;
var speed = 0.1;

// Temp variables used by loop. Don't change these they will be overridden.
var radius1wobbletemp = 0;
var radius2wobbletemp = 0;
var frame = 0;
var cxoffset = 0;
var cyoffset = 0;

window.onmousemove = function(e) {
    cxoffset = Math.cos((e.clientX / window.innerWidth) * Math.PI);
    cyoffset = Math.cos((e.clientY / window.innerHeight) * Math.PI);
}

// Draw spirograph
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);

    radius1wobbletemp = Math.sin(Math.PI*2*frame/60) * radius1wobble;
    radius2wobbletemp = (Math.sin(Math.PI*2*frame/105) + 1) * radius2wobble;
    frame += speed;

    // Prevent the math getting stupid. Should be a little over 10 minutes.
    if(frame > 50000) {
        frame = 0;
    }

    drawSpirograph(context, canvas.width / 2 - cxoffset * 15, canvas.height / 2 - cyoffset * 15, canvas.height / 4 - radius1wobbletemp, canvas.height / 8 + radius2wobbletemp, 7, "#88FFBF");
    drawSpirograph(context, canvas.width / 2 - cxoffset * 30, canvas.height / 2 - cyoffset * 30, canvas.height / 4 + radius1wobbletemp, canvas.height / 8 + radius2wobbletemp, 10, "#88FFBF");
}
setInterval(resizeCanvas, 16);