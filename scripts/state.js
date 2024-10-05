/**
    TOWER JUMP
    STATE
**/

class State{

    constructor(){
        console.log('LOGIC FILE');
        console.log(this.canvas);
        this.towers = [];
        this.levels = {};
    }

    init(){
        this.then = Date.now();

        //set level?

        //Vars
        this.scale = 1;
        this.gameWidth = 500;
        this.gameHeight = 700;
        this.size = {
            width : this.gameWidth,
            height : this.gameHeight
        }

        // Game Constants
        this.gravity = 0.35; //.35
        this.friction = .75; //.9
        this.isBoss = false;
        this.pro = 0;
        this.deaths = 0;
        this.gameStatus = 0;
        this.winLevel = 10; //the level you win at

        // Game Objects
        this.hero = {};
        this.boss = {};
        this.portal = {};

        //global vars
        this.mouse = {x:0,y:0};

        this.setup();
        this.reset();
    };

    // Setup Game objects
    setup(){

        //HERO
        this.hero = {
            speed: 5, // movement in pixels per second
            jumpModifer: 4,
            base: 40,
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

        //PORTAL
        this.portal = {
            x: 0,
            y: 0,
            speed: 5, // movement in pixels per second
            base: 150,
            width: 150,
            height: 150,
            velx: 0,
            vely: 0,
            force: 3.5
        };

        //BOSS
        this.boss = {
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

    }

    //GAME FACTORIES

    //tower
    towerFactory(width,height,x,y,type){

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
            width: width * this.scale,
            height: height * this.scale,
            baseWidth : width,
            baseHeight : height,
            x: x * this.scale,
            y: y * this.scale,
            baseX : x,
            baseY : y,
            type: type,
            falling: falling,
            floating: floating
        }
    }

    makeTower(width,height,x,y,type){
        var temp = null;

        if( type == 'trap' ){
            var width2 = width / 2;
            var type1 = 'trapLeft';
            var type2 = 'trapRight';
            var x1 = x;
            var x2 = x + width2 + 2;
            temp = this.towerFactory(width2,height,x,y,type1);
            this.towers.push(temp);
            temp = this.towerFactory(width2,height,x2,y,type2);
            this.towers.push(temp);
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

            for(let i=0; i < maxSteps; i++ ){
                // make a tower step, step size , x , y , step
                temp = this.towerFactory( newWidth , newHeight , x + (newWidth * i) , y + height - (newHeight * i) , type );
                this.towers.push(temp);
            }

        }else{
            temp = this.towerFactory(width,height,x,y,type);
            this.towers.push(temp);
        }
    }

    // Reset the game when the player catches a portal
    reset() {

        console.log('resetting game');
        //if it's the winning screen dont reset
        if( this.gameStatus == 2 ){
            return;
        }
        //reset everything
        this.gameStatus = 1;

        // Throw the portal somewhere on the screen randomly
        this.portal.x = 0 + (Math.random() * (this.size.width - 150));
        this.portal.y = 10;
        this.hero.x = 10;
        this.hero.y = 600;
        this.hero.velx = 0;
        this.hero.vely = 0;
        this.hero.grounded = false;
        this.hero.goingup = false;

        this.boss.x = 150;
        this.boss.y = 200;
        this.boss.velx = 1;
        this.boss.vely = 0;
        this.boss.grounded = false;
        this.boss.goingup = false;

        this.towers = new Array();

        this.levels.makeLevels();

        console.log(this.towers);

    };

};

export default State;
