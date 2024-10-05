/**
    GAME UI
**/

/*create the canvas*/
//UI Defaults

class Ui{

    constructor(state,canvas){
        this.state = state;
        this.canvas = canvas;
        this.keysDown = [];

        this.heroReady = false;
        this.heroImage = null;

        this.portalReady = false;
        this.portalImage = null;

        this.uiTools();
    }

    uiTools(){

        this.canvas.width = this.state.size.width;
        this.canvas.height = this.state.size.height;
        this.canvas.id = 'game-canvas';

        //Images // Sprites
        // Background image
        var bgReady = false;
        var bgImage = new Image();
        bgImage.src = 'images/sprite-tile.png';
        bgImage.onload = () => {
            bgReady = true;
        }

        // Hero image
        this.heroImage = new Image();
        this.heroImage.onload = () => {
            this.heroReady = true;
        };

        this.heroImage.src = "images/sprite-hero.png";

            // Boss image Up
            this.bossReady1r = false;
            this.bossImage1r = new Image();
            this.bossImage1r.onload = () => {
                this.bossReady1r = true;
            };
            this.bossImage1r.src = "images/sprite-boss-1-r.png";

            // Boss image Down
            this.bossReady2r = false;
            this.bossImage2r = new Image();
            this.bossImage2r.onload = () => {
                this.bossReady2r = true;
            };
            this.bossImage2r.src = "images/sprite-boss-2-r.png";

            // Boss image Squash
            this.bossReady3r = false;
            this.bossImage3r = new Image();
            this.bossImage3r.onload = () => {
                this.bossReady3r = true;
            };
            this.bossImage3r.src = "images/sprite-boss-3-r.png";

                // Boss image Up
                this.bossReady1l = false;
                this.bossImage1l = new Image();
                this.bossImage1l.onload = () => {
                    this.bossReady1l = true;
                };
                this.bossImage1l.src = "images/sprite-boss-1-l.png";

                // Boss image Down
                this.bossReady2l = false;
                this.bossImage2l = new Image();
                this.bossImage2l.onload = () => {
                    this.bossReady2l = true;
                };
                this.bossImage2l.src = "images/sprite-boss-2-l.png";

                // Boss image Squash
                this.bossReady3l = false;
                this.bossImage3l = new Image();
                this.bossImage3l.onload = () => {
                    this.bossReady3l = true;
                };
                this.bossImage3l.src = "images/sprite-boss-3-l.png";

        // Portal image
        this.portalImage = new Image();
        this.portalImage.onload = () => {
            this.portalReady = true;
        };
        this.portalImage.src = "images/sprite-portal.png";

        /**
            GAME INPUT CONTROLLERS
        **/
        /*
        this.canvas.addEventListener('mousemove', function(e) {
            mouse = getMousePos(canvas,e);
        });

        this.canvas.addEventListener('mouseout', function(e) {
            mouse = {x:-1,y:-1};
        });

        this.canvas.addEventListener('click', function(e) {
            click = getMousePos(canvas,e);
            processClick(click);
        });

        function getMousePos(canvas,e) {
            var rect = this.canvas.getBoundingClientRect();
            return {
              x: Math.floor(e.clientX - rect.left),
              y: Math.floor(e.clientY - rect.top)
            };
        }
        */
        //Key Listeners

        addEventListener("keydown", (e) => {
            this.keysDown[e.keyCode] = true;
        }, false);

        addEventListener("keyup", (e) => {
            delete this.keysDown[e.keyCode];
        }, false);
    }

    processClick(click){
        console.log(click);
        if( click.y > this.canvas.height / 2 ){
            console.log('jump');
            console.log('jumping? ' + hero.jumping);
            console.log('grounded? ' + hero.grounded);
            heroJump();
        }else if(click.x > this.canvas.width / 2 ){
            hero.x += 5 * scale;
        }else if(click.x < this.canvas.width / 2 ){
            hero.x -= 5 * scale;
        }
    }

    heroJump(){
        if (this.state.hero.grounded == true && this.state.hero.jumping == false) {
            this.state.hero.jumping = true;
            this.state.hero.grounded = false; // We're not on the ground anymore!!
            this.state.hero.y = this.state.hero.y + 1;
            this.state.hero.vely = -this.state.hero.speed * this.state.hero.jumpModifer;
        }
        console.log(this.state.hero);
    }

    //JS game resize for full screen
    resizeGame() {
        var towers = this.state.towers;

        var gameWidth = this.state.size.width;
        var gameHeight = this.state.size.height;

        var gameArea = document.getElementById('game-area');
        var widthToHeight = gameWidth / gameHeight; //5/7
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

        //this.size.width = newWidth;
        //this.size.height = newHeight;
        console.log('GAME AREA:')
        console.log(newWidth , newHeight);

        //set global scale for UI
        this.scale = newWidth / gameWidth;

        //more resize:
        //portal.width = portal.base * scale;
        //portal.height = portal.base * scale;
        //hero.width = hero.base * scale;
        //hero.height = hero.base * scale;

        var i = 0;
        for(i=0;i<towers.length;i++){
            towers[i].width = towers[i].baseWidth * this.scale;
            towers[i].height = towers[i].baseHeight * this.scale;
            towers[i].x = towers[i].baseX * this.scale;
            towers[i].y = towers[i].baseY * this.scale;
        }

    }

};

export default Ui;
