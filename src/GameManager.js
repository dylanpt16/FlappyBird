import {
  BIRD,
  CANVAS,
  STATE,
} from './Constants';
import Background from './Background';
import Bird from './Bird';
import Pipes from './Pipes';
import {birdJumpSound, pipeCrashSound, earnPointSound} from './Sounds';

class GameManager{
  constructor(ctx){
    this.ctx = ctx;
    this.state = {
      backGround: new Background(ctx),
      bird: new Bird(ctx),
      pipes: new Pipes(ctx),
      score: 0
    };
    this.isSoundMuted = true;
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

    if(this.currentState != STATE.ENDGAME && this.hasBirdCrashedPipe(bird, pipes) || bird.hasBirdTouchedGround()){
      this.currentState = STATE.ENDGAME;
    }

    if(pipes.hasBirdPassedFirstPipe()){
      this.state.score += 1;
      earnPointSound.play();
    }
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
        birdJumpSound.play();
        break;
      case STATE.PLAYING:
        bird.jump();
        birdJumpSound.play();
        break;
    }
  }

  hasBirdCrashedPipe(bird, pipes){
    const [birdX, birdY] = bird.getPositions();
    const {x, y, width, upperPipeHeight, space} = pipes.leftMostPipe();
    const closestX  = Math.min(Math.max(birdX, x), x + width);
    const closestUpperPipeHeight = Math.min(birdY, y + upperPipeHeight);
    const closestLowerPipeHeight  = Math.max(birdY, y + upperPipeHeight + space);

    const dX  = birdX - closestX;
    const dUpperPipeHeight = birdY - closestUpperPipeHeight;
    const dLowerPipeHeight = birdY - closestLowerPipeHeight;
    // vector length
    const d1 = dX*dX + dUpperPipeHeight*dUpperPipeHeight;
    const d2 = dX*dX + dLowerPipeHeight*dLowerPipeHeight;
    const birdRadius = (BIRD.HEIGHT/2)*(BIRD.HEIGHT/2);
    // determine intersection
    if (birdRadius > d1 || birdRadius > d2) {
      pipeCrashSound.play();
      return true;
    }
    return false;
  }

  drawScore(){
    const ctx = this.ctx;
    ctx.font = '46px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(this.state.score, CANVAS.WIDTH/2 - 23, 50);
  }

  toggleSound(){
    birdJumpSound.muted = this.isSoundMuted;
    pipeCrashSound.muted = this.isSoundMuted;
    earnPointSound.muted = this.isSoundMuted;
    this.isSoundMuted = !this.isSoundMuted;
  }
}

export default GameManager;
