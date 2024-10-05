/**
    Game Tools
    OG Canvas

    v0.1 - 02-28-2024
    Opal Games - Design and Development
    requirements: ES6

    see og-tools, dd
**/

class Canvas{

    constructor(){
        this.config = {
            screen : {
                canvasSize : {
                    width : 500,
                    height : 700
                }
            }
        };
        this.canvas = null;
        this.ctx = null;
        this.pos = {};
        this.click = {};
        this.callbacksClick = [];
    }

    bindCanvas(callback){
        document.addEventListener('DOMContentLoaded', () => {

            //get the canvas element and set the size and context
            this.buildCanvas();

            //add canvas listeners
            this.addCanvasListeners();

            // Call the callback function if provided
            if (typeof callback === 'function') {
                callback();
            }

        });
    }

    buildCanvas(){
        console.log('BUILDING CANVAS');
        this.canvas = document.getElementById('game-canvas');
        this.canvas.width = this.config.screen.canvasSize.width;
        this.canvas.height = this.config.screen.canvasSize.height;
        this.gameArea = document.getElementById('game-area');
        this.gameArea.style.width = this.config.screen.canvasSize.width;
        this.gameArea.style.height = this.config.screen.canvasSize.height;
        this.canvas.onselectstart = function () { return false; } //stop text select on double click
        this.ctx = this.canvas.getContext("2d");
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "top";
        this.ctx.font = "12px Helvetica";
        this.ctx.fillStyle = "rgb(0,0,0)";
    }

    addCanvasListeners(){

        //mouse move on canvas
        this.canvas.addEventListener('mousemove', (e) => {
            this.pos = this.getMousePos(this.canvas,e);
        });

        //click on canvas
        this.canvas.addEventListener('click', (e) => {
            this.click = this.getMousePos(this.canvas,e);
            let click = this.click;
            this.callbacksClick.forEach( callback => callback(click) );
        });

    }

    getMousePos(canvas,e) {
        let rect = this.canvas.getBoundingClientRect();
        return {
            x: Math.floor(e.clientX - rect.left),
            y: Math.floor(e.clientY - rect.top)
        };
    }
    registerCallbackClick(callback) {
        this.callbacksClick.push(callback);
    }
}

export default Canvas;
