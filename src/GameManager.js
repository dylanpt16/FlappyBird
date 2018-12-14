import {
  CANVAS_X,
  CANVAS_Y
} from './Constants';
import Background from './background';

class GameManager{
  constructor(ctx){
    this.ctx = ctx;
    this.backGround = new Background(ctx);
    this.updateState = this.updateState.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this._run = this._run.bind(this);
  }

  _run(){
    this.updateState();
    this.updateCanvas();
    this.requestId = requestAnimationFrame(this._run);
  }

  newGame(){
    if(this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
    this.requestId = requestAnimationFrame(this._run);
  }

  updateState(){
    this.backGround.updateState();
  }

  updateCanvas(){
    this.ctx.clearRect(0, 0, CANVAS_X, CANVAS_Y);
    this.backGround.updateCanvas();
  }
}

export default GameManager;
