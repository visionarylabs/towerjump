/**
    every level is 500 x 700
    x goes left to right 1 to 500 (x + w should not be over 500)
    y goes top to bottom 1 to 700 (y + h should not be over 700)
    w:100, h:100, x:100, y:600
    makeTower: width, height, x, y, type
**/

class Levels{

    constructor(state){
        this.state = state;
    }

    makeLevels(){
        /**
            SET IF THE LEVLE HAS A BOSS
        **/
        let state = this.state;
        let level = state.level;

        switch(level){
            case 10:
                this.state.isBoss = true;
            break;
        }

        switch(level){
            case 100:
                console.log("working on a test level");
                state.makeTower(100,300,100,300,'slope'); /* slope */
                state.makeTower(400,10,0,680,'floor'); /* floor */
                state.makeTower(500,10,0,690,'lava'); /* lava */
            break;
            case 1:
                state.makeTower(50,100,100,600,'');
                state.makeTower(80,140,220,500,'');
                state.makeTower(100,50,370,400,'');
                state.makeTower(40,50,450,300,'');
                state.makeTower(400,10,0,680,'floor'); /* floor */
                state.makeTower(500,10,0,690,'lava'); /* lava */
            break;
            case 2:
                state.makeTower(50,100,100,600,'fallable');
                state.makeTower(80,140,220,500,'fallable');
                state.makeTower(100,50,370,400,'fallable');
                state.makeTower(40,50,450,300,'fallable');
                state.makeTower(400,10,0,680,'floor'); /* floor */
                state.makeTower(500,10,0,690,'lava'); /* lava */
                if(state.pro==1){
                    state.makeTower(100,300,400,340,'lava');
                }
            break;
            case 3:
                state.makeTower(100,100,100,600,'fallable');
                state.makeTower(50,50,250,500,'floating');
                state.makeTower(130,50,100,350,'');
                state.makeTower(130,50,300,350,'');
                state.makeTower(300,20,100,250,'');
                state.makeTower(50,50,0,320,'');
                state.makeTower(400,10,0,680,'floor'); /* floor */
                state.makeTower(500,10,0,690,'lava'); /* lava */
                if(state.pro==1){
                    state.makeTower(60,20,250,250,'lava');
                }
            break;
            case 4:
                state.makeTower(50,100,250,600,'fallable');
                state.makeTower(50,10,250,380,'floating');
                state.makeTower(60,100,440,510,'');
                state.makeTower(50,50,200,400,'lava');
                state.makeTower(400,10,0,680,'floor'); /* wide, high, left, top, every level needs a floor */
                state.makeTower(500,10,0,690,'lava'); /* lava pit */
            break;
            case 5:
                state.makeTower(50,100,100,600,'');
                state.makeTower(80,140,220,500,'fallable');
                state.makeTower(100,50,370,400,'');
                state.makeTower(40,50,450,300,'floating');
                state.makeTower(400,10,0,680,'floor'); /* floor */
                state.makeTower(500,10,0,690,'lava'); /* lava */
            break;
            case 6:
                state.makeTower(50,10,150,610,'trap');
                state.makeTower(100,50,350,520,'hoverLeft');
                state.makeTower(100,20,100,620,'hoverRight');
                state.makeTower(150,50,100,420,'hoverRight');
                state.makeTower(100,10,400,300,'trap');
                state.makeTower(400,10,0,680,'floor'); /* wide, high, left, top, every level needs a floor */
                state.makeTower(500,10,0,690,'lava'); /* lava pit */
            break;
            case 7:
                state.makeTower(80,40,220,240,'');
                state.makeTower(80,40,220,360,'');
                state.makeTower(80,40,220,480,'')
                state.makeTower(80,40,220,600,'');
                state.makeTower(400,10,0,680,'floor'); /* floor */
                state.makeTower(500,10,0,690,'lava'); /* lava */
            break;
            case 8:
                state.makeTower(50,10,250,500,'floating');
                state.makeTower(100,300,450,300,'slope'); /* slope */
                state.makeTower(400,10,0,500,'floor'); /* floor */
                state.makeTower(400,10,0,680,'floor'); /* floor */
                state.makeTower(500,10,0,690,'lava'); /* lava */
            break;
            case 9:
                state.makeTower(98,40,61,496,'lava');
                state.makeTower(10,10,255,365,'floating');
                state.makeTower(100,50,60,495,'floating');
                state.makeTower(35,100,250,560,'lava'); //tall block
                state.makeTower(90,50,255,585,'');
                state.makeTower(105,50,405,485,''); //top platform
                state.makeTower(100,50,400,490,'lava');
                state.makeTower(400,10,0,680,'floor'); /* floor */
                state.makeTower(500,10,0,690,'lava'); /* lava */
            break;
            case 10:
                state.makeTower(80,40,50,250,'floating');
                state.makeTower(80,40,120,550,'floating');
                state.makeTower(80,40,220,600,'floating');
                state.makeTower(400,10,0,680,'floor'); /* floor */
                state.makeTower(500,10,0,690,'lava'); /* lava */
            break;
            default:
                state.makeTower(80,40,220,600,'fallable');
                state.makeTower(80,40,320,500,'floating');
                state.makeTower(400,10,0,680,'floor'); /* floor */
                state.makeTower(500,10,0,690,'lava'); /* lava */
                if( state.pro == 1 ){
                    state.makeTower(60,40,330,400,'lava');
                }
            break;
        }
    }

}

export default Levels;
