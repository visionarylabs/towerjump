/**
    TOWER JUMP UPDATE LOOP
    update game objects
    check inputs & physics for how to update sprites
**/

/**
    GAME UPDATE LOOP
**/

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
        if(gameStatus==2){
            pro=1;
        }
        
        level = 1;
        gameStatus = 1;
        deaths = 0;
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
        boss.x += boss.velx * scale;
    }

    //move the portal
    portal.x += portal.speed * portal.force * scale;
    

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
        if( level == winLevel && pro == 0 ){
            console.log('you win!');
            gameStatus = 2;
        }else{
            console.log('next level!');
            ++level;
        }
        //passed a level
        reset();
    }
    
    //BOSS
    if(isBoss){
        if (
            hero.x + hero.width >= boss.x
            && boss.x + boss.width >= hero.x
            && hero.y <= boss.y + boss.height
        ) {
            //died to boss
            deaths++;
            reset();
        }
    }

    // stop hero on screen edge
    if (hero.x >= canvas.width - hero.width) {
        hero.x = canvas.width - hero.width;
    }else if (hero.x <= 0) {
        hero.x = 0;
    }

    // stop hero on the floor
    if (hero.y >= canvas.height - hero.height) {
        hero.y = canvas.height - hero.height;
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
                deaths++;
                reset();
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
                temptower = tower[i];
            }
        } else if (dir === "t") {
            hero.vely *= -1;
        }

        if( towers[i].hoverRight == true ){
            towers[i].x += 2 * scale;
        }
        if( towers[i].hoverLeft == true ){
            towers[i].x -= 2 * scale;
        }
        if( towers[i].falling == true ){
            towers[i].y += 1 * scale;
        }
        if( towers[i].floating == true ){
            towers[i].y -= 1 * scale;
        }

    }

    if(hero.grounded && !hero.goingup){
        hero.vely = 0;
    }

    hero.x += hero.velx * scale;
    hero.y += hero.vely * scale;

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
