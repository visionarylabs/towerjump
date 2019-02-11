/**
    every level is 500 x 700
    test level
    width, height, x, y, type
**/
var makeLevels = function(){
    
    if( level == 1 ){
        isBoss = true;
    }else{
        isBoss = false;
    }
    
    if( level == 10 ){
        makeTower(80,40,50,250,'floating');
        makeTower(80,40,120,550,'floating');
        makeTower(80,40,220,600,'floating');
        makeTower(400,10,0,680,'floor'); /* floor */
        makeTower(500,10,0,690,'lava'); /* lava */
    }else if( level == 9 ){
        makeTower(80,40,220,600,'floating');
        makeTower(400,10,0,680,'floor'); /* floor */
        makeTower(500,10,0,690,'lava'); /* lava */
    }else if( level == 8 ){
        makeTower(80,40,220,240,'trap');

        makeTower(80,40,220,360,'trap');

        makeTower(80,40,220,480,'trap');

        makeTower(80,40,220,600,'trap');
        
        makeTower(400,10,0,680,'floor'); /* floor */
        makeTower(500,10,0,690,'lava'); /* lava */
    }else if( level == 7 ){
        makeTower(80,40,220,240,'trap');

        makeTower(80,40,220,360,'trap');

        makeTower(80,40,220,480,'trap');

        makeTower(80,40,220,600,'trap');
        
        makeTower(400,10,0,680,'floor'); /* floor */
        makeTower(500,10,0,690,'lava'); /* lava */
    }else if( level == 6 ){
        //Make Level
        makeTower(50,50,150,580,'trap');
        makeTower(50,50,250,520,'hoverRight');
        makeTower(100,20,100,620,'hoverRight');
        makeTower(50,50,50,480,'hoverLeft');
        makeTower(150,50,100,380,'hoverRight');
        makeTower(100,10,400,250,'trap');
        makeTower(400,10,0,680,'floor'); /* wide, high, left, top, every level needs a floor */
        makeTower(500,10,0,690,'lava'); /* lava pit */
    }else if( level == 5 ){
        //Make Level
        makeTower(50,100,100,600,'');
        makeTower(80,140,220,500,'fallable');
        makeTower(100,50,370,400,'');
        makeTower(40,50,450,300,'floating');
        makeTower(400,10,0,680,'floor'); /* floor */
        makeTower(500,10,0,690,'lava'); /* lava */
    }else if( level == 4 ){
        //Make Level
        makeTower(50,100,200,600,'fallable');
        makeTower(50,10,200,380,'floating');
        makeTower(60,100,440,510,'');
        makeTower(50,50,200,400,'lava');
        makeTower(400,10,0,680,'floor'); /* wide, high, left, top, every level needs a floor */
        makeTower(500,10,0,690,'lava'); /* lava pit */
    }else if( level == 3 ){
        //Make Level
        makeTower(50,100,100,600,'fallable');
        makeTower(80,140,220,500,'fallable');
        makeTower(100,50,370,400,'fallable');
        makeTower(40,50,450,300,'fallable');
        makeTower(400,10,0,680,'floor'); /* floor */
        makeTower(500,10,0,690,'lava'); /* lava */
    }else if( level == 2 ){
        //Make Level
        makeTower(100,100,100,600,'fallable');
        makeTower(50,50,250,500,'floating');
        makeTower(130,50,100,350,'');
        makeTower(130,50,300,350,'');
        makeTower(300,20,100,250,'');
        makeTower(50,50,0,320,'');
        makeTower(400,10,0,680,'floor'); /* floor */
        makeTower(500,10,0,690,'lava'); /* lava */
    }else{
        makeTower(80,40,220,600,'floating');
        makeTower(80,40,320,500,'floating');
        makeTower(400,10,0,680,'floor'); /* floor */
        makeTower(500,10,0,690,'lava'); /* lava */
    }
}