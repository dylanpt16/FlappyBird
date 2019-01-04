import {
  BIRD,
  CANVAS,
  STATE,
} from './Constants';
import Background from './Background';
import Bird from './Bird';
import Pipes from './Pipes';
import {birdJumpSound, pipeCrashSound, earnPointSound} from './Sounds';

let instanceNumber = 0;

class GameManager{
  constructor(ctx, difficulty, updateGameScores){
    this.ctx = ctx;
    this.updateGameScores = updateGameScores;
    this._difficulty = difficulty;
    this.state = {
      backGround: new Background(this.ctx),
      bird: new Bird(this.ctx),
      currentGameState: STATE.PREGAME,
      flashOpacity: 0,
      pipes: new Pipes(this.ctx, this._difficulty),
      scores: 0,
    };
    this.updateState = this.updateState.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this._run = this._run.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  _run(){
    this.updateState();
    this.updateCanvas();
    if(!this.state.bird.hasBirdTouchedGround()){
      this.requestId = requestAnimationFrame(this._run);
    }
  }

  newGame(){
    this.endGame();
    this.requestId = requestAnimationFrame(this._run);
  }

  endGame(){
    if(this.requestId){
      cancelAnimationFrame(this.requestId);
    }
  }

  updateState(){
    const frames = this.requestId;
    const {
      backGround,
      bird,
      currentGameState,
      pipes,
    } = this.state;

    backGround.updateState(currentGameState);
    pipes.updateState(currentGameState);
    bird.updateState(currentGameState, frames);

    if(this.state.currentGameState != STATE.BIRDCRASHED && this.hasBirdCrashedPipe(bird, pipes)){
      this.state.currentGameState = STATE.BIRDCRASHED;
      this.state.flashOpacity = 7;
    }

    if(bird.hasBirdTouchedGround()){
      this.state.currentGameState = STATE.ENDGAME;
      this.updateGameScores(this.state.scores);
    }

    this.state.flashOpacity -= this.state.flashOpacity > 0 ? 1 : 0;

    if(pipes.hasBirdPassedFirstPipe()){
      this.state.scores += 1;
      earnPointSound.play();
    }
  }

  updateCanvas(){
    const {
      backGround,
      bird,
      currentGameState,
      flashOpacity,
      pipes,
    } = this.state;

    const ctx = this.ctx;

    ctx.clearRect(0, 0, CANVAS.HEIGHT, CANVAS.HEIGHT);
    backGround.drawUpperBackground();
    pipes.updateCanvas();
    bird.updateCanvas();
    backGround.drawLowerBackground();
    this.drawScore();

    ctx.globalAlpha = flashOpacity > 0 ? 0.03*(10 - flashOpacity) : 1;
  }

  onPressed(){
    const {
      bird,
    } = this.state;

    switch(this.state.currentGameState){
      case STATE.PREGAME:
        this.state.currentGameState = STATE.PLAYING;
        bird.jump();
        birdJumpSound.play();
        break;
      case STATE.PLAYING:
        bird.jump();
        birdJumpSound.play();
        break;
    }

    if(bird.hasBirdTouchedGround()){
      this.reInitializeGame();
    }
  }

  reInitializeGame(){
    const newState = {
      backGround: new Background(this.ctx),
      bird: new Bird(this.ctx),
      currentGameState: STATE.PREGAME,
      pipes: new Pipes(this.ctx, this._difficulty),
      scores: 0,
    };

    this.state = Object.assign(this.state, newState);
    this.newGame();
  }

  hasBirdCrashedPipe(bird, pipes){
    const [birdX, birdY] = bird.getPositions();
    const {x, y, width, upperPipeHeight, spaceBtwUpAndDown} = pipes.leftMostPipe();
    const closestX  = Math.min(Math.max(birdX, x), x + width);
    const closestUpperPipeHeight = Math.min(birdY, y + upperPipeHeight);
    const closestLowerPipeHeight  = Math.max(birdY, y + upperPipeHeight + spaceBtwUpAndDown);

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
    ctx.fillText(this.state.scores, CANVAS.WIDTH/2 - 23, 50);
  }

  drawLives(){
    const ctx = this.ctx;
    ctx.font = '46px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(this.state.lives, 50, 50);
  }

  updateScores(){
    return this.state.scorecollection || [];
  }

  drawAllScores(){
    const ctx = this.ctx;
    ctx.globalAlpha = 1;
    ctx.font = '46px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Your scores', CANVAS.WIDTH/2 - 120, 150);
    let i = 1;
    this.state.scoreCollection.forEach((el)=>{
      ctx.fillText(el, CANVAS.WIDTH/2 - 23, 160 + 100*i);
      i += 1;
    })
    ctx.globalAlpha = 0.7;
  }

  toggleSound(isMuted){
    birdJumpSound.muted = isMuted;
    pipeCrashSound.muted = isMuted;
    earnPointSound.muted = isMuted;
  }
}

export default GameManager;
