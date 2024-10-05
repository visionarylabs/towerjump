/**
    TOWER JUMP
    MAIN
**/
console.log('MAIN.JS');

import State from './state.js';
import Canvas from './canvas.js';
import Ui from './ui.js';

import Update from './update.js';
import Render from './render.js';

import Timer from './timer.js';
import Levels from './levels.js';

class Main{

    constructor(){

        console.log('MAIN Constructor');

        //State and levels
        this.state = new State();
        this.levels = new Levels(this.state);
        this.state.levels = this.levels;
        this.state.level = 1;
        this.state.levels.makeLevels();
        this.state.init();

        //Canvas Render Ui
        this.canvas = new Canvas();
        this.ui = new Ui(this.state,this.canvas);
        this.render = new Render(this.state,this.canvas,this.ui);

        //Updater
        this.update = new Update(this.state,this.canvas,this.ui);

        /**
        * SETUP RESIZE
        */
        this.ui.resizeGame();
        window.addEventListener('resize', this.ui.resizeGame, false);
        window.addEventListener('orientationchange', this.ui.resizeGame, false);

        /**
        * BIND CANVAS
        */
        this.canvas.bindCanvas(this.onCanvasLoaded);

        /**
        * REGISTER CALLBACKS
        **/
        Timer.registerCallbackFrame(() => this.callBackFrame());
        Timer.registerCallbackTick(() => this.callBackTick());
        this.canvas.registerCallbackClick( (click) => this.callBackClick(click) );

    }

    callBackFrame() {
        //update callback
        this.update.update(0);
        this.render.render();
    }

    callBackTick() {
        //u.cl('--------TICK-------');
        //u.cl(this.board.boardState);
    }

    onCanvasLoaded() {
        Timer.loop();
    }

};

export default Main;
