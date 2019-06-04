/**
    TOWER JUMP
    v0.1 - 01-06-18
    Lengely Rowland - Lead Designer and Writer
    Ben Borkowski - Lead Developer and Graphic Artist
    https://docs.google.com/document/d/1lA0bT0W_RHqEa8iUSYb6rAPabvGB_kLG1PlRA23GdVM
**/

/** GLOBAL VARS **/
// Game Constants
var gravity = 0.35; //.35
var friction = .8; //.9
var isBoss = false;

var level = 0;

//towers
var tower = function(width,height,x,y,type){
    var width = width;
    var height = height;
    var x = x;
    var y = y;
    var type = type;
    var falling = false;
    var floating = false;
    var trap = false;
    var hoverRight = false;
    var hoverLeft = false;
    return{
        width: width,
        height: height,
        x: x,
        y: y,
        type: type,
        falling: falling,
        floating: floating
    }
}
var towers = new Array();

var makeTower = function(width,height,x,y,type){
    var temp = null;
    if( type == 'trap' ){
        var width2 = width / 2;
        var type1 = 'trapLeft';
        var type2 = 'trapRight';
        var x1 = x;
        var x2 = x + width2 + 2;
        temp = tower(width2,height,x,y,type1);
        towers.push(temp);
        temp = tower(width2,height,x2,y,type2);
        towers.push(temp);
    }else if( type == 'slope' ){
        
        //temp
        //temp = tower(width,height,x,y,type);
        //towers.push(temp);
        
        var type = 'step';
        var stepSize = 10;
        var newWidth = stepSize;
        var newHeight = stepSize;
        var maxSteps = height / stepSize;
        
        if( width > height){
            maxSteps = height / stepSize;
            newWidth = width / maxSteps;
        }else{
            maxSteps = width / stepSize;
            newHeight = height / maxSteps;
        }
        
        y = y - newHeight;
        
        for(i=0; i < maxSteps; i++ ){
            // make a tower step, step size , x , y , step
            temp = tower( newWidth , newHeight , x + (newWidth * i) , y + height - (newHeight * i) , type );
            towers.push(temp);
        }
        
    }else{
        temp = tower(width,height,x,y,type);
        towers.push(temp);
    }
}

var $ = jQuery.noConflict();

/** RUN GAME **/
$(document).ready(function(){

    /*create the canvas*/
    //var canvas = document.createElement("canvas");
    var canvas = document.getElementById('game-canvas');
    var ctx = canvas.getContext("2d");
    var touchable = 'createTouch' in document;
    var mouseX, mouseY, touches = []; // array of touch vectors

    canvas.width = 500;
    canvas.height = 700;
    canvas.id = 'game-canvas';
    
    hammerBind('.button.jump','heroJump'); //main toggle hamburger nav

    // Game Controller
    if(touchable) {
        canvas.addEventListener( 'touchstart', onTouchStart, false );
        canvas.addEventListener( 'touchmove', onTouchMove, false );
        canvas.addEventListener( 'touchend', onTouchEnd, false );
    } else {
        canvas.addEventListener( 'mousemove', onMouseMove, false );
    }

    function onTouchStart(e) {
        //touch
        //jump
        touches = e.touches.target;
        var t = $(touches);
        if( t.hasClass('jump') ){
            heroJump();
        }
    }

    function onTouchMove(e) {
        event.preventDefault();
        touches = e.touches;
    }

    function onTouchEnd(e) {
        //stoptouch
        touches = e.touches;
    }
    function onMouseMove(e) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }


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

    // Game objects

    //HERO
    var hero = {
        speed: 10, // movement in pixels per second
        width: 40,
        height: 40,
        velx: 0,
        vely: 0,
        x: 0,
        y: 0,
        jumping : false,
        grounded : false,
        goingup : false
    };
    
    //BOSS
    var boss = {
        speed: 10, // movement in pixels per second
        width: 200,
        height: 250,
        velx: 0,
        vely: 0,
        x: 0,
        y: 0,
        force : 3.5,
        jumping : false,
        grounded : false,
        goingup : false
    };

    //PORTAL
    var portal = {
        x: 0,
        y: 0,
        speed: 5, // movement in pixels per second
        width: 150,
        height: 150,
        velx: 0,
        vely: 0,
        force: 3.5
    };

    level = 1;

    // Handle keyboard controls
    var keysDown = {};

    //Key Listeners

    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);

    // Reset the game when the player catches a portal
    var reset = function () {
        // Throw the portal somewhere on the screen randomly
        portal.x = 0 + (Math.random() * (canvas.width - 150));
        portal.y = 0 + (Math.random() * (canvas.height / 2 - 250));
        hero.x = 10;
        hero.y = 600;
        hero.velx = 0;
        hero.vely = 0;
        hero.grounded = false;
        hero.goingup = false;
        
        boss.x = 150;
        boss.y = 200;
        boss.velx = 1;
        boss.vely = 0;
        boss.grounded = false;
        boss.goingup = false;
        
        towers = new Array();
        /**
            every level is 500 x 700
            test level
            width, height, x, y, type
        **/
        
        makeLevels();
        
        console.log(towers);
        
    };

    var init = function(){
        reset();
    };

    function heroJump(){
        if (!hero.jumping && hero.grounded) {
            hero.jumping = true;
            hero.grounded = false; // We're not on the ground anymore!!
            hero.vely = -hero.speed * 1;
        }
    }


    // Update game objects
    // Check inputs for how to update sprites
    var update = function (modifier) {

        //Jumping
        if (38 in keysDown || 32 in keysDown ) { // Player holding up or space
            // up arrow or space
            heroJump();
        }

        if (37 in keysDown) { // Player holding left
            if (hero.velx > -hero.speed) {
                hero.velx--;
            }
        }
        if (39 in keysDown) { // Player holding right
            if (hero.velx < hero.speed) {
                hero.velx++;
            }
        }

        if (40 in keysDown) { // Player holding down
            //hero.height = 5;
        }

        // ESC KEY
        if (27 in keysDown) {
            level = 1;
            reset();
        }


        //slow down the hero
        hero.velx *= friction;
        if( hero.velx < .01 && hero.velx > -.01 ){
            hero.velx = 0;
        }

        //add gravity
        hero.vely += gravity;
        if( hero.vely >= 0 ){
            hero.goingup = false;
        }else{
            hero.goingup = true;
        }
        
        //move the boss
        if(isBoss){
            boss.y += boss.speed * boss.force;
            if(boss.y > canvas.height - boss.height){
                boss.force = -1;
            }
            if(boss.y < 0){
                boss.force = 1;
            }
            if(boss.x > canvas.width - boss.width){
                boss.velx = -1;
            }
            if(boss.x < 0){
                boss.velx = 1;
            }
            boss.x += boss.velx;
        }

        //move the portal
        portal.x += portal.speed * portal.force;
        

        //change the portal{
        if(portal.x > canvas.width - portal.width){
            portal.force = -1;
        }
        if(portal.x <= 0){
            portal.force = 1;
        }

        //Enter the Portal!!
        if (
            hero.x + hero.width >= portal.x
            && portal.x + portal.width >= hero.x
            && hero.y <= portal.y + portal.height
            //&& portal.y + portal.height <= hero.y
        ) {
            console.log('next level!');
            ++level;
            reset();
        }
        
        //BOSS
        if(isBoss){
            if (
                hero.x + hero.width >= boss.x
                && boss.x + boss.width >= hero.x
                && hero.y <= boss.y + boss.height
            ) {
                reset();
            }
        }

        // stop hero on screen edge
        if (hero.x >= canvas.width - heroImage.width) {
            hero.x = canvas.width - heroImage.width;
        }else if (hero.x <= 0) {
            hero.x = 0;
        }

        // stop hero on the floor
        if (hero.y >= canvas.height - heroImage.height) {
            hero.y = canvas.height - heroImage.height;
            hero.vely = 0;
        }else if (hero.y <= 0) {
            hero.y = 0;
        }

        //check towers
        hero.grounded = false;
        temptower = null;
        for(i=0;i<towers.length;i++){

            var dir = colCheck(hero, towers[i]);
            //if you hit any side do this:
            if (dir === "l" || dir === "r" || dir === "t" || dir === "b") {
                if(towers[i].type == 'lava'){
                    reset();
                }
            }
            if (dir === "l" || dir === "r") {
                hero.velx = 0;
                hero.jumping = false;
            } else if (dir === "b") { //if the hero lands on top
                hero.grounded = true;
                hero.jumping = false;
                if(towers[i].type == 'trapLeft'){
                    towers[i].hoverLeft = true;
                }
                if(towers[i].type == 'trapRight'){
                    towers[i].hoverRight = true;
                }
                if(towers[i].type == 'hoverRight'){
                    towers[i].hoverRight = true;
                }
                if(towers[i].type == 'hoverLeft'){
                    towers[i].hoverLeft = true;
                }
                //towers fall when you land on them
                if(towers[i].type == 'fallable'){
                    towers[i].falling = true;
                }
                if(towers[i].type == 'floating'){
                    towers[i].floating = true;
                    temptower = tower[i];
                }
            } else if (dir === "t") {
                hero.vely *= -1;
            }

            if( towers[i].hoverRight == true ){
                towers[i].x += 2;
            }
            if( towers[i].hoverLeft == true ){
                towers[i].x -= 2;
            }
            if( towers[i].falling == true ){
                towers[i].y += 1;
            }
            if( towers[i].floating == true ){
                towers[i].y -= 1;
            }

        }

        if(hero.grounded && !hero.goingup){
            hero.vely = 0;
        }

        hero.x += hero.velx;
        hero.y += hero.vely;

    };

    // check tower hits
    function colCheck(shapeA, shapeB) {
        // get the vectors to check against
        var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
            vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
            // add the half widths and half heights of the objects
            hWidths = (shapeA.width / 2) + (shapeB.width / 2),
            hHeights = (shapeA.height / 2) + (shapeB.height / 2),
            colDir = null;

        // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
        if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
            var oX = hWidths - Math.abs(vX), oY = hHeights - Math.abs(vY);
            if (oX >= oY) {
                if (vY > 0) {
                    colDir = "t";
                    shapeA.y += oY;
                } else {
                    colDir = "b";
                    shapeA.y -= oY;
                }
            } else {
                if (vX > 0) {
                    colDir = "l";
                    shapeA.x += oX;
                } else {
                    colDir = "r";
                    shapeA.x -= oX;
                }
            }
        }
        return colDir;
    }


    // Draw everything
    var render = function () {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        if (bgReady) {
            //ctx.drawImage(bgImage, 0, 0);
            //var ptrn = ctx.createPattern(bgImage, 'repeat'); // Create a pattern with this image, and set it to "repeat".
            //ctx.fillStyle = ptrn;
            //ctx.fillRect(0, 0, canvas.width, canvas.height); // context.fillRect(x, y, width, height);
        }

        //context.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
        /*
            http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
            img	Source image object	Sprite sheet
            sx	Source x	Frame index times frame width
            sy	Source y	0
            sw	Source width	Frame width
            sh	Source height	Frame height
            dx	Destination x	0
            dy	Destination y	0
            dw	Destination width	Frame width
            dh	Destination height	Frame height
        */

        if (isBoss && bossReady1r) {
            
            if( boss.y > (canvas.height - boss.height) - 30 ){
                if( boss.velx > 0 ){
                    ctx.drawImage(bossImage3r, boss.x, boss.y);
                }else{
                    ctx.drawImage(bossImage3l, boss.x, boss.y);
                }
            }else if(boss.force < 0){
                if( boss.velx > 0 ){
                    ctx.drawImage(bossImage1r, boss.x, boss.y);
                }else{
                    ctx.drawImage(bossImage1l, boss.x, boss.y);
                }
            }else{
                if( boss.velx > 0 ){
                    ctx.drawImage(bossImage2r, boss.x, boss.y);
                }else{
                    ctx.drawImage(bossImage2l, boss.x, boss.y);
                }
            }
            
        }
        
        if (heroReady) {
            ctx.drawImage(heroImage, hero.x, hero.y);
        }

        if (portalReady) {
            ctx.drawImage(portalImage, portal.x, portal.y);
        }

        //controller
        /*
        if(touchable) {
            for(var i=0; i<touches.length; i++)
            {
                var touch = touches[i];
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.fillText("touch id : "+touch.identifier+" x:"+touch.clientX+" y:"+touch.clientY, touch.clientX+30, touch.clientY-30);

                ctx.beginPath();
                ctx.strokeStyle = "cyan";
                ctx.lineWidth = "6";
                ctx.arc(touch.clientX, touch.clientY, 40, 0, Math.PI*2, true);
                ctx.stroke();
            }
        } else {
            ctx.fillStyle    = "white";
            ctx.fillText("mouse : "+mouseX+", "+mouseY, mouseX, mouseY);
        }
        */
        //ctx.fillText("hello", 0,0);


        //draw towers //tower color
        for(i=0; i < towers.length; i++){
            
            if(towers[i].type == 'floor'){
                ctx.fillStyle = "rgb(25,25,25)";
            }else if(towers[i].type == 'lava'){
                ctx.fillStyle = "rgb(200,90,0)";
            }else if(towers[i].type == 'floating'){
                ctx.fillStyle = "rgb(50,100,50)";
            }else if(towers[i].type == 'fallable'){
                ctx.fillStyle = "rgb(100,50,50)";
            }else if(towers[i].type == 'trap' || towers[i].type == 'trapLeft' || towers[i].type == 'trapRight'){
                ctx.fillStyle = "rgb(151,10,158)";
            }else if(towers[i].type == 'hoverRight'){
                ctx.fillStyle = "rgb(0,0,0)";
            }else if(towers[i].type == 'hoverLeft'){
                ctx.fillStyle = "rgb(25,25,25)";
            }else if(towers[i].type == 'step'){
                ctx.fillStyle = "rgb(25,125,125)";
            }else{
                ctx.fillStyle = "rgb(50,50,50)";
            }
            
            /** Draw Spape **/
            if( towers[i].type == 'slope' ){
                
                ctx.fillStyle = "rgb(50,50,50)";
                ctx.fillRect(towers[i].x,towers[i].y,towers[i].width,towers[i].height);
                
            }else if( towers[i].type == 'trap' ){
                
            }else{
                ctx.fillRect(towers[i].x,towers[i].y,towers[i].width,towers[i].height);
            }
        }

        // Score
        ctx.fillStyle = "rgb(10, 10, 10)";
        ctx.font = "18px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        //ctx.fillText("x: " + parseFloat(hero.x).toFixed(2) + " y: " + parseFloat(hero.y).toFixed(2), 10, 10);
        //ctx.fillText("velx: " + parseFloat(hero.velx).toFixed(2) + " vely: " + parseFloat(hero.vely).toFixed(2), 10, 30);
        ctx.fillText("Level " + level , 10 , 10);

    };

    // The main game loop
    var main = function () {
        var now = Date.now();
        var delta = now - then;

        update(delta / 1000);
        render();

        then = now;

        // Request to do this again ASAP
        requestAnimationFrame(main);
    };

    // Cross-browser support for requestAnimationFrame
    var w = window;
    requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

    /*
    // sample save game state function
    function saveState(state) {
        window.localStorage.setItem("gameState", JSON.stringify(state));
    }

    function restoreState() {
        var state = window.localStorage.getItem("gameState");
        if (state) {
            return JSON.parse(state);
        } else {
            return null;
        }
    }
    */
    
    //initiate hammer tap on cards
    //HAMMER BIND
    function hammerBind(selector,functionName){
        $(selector).each(function(){
            var mc = new Hammer(this);
            var clicked = this;
            var elem = $(this);
            mc.on("tap", function(e) {
                if(e){ e.preventDefault(); }
                //window[functionName](elem,e);
                return;
            });
        });
    }

    //JS game resize for full screen
    function resizeGame() {
        var gameArea = document.getElementById('game-area');
        var widthToHeight = 3 / 2;
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            // window width is too wide relative to desired game width
            newWidth = newHeight * widthToHeight;
            gameArea.style.height = newHeight + 'px';
            gameArea.style.width = newWidth + 'px';
        } else { // window height is too high relative to desired game height
            newHeight = newWidth / widthToHeight;
            gameArea.style.width = newWidth + 'px';
            gameArea.style.height = newHeight + 'px';
        }

        gameArea.style.marginTop = (-newHeight / 2) + 'px';
        gameArea.style.marginLeft = (-newWidth / 2) + 'px';
        gameArea.style.fontSize = (newWidth / 400) + 'em';

        canvas.width = newWidth;
        canvas.height = newHeight;
    }
    //resizeGame();
    //window.addEventListener('resize', resizeGame, false);
    //window.addEventListener('orientationchange', resizeGame, false);
    //END JS RESIZE

    // Let's play this game!
    var then = Date.now();
    init();
    main();

});