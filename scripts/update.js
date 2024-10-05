/**
    TOWER JUMP UPDATE LOOP
    update game objects
    check inputs & physics for how to update sprites
**/

/**
    GAME UPDATE LOOP
**/


class Update{

    constructor(state,canvas,ui){
        this.state = state;
        this.canvas = canvas;
        this.ui = ui;
    }

    update(modifier){

        let state = this.state;
        let hero = state.hero;
        let boss = state.boss;
        let towers = state.towers;
        let portal = state.portal;

        //Jumping
        if (38 in this.ui.keysDown || 32 in this.ui.keysDown ) { // Player holding up or space
            // up arrow or space
            this.ui.heroJump();
        }

        if (37 in this.ui.keysDown) { // Player holding left
            if (hero.velx > -hero.speed) {
                hero.velx--;
            }
        }
        if (39 in this.ui.keysDown) { // Player holding right
            if (hero.velx < hero.speed) {
                hero.velx++;
            }
        }

        if (40 in this.ui.keysDown) { // Player holding down
            //hero.height = 5;
        }

        // ESC KEY
        if (27 in this.ui.keysDown) {
            if(state.gameStatus==2){
                state.pro=1;
            }

            state.level = 1;
            state.gameStatus = 1;
            state.deaths = 0;
            state.reset();
        }


        //slow down the hero
        hero.velx *= state.friction;
        if( hero.velx < .01 && hero.velx > -.01 ){
            hero.velx = 0;
        }

        //add gravity
        hero.vely += state.gravity;
        if( hero.vely >= 0 ){
            hero.goingup = false;
        }else{
            hero.goingup = true;
        }

        //move the boss
        if(state.isBoss){
            boss.y += boss.speed * boss.force;
            if(boss.y > this.canvas.canvas.height - boss.height){
                boss.force = -1;
            }
            if(boss.y < 0){
                boss.force = 1;
            }
            if(boss.x > this.canvas.canvas.width - boss.width){
                boss.velx = -1;
            }
            if(boss.x < 0){
                boss.velx = 1;
            }
            boss.x += boss.velx * state.scale;
        }

        //move the portal
        portal.x += portal.speed * portal.force * state.scale;


        //change the portal{
        if(portal.x > this.canvas.canvas.width - portal.width){
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
            if( state.level == state.winLevel && state.pro == 0 ){
                console.log('you win!');
                state.gameStatus = 2;
            }else{
                console.log('next level!');
                state.level++;
            }
            //passed a level
            state.reset();
        }

        //BOSS
        if(state.isBoss){
            if (
                hero.x + hero.width >= boss.x
                && boss.x + boss.width >= hero.x
                && hero.y <= boss.y + boss.height
            ) {
                //died to boss
                state.deaths++;
                state.reset();
            }
        }

        // stop hero on screen edge
        if (hero.x >= this.canvas.width - hero.width) {
            hero.x = this.canvas.width - hero.width;
        }else if (hero.x <= 0) {
            hero.x = 0;
        }

        // stop hero on the floor
        if (hero.y >= this.canvas.height - hero.height) {
            hero.y = this.canvas.height - hero.height;
            hero.vely = 0;
        }else if (hero.y <= 0) {
            hero.y = 0;
        }

        //check towers
        hero.grounded = false;
        let temptower = null;
        for(let i=0;i<towers.length;i++){

            var dir = this.colCheck(hero, towers[i]);
            //if you hit any side do this:
            if (dir === "l" || dir === "r" || dir === "t" || dir === "b") {
                if(towers[i].type == 'lava'){
                    state.deaths++;
                    state.reset();
                }
            }
            if (dir === "l" || dir === "r") {
                hero.velx = 0;
                hero.jumping = false;
            } else if (dir === "b") { //if the hero lands on top
                //console.log('grounding the hero...');

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
                    temptower = towers[i];
                }
            } else if (dir === "t") {
                hero.vely *= -1;
            }

            if( towers[i].hoverRight == true ){
                towers[i].x += 2 * state.scale;
            }
            if( towers[i].hoverLeft == true ){
                towers[i].x -= 2 * state.scale;
            }
            if( towers[i].falling == true ){
                towers[i].y += 1 * state.scale;
            }
            if( towers[i].floating == true ){
                towers[i].y -= 1 * state.scale;
            }

        }

        if(hero.grounded && !hero.goingup){
            hero.vely = 0;
        }

        hero.x += hero.velx * state.scale;
        hero.y += hero.vely * state.scale;
    }

    // check tower hits
    colCheck(shapeA, shapeB) {
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

};

export default Update;
