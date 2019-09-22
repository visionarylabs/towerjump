/**
    every level is 500 x 700
    x goes left to right 1 to 500 (x + w should not be over 500)
    y goes top to bottom 1 to 700 (y + h should not be over 700)
    w:100, h:100, x:100, y:600
    makeTower: width, height, x, y, type
**/
var makeLevels = function(){
    
    /**
        SET IF THE LEVLE HAS A BOSS
    **/
    isBoss = false;
    switch(level){
        case 10:
            isBoss = true;
        break;
    }
    
    switch(level){
        case 100:
            console.log("working on a test level");
            makeTower(100,300,100,300,'slope'); /* slope */
            makeTower(400,10,0,680,'floor'); /* floor */
            makeTower(500,10,0,690,'lava'); /* lava */
        break;
        case 1:
            makeTower(50,100,100,600,'fallable');
            makeTower(80,140,220,500,'fallable');
            makeTower(100,50,370,400,'fallable');
            makeTower(40,50,450,300,'fallable');
            makeTower(400,10,0,680,'floor'); /* floor */
            makeTower(500,10,0,690,'lava'); /* lava */
            if(pro==1){
                makeTower(100,300,400,340,'lava');
            }
        break;
        case 2:
            makeTower(100,100,100,600,'fallable');
            makeTower(50,50,250,500,'floating');
            makeTower(130,50,100,350,'');
            makeTower(130,50,300,350,'');
            makeTower(300,20,100,250,'');
            makeTower(50,50,0,320,'');
            makeTower(400,10,0,680,'floor'); /* floor */
            makeTower(500,10,0,690,'lava'); /* lava */
            if(pro==1){
                makeTower(60,20,250,250,'lava');
            }
        break;
        case 3:
            makeTower(50,100,100,600,'fallable');
            makeTower(80,140,220,500,'fallable');
            makeTower(100,50,370,400,'fallable');
            makeTower(40,50,450,300,'fallable');
            makeTower(400,10,0,680,'floor'); /* floor */
            makeTower(500,10,0,690,'lava'); /* lava */
        break;
        case 4:
            makeTower(50,100,250,600,'fallable');
            makeTower(50,10,250,380,'floating');
            makeTower(60,100,440,510,'');
            makeTower(50,50,200,400,'lava');
            makeTower(400,10,0,680,'floor'); /* wide, high, left, top, every level needs a floor */
            makeTower(500,10,0,690,'lava'); /* lava pit */
        break;
        case 5:
            makeTower(50,100,100,600,'');
            makeTower(80,140,220,500,'fallable');
            makeTower(100,50,370,400,'');
            makeTower(40,50,450,300,'floating');
            makeTower(400,10,0,680,'floor'); /* floor */
            makeTower(500,10,0,690,'lava'); /* lava */
        break;
        case 6:
            makeTower(50,50,150,580,'trap');
            makeTower(50,50,250,520,'hoverRight');
            makeTower(100,20,100,620,'hoverRight');
            makeTower(50,50,50,480,'hoverLeft');
            makeTower(150,50,100,380,'hoverRight');
            makeTower(100,10,400,250,'trap');
            makeTower(400,10,0,680,'floor'); /* wide, high, left, top, every level needs a floor */
            makeTower(500,10,0,690,'lava'); /* lava pit */
        break;
        case 7:
            makeTower(80,40,220,240,'');
            makeTower(80,40,220,360,'');
            makeTower(80,40,220,480,'')
            makeTower(80,40,220,600,'');
            makeTower(400,10,0,680,'floor'); /* floor */
            makeTower(500,10,0,690,'lava'); /* lava */
        break;
        case 8:
            makeTower(50,10,250,500,'floating');
            makeTower(100,300,450,300,'slope'); /* slope */
            makeTower(400,10,0,500,'floor'); /* floor */
            makeTower(400,10,0,680,'floor'); /* floor */
            makeTower(500,10,0,690,'lava'); /* lava */
        break;
        case 9:
            makeTower(98,40,61,496,'lava');
            makeTower(10,10,255,365,'floating');
            makeTower(100,50,60,495,'floating');
            makeTower(100,50,250,590,'lava');
            makeTower(35,100,250,558,'lava');
            makeTower(90,50,255,585,'');
            makeTower(105,50,405,485,'');
            makeTower(100,50,400,490,'lava');
            makeTower(400,10,0,680,'floor'); /* floor */
            makeTower(500,10,0,690,'lava'); /* lava */
        break;
        case 10:
            makeTower(80,40,50,250,'floating');
            makeTower(80,40,120,550,'floating');
            makeTower(80,40,220,600,'floating');
            makeTower(400,10,0,680,'floor'); /* floor */
            makeTower(500,10,0,690,'lava'); /* lava */
        break;
        default:
            makeTower(80,40,220,600,'fallable');
            makeTower(80,40,320,500,'floating');
            makeTower(400,10,0,680,'floor'); /* floor */
            makeTower(500,10,0,690,'lava'); /* lava */
            if( pro == 1 ){
                makeTower(60,40,330,400,'lava');
            }
        break;
    }
}
