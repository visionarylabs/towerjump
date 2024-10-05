/**
    TOWER JUMP RENDER
**/

// Draw everything
class Render{

    constructor(state,canvas,ui){
        this.state = state
        this.canvas = canvas;
        this.ui = ui;
    }

    render(){

        let hero = this.state.hero;
        let towers = this.state.towers;
        let portal = this.state.portal;
        let boss = this.state.boss;

        let ctx = this.canvas.ctx;

        let fontSize = 18 * this.state.scale;

        ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        ctx.fillStyle = "rgb(10, 10, 10)";
        ctx.font = fontSize + "px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        //if (bgReady) {
            //ctx.drawImage(bgImage, 0, 0);
            //var ptrn = ctx.createPattern(bgImage, 'repeat'); // Create a pattern with this image, and set it to "repeat".
            //ctx.fillStyle = ptrn;
            //ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); // context.fillRect(x, y, width, height);
        //}

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

        if(this.state.isBoss){
            console.log('BOSS!');
        }

        if (this.state.isBoss && this.ui.bossReady1r) {
            if( boss.y > (this.canvas.height - boss.height) - 30 ){
                if( boss.velx > 0 ){
                    ctx.drawImage(this.ui.bossImage3r, boss.x, boss.y);
                }else{
                    ctx.drawImage(this.ui.bossImage3l, boss.x, boss.y);
                }
            }else if(boss.force < 0){
                if( boss.velx > 0 ){
                    ctx.drawImage(this.ui.bossImage1r, boss.x, boss.y);
                }else{
                    ctx.drawImage(this.ui.bossImage1l, boss.x, boss.y);
                }
            }else{
                if( boss.velx > 0 ){
                    ctx.drawImage(this.ui.bossImage2r, boss.x, boss.y);
                }else{
                    ctx.drawImage(this.ui.bossImage2l, boss.x, boss.y);
                }
            }

        }

        if (this.ui.heroReady) {
            ctx.drawImage(this.ui.heroImage, hero.x, hero.y, hero.width, hero.height);
            //hero block:
            //ctx.fillStyle = "rgb(150,50,50)";
            //ctx.fillRect(hero.x,hero.y,hero.width,hero.height);
        }

        if (this.ui.portalReady) {
            ctx.drawImage(this.ui.portalImage, portal.x, portal.y, portal.width, portal.height);
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
        for(let i=0; i < towers.length; i++){

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
        ctx.font = fontSize + "px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        //ctx.fillText("x: " + parseFloat(hero.x).toFixed(2) + " y: " + parseFloat(hero.y).toFixed(2), 10, 10);
        //ctx.fillText("velx: " + parseFloat(hero.velx).toFixed(2) + " vely: " + parseFloat(hero.vely).toFixed(2), 10, 30);

        if(this.state.gameStatus == 2){
            ctx.fillText("YOU WIN!!!!!!!!!!!!!!!!!!!!!!!! ", 10 , 10);
            ctx.fillText("Press ESC to Play Again.", 10 , 500);
            ctx.fillText("Pro mode?!?!?!", 10 , 520);
        }else{
            if(this.state.pro==1){
                ctx.fillText("Pro Level " + this.state.level , 10 , 10);
            }else{
                ctx.fillText("Level " + this.state.level , 10 , 10);
            }
            ctx.fillText("Deaths: " + this.state.deaths , 120 , 10);
        }
    }

};

export default Render;
