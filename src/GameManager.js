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
    this.state = {
      backGround: new Background(ctx),
      bird: new Bird(ctx),
      pipes: new Pipes(ctx)
    }
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
    const {
      backGround,
      bird,
      pipes
    } = this.state;
    backGround.updateState(this.currentState);
    pipes.updateState(this.currentState);
    bird.updateState(this.currentState, frames);
    if(bird.hasBirdTouchedGround() || pipes.hasBirdCrashed(bird)){
      this.currentState = ENDGAME;
    }
  }

  updateCanvas(){
    const {
      backGround,
      bird,
      pipes
    } = this.state;
    this.ctx.clearRect(0, 0, CANVAS_X, CANVAS_Y);
    backGround.upperBg();
    pipes.updateCanvas();
    bird.updateCanvas();
    backGround.ground();
  }

  onPressed(){
    const {
      backGround,
      bird,
      pipes
    } = this.state;
    switch(this.currentState){
      case PREGAME:
        this.currentState = PLAYING;
        bird.jump();
        break;
      case PLAYING:
        bird.jump();
        break;
    }
  }
}

export default GameManager;
