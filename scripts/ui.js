/**
    GAME UI
**/

/*create the canvas*/
//UI Defaults
var scale = 1;
var gameWidth = 500;
var gameHeight = 700;

//var canvas = document.createElement("canvas");
var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext("2d");

canvas.width = gameWidth;
canvas.height = gameHeight;
canvas.id = 'game-canvas';

//Images // Sprites
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.src = 'images/sprite-tile.png';
bgImage.onload = function(){
    bgReady = true;
}

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/sprite-hero.png";

    // Boss image Up
    var bossReady1r = false;
    var bossImage1r = new Image();
    bossImage1r.onload = function () {
        bossReady1r = true;
    };
    bossImage1r.src = "images/sprite-boss-1-r.png";
    
    // Boss image Down
    var bossReady2r = false;
    var bossImage2r = new Image();
    bossImage2r.onload = function () {
        bossReady2r = true;
    };
    bossImage2r.src = "images/sprite-boss-2-r.png";
    
    // Boss image Squash
    var bossReady3r = false;
    var bossImage3r = new Image();
    bossImage3r.onload = function () {
        bossReady3r = true;
    };
    bossImage3r.src = "images/sprite-boss-3-r.png";
    
        // Boss image Up
        var bossReady1l = false;
        var bossImage1l = new Image();
        bossImage1l.onload = function () {
            bossReady1l = true;
        };
        bossImage1l.src = "images/sprite-boss-1-l.png";
        
        // Boss image Down
        var bossReady2l = false;
        var bossImage2l = new Image();
        bossImage2l.onload = function () {
            bossReady2l = true;
        };
        bossImage2l.src = "images/sprite-boss-2-l.png";
        
        // Boss image Squash
        var bossReady3l = false;
        var bossImage3l = new Image();
        bossImage3l.onload = function () {
            bossReady3l = true;
        };
        bossImage3l.src = "images/sprite-boss-3-l.png";

// Portal image
var portalReady = false;
var portalImage = new Image();
portalImage.onload = function () {
    portalReady = true;
};
portalImage.src = "images/sprite-portal.png";

/**
    GAME INPUT CONTROLLERS
**/
canvas.addEventListener('mousemove', function(e) {
    mouse = getMousePos(canvas,e);
});

canvas.addEventListener('mouseout', function(e) {
    mouse = {x:-1,y:-1};
});

canvas.addEventListener('click', function(e) {
    click = getMousePos(canvas,e);
    processClick(click);
});

function getMousePos(canvas,e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor(e.clientX - rect.left),
      y: Math.floor(e.clientY - rect.top)
    };
}

// Handle keyboard controls
var keysDown = {};

//Key Listeners

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

function processClick(click){
    console.log(click);
    if( click.y > canvas.height / 2 ){
        console.log('jump');
        console.log('jumping? ' + hero.jumping);
        console.log('grounded? ' + hero.grounded);
        heroJump();
    }else if(click.x > canvas.width / 2 ){
        hero.x += 5 * scale;
    }else if(click.x < canvas.width / 2 ){
        hero.x -= 5 * scale;
    }
}

function heroJump(){
    if (hero.grounded == true && hero.jumping == false) {
        hero.jumping = true;
        hero.grounded = false; // We're not on the ground anymore!!
        hero.y = hero.y + 1;
        hero.vely = -hero.speed * 1;
    }
}
