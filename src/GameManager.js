import {
  CANVAS_X,
  CANVAS_Y,
  PREGAME,
  PLAYING,
  ENDGAME
} from './Constants';
import Background from './Background';
import Bird from './Bird';
import Pipes from './Pipes';

class GameManager{
  constructor(ctx){
    this.ctx = ctx;
    this.backGround = new Background(ctx);
    this.bird = new Bird(ctx);
    this.pipes = new Pipes(ctx);
    this.updateState = this.updateState.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this._run = this._run.bind(this);
    this.currentState = PREGAME;
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
    this.backGround.updateState(this.currentState);
    this.pipes.updateState(this.currentState);
    this.bird.updateState(this.currentState, frames);
    if(this.bird.hasBirdTouchedGround() || this.pipes.hasBirdCrashed(this.bird)){
      this.currentState = ENDGAME;
    }
  }

  updateCanvas(){
    this.ctx.clearRect(0, 0, CANVAS_X, CANVAS_Y);
    this.backGround.upperBg();
    this.pipes.updateCanvas();
    this.bird.updateCanvas();
    this.backGround.ground();
  }

  onPressed(){
    switch(this.currentState){
      case PREGAME:
        this.currentState = PLAYING;
        this.bird.jump();
        break;
      case PLAYING:
        this.bird.jump();
        break;
    }
  }
}

export default GameManager;
