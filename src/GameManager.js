import {
  BIRD,
  CANVAS,
  STATE,
} from './Constants';
import Background from './Background';
import Bird from './Bird';
import Pipes from './Pipes';
import {birdJumpSound, pipeCrashSound, earnPointSound} from './Sounds';
import {GAMEOVER_SRC} from './Images';

const gameOverImg = new Image();
gameOverImg.src = GAMEOVER_SRC;

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
      score: 0,
    };
    this.updateState = this.updateState.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this._run = this._run.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  _run(){
    this.updateState();
    this.updateCanvas();
    if(this.state.currentGameState != STATE.ENDGAME){
      this.requestId = requestAnimationFrame(this._run);
    }
  }

  newGame(){
    this._run();
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
      pipes,
    } = this.state;

    if(this.state.currentGameState != STATE.BIRDCRASHED && this.hasBirdCrashedPipe(bird, pipes)){
      this.state.currentGameState = STATE.BIRDCRASHED;
      this.state.flashOpacity = 30;
    }

    if(bird.hasBirdTouchedGround() && !this.state.flashOpacity){
      this.state.currentGameState = STATE.ENDGAME;
      this.updateGameScores(this.state.score);
    }

    this.state.flashOpacity -= (this.state.flashOpacity > 0 ? 1 : 0);

    if(pipes.hasBirdPassedFirstPipe()){
      this.state.score += 1;
      earnPointSound.play();
    }

    backGround.updateState(this.state.currentGameState);
    pipes.updateState(this.state.currentGameState);
    bird.updateState(this.state.currentGameState, frames);
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

    ctx.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
    backGround.drawUpperBackground();
    pipes.updateCanvas();
    bird.updateCanvas();
    backGround.drawLowerBackground();

    if(flashOpacity > 0){
      ctx.fillStyle = `rgba(255, 255, 255, ${flashOpacity/30})`;
      ctx.fillRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
    }

    if(currentGameState === STATE.ENDGAME){
      this._drawGameOver();
    }else {
      this._drawScore();
    }
  }

  _drawScore(){
    const ctx = this.ctx;
    ctx.font = '46px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(this.state.score, CANVAS.WIDTH/2 - 23, 50);
  }

  _drawGameOver(){
    const ctx = this.ctx;
    ctx.drawImage(gameOverImg, CANVAS.WIDTH/2 - 200, CANVAS.HEIGHT/10, 400, 200);
    ctx.font = "100px Arial";
    ctx.fillText(this.state.score, CANVAS.WIDTH/2 - 40, CANVAS.HEIGHT/2 + 50);
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

  toggleSound(isMuted){
    birdJumpSound.muted = isMuted;
    pipeCrashSound.muted = isMuted;
    earnPointSound.muted = isMuted;
  }
}

export default GameManager;
