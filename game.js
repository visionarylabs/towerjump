/**
    TOWER JUMP
    v0.2 - 06-14-22
    Lengely Rowland - Lead Designer and Writer
    Ben Borkowski - Lead Developer and Graphic Artist
**/

// Game Constants
var gravity = 0.35; //.35
var friction = .8; //.9
var isBoss = false;
var pro = 0;
var level = 0;
var deaths = 0;
var gameStatus = 0;
var winLevel = 10; //the level you win at
var then = null;

// Game Objects
var hero = {};
var boss = {};
var portal = {};

//global vars
var w = window;
var mouse = {x:0,y:0};

//global funcs
var reset = {};

/**
    MAIN GAME SETUP
**/

var init = function(){
    then = Date.now();
    level = 1;
    reset();
    main();
};

// Reset the game when the player catches a portal
reset = function () {
    
    //if it's the winning screen dont reset
    if( gameStatus == 2 ){
        return;
    }
    //reset everything
    gameStatus = 1;
    
    // Throw the portal somewhere on the screen randomly
    portal.x = 0 + (Math.random() * (canvas.width - 150));
    portal.y = 10;
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

/**
    GAME OBJECTS & FACTORIES
**/

// Game objects

//HERO
hero = {
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
boss = {
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
portal = {
    x: 0,
    y: 0,
    speed: 5, // movement in pixels per second
    width: 150,
    height: 150,
    velx: 0,
    vely: 0,
    force: 3.5
};

//GAME FACTORIES

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

    //scale to screen
    width = width * scale;
    height = height * scale;
    x = x * scale;
    y = y * scale;

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

/**
    MAIN GAME LOOP
    calls render from render.js
**/
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

//JS game resize for full screen
function resizeGame() {
    var gameArea = document.getElementById('game-area');
    var widthToHeight = 5 / 7;
    var maxWidth = window.innerWidth;
    var maxHeight = window.innerHeight;
    var newWidth = gameWidth;
    var newHeight = gameHeight;
    if(maxWidth < gameWidth) newWidth = maxWidth;
    if(maxHeight < gameHeight) newHeight = maxHeight;

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

    //gameArea.style.marginTop = (-newHeight / 2) + 'px';
    //gameArea.style.marginLeft = (-newWidth / 2) + 'px';
    gameArea.style.fontSize = (newWidth / 400) + 'em';

    canvas.width = newWidth;
    canvas.height = newHeight;
    console.log('GAME AREA:')
    console.log(newWidth , newHeight);
    //set global scale for UI
    scale = newWidth / gameWidth;
    console.log('SCALE:')
    console.log(scale);
    //more resize:
    portal.width = portal.width * scale;
    portal.height = portal.height * scale;
    hero.width = hero.width * scale;
    hero.height = hero.height * scale;
    console.log('HERO:')
    console.log(hero);
}
resizeGame();
window.addEventListener('resize', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);
//END JS RESIZE

// Let's play this game!
init();
