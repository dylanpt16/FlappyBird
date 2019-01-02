import {
  CANVAS,
  STATE,
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
      pipes: new Pipes(ctx),
      score: 0
    };
    this.updateState = this.updateState.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this._run = this._run.bind(this);
    this.currentState = STATE.PREGAME;
  }

  _run(){
    this.updateState();
    this.updateCanvas();
    this.requestId = requestAnimationFrame(this._run);
  }

  newGame(){
    if(this.requestId){
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
    if(this.currentState != STATE.ENDGAME
      && (bird.hasBirdTouchedGround()
      || pipes.hasBirdCrashedPipe(bird))
    ){
      this.currentState = STATE.ENDGAME;
    }
    this.state.score += pipes.hasBirdPassedFirstPipe() ? 1 : 0;
  }

  updateCanvas(){
    const {
      backGround,
      bird,
      pipes
    } = this.state;
    this.ctx.clearRect(0, 0, CANVAS.HEIGHT, CANVAS.HEIGHT);
    backGround.drawUpperBackground();
    pipes.updateCanvas();
    bird.updateCanvas();
    backGround.drawLowerBackground();
    this.drawScore();
  }

  onPressed(){
    const {
      bird,
    } = this.state;
    switch(this.currentState){
      case STATE.PREGAME:
        this.currentState = STATE.PLAYING;
        bird.jump();
        break;
      case STATE.PLAYING:
        bird.jump();
        break;
    }
  }

  drawScore(){
    const ctx = this.ctx;
    ctx.font = '46px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(this.state.score, CANVAS.WIDTH/2 - 23, 50);
  }
}

export default GameManager;
