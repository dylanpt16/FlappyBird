import {
  CANVAS_X,
  CANVAS_Y
} from './Constants';
import Background from './Background';
import Bird from './Bird';

class GameManager{
  constructor(ctx){
    this.ctx = ctx;
    this.backGround = new Background(ctx);
    this.bird = new Bird(ctx);
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
    const frames = this.requestId;
    this.backGround.updateState();
    this.bird.updateState(frames);
  }

  updateCanvas(){
    this.ctx.clearRect(0, 0, CANVAS_X, CANVAS_Y);
    this.backGround.updateCanvas();
    this.bird.updateCanvas();
  }
}

export default GameManager;
