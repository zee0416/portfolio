function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

var c = document.createElement('canvas');
c.id = "canvasBackground";

var parent = document.getElementById('hero');
parent.appendChild(c);

var ctx = document.getElementById('canvasBackground').getContext('2d');

var dotCount
var dotArray = [];
var radius, x, y;

function createDots(dotCount) {
    for (var i = 0; i < dotCount; i++) {
        radius = Math.floor((Math.random() * 3) + 1);
        x = Math.random() * (c.width - radius * 2) + radius;
        y = Math.random() * (c.height - radius * 2) + radius;
        xVelocity = ((Math.random() * radius) - 1)/50;
        yVelocity = ((Math.random() * radius) - 1)/50;
        fillColor = 'white';
        shadowBlur = 10;
        shadowColor = 'white';
        globalAlpha = ((Math.random() * 5) + 5)/10;
        dotArray.push(new Dot(radius, x, y, xVelocity, yVelocity, fillColor, shadowBlur, shadowColor, globalAlpha));
    }
    animate();
}

function Dot(r, x, y, xV, yV, fC, sB, sC, gA) {
    this.radius = r;
    this.x = x;
    this.y = y;
    this.xVelocity = xV;
    this.yVelocity = yV;
    this.fillColor = fC;
    this.shadowBlur = sB;
    this.shadowColor = sC;
    this.globalAlpha = gA;
    
    this.updateDots = function () {
        
        if (x + this.radius > c.width || x - this.radius < 0)
            this.xVelocity = -this.xVelocity;
        if (y + this.radius > c.height || y - this.radius < 0)
            this.yVelocity = -this.yVelocity;
        x += this.xVelocity;
        y += this.yVelocity;      
        
        this.drawDots();
    }

    this.drawDots = function () {
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2, false);
        ctx.shadowBlur = this.shadowBlur;
        ctx.shadowColor = this.shadowColor;
        ctx.globalAlpha = this.globalAlpha;
        ctx.fillStyle = this.fillColor;
        ctx.fill();
    }
}
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, c.width, c.height);
 
    for(var i = 0; i < dotArray.length; i++){
        dotArray[i].updateDots();
    }
}

function setValues() {
    c.width  = parent.offsetWidth;
    c.height = parent.offsetHeight;
    dotArray = [];
    dotCount = Math.floor((c.width/2)*(c.height/2)/2000);
    createDots(dotCount);

}
document.body.onload = function () {
    setValues();
}
window.addEventListener('resize', function(){
    setValues();
})