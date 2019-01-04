import {
  BACKGROUND,
  BIRD,
  CANVAS,
  STATE,
} from './Constants';
import {BIRD_SRC} from './Images';

const ANIMATION_SPEED = BIRD.ANIMATION_SPEED;
const birdImg = new Image();
birdImg.src = BIRD_SRC;
const FLAPPING_BIRD_IMG_INDEXES = [184, 92, 0];
const birdGravity = BIRD.GRAVITY;

class Bird{
  constructor(ctx){
    this.ctx = ctx;
    this.frames = 0;
    this.state = {
      currentState: STATE.PREGAME,
      images: FLAPPING_BIRD_IMG_INDEXES,
      imagesIdx: 0,
      imagesRotation: 0,
      velocity: BIRD.INITIAL_VELOCITY,
      x: BIRD.INITIAL_X_POSITION,
      y: BIRD.INITIAL_Y_POSITION,
    }
    this._drawBirdIndexes = [
      () => this._drawBirdFlapUp(),
      () => this._drawBirdFlapMid(),
      () => this._drawBirdFlapDown(),
      () => this._drawBirdFlapMid()
    ];
    this.hasBirdTouchedGround = this.hasBirdTouchedGround.bind(this);
    this._drawSprite = this._drawSprite.bind(this);
  }

  updateState(currentState){
    this.frames += 1;
    this.state.currentState = currentState;
    switch(currentState){
      case STATE.PREGAME:
        this.state.y = this.state.y + Math.cos(this.frames/7);
        break;
      case STATE.PLAYING:
        this._playingState();
        break;
      default:
        this._endGameState();
        break;
    }
  }

  updateCanvas(){
    let idx = 0;
    idx = Math.floor(this.frames/10) % 4;

    switch(this.state.currentState){
      case STATE.PLAYING:
      case STATE.PREGAME:
        this._drawBirdIndexes[idx]();
        break;
      default:
        this._drawBirdFlapMid();
        break;
    }
  }

  _playingState(){
    let {imagesRotation, velocity, y} = this.state;
    const hasBirdTouchedCeiling = y <= BIRD.HEIGHT/2;
    velocity = hasBirdTouchedCeiling ? 1: velocity + birdGravity;
    y += velocity;
    if(velocity >= BIRD.JUMP_INITIAL_SPEED){
      imagesRotation = Math.min(Math.PI/2, imagesRotation + 0.3);
    }else{
      imagesRotation = -0.3;
    }
    this.state.imagesRotation = imagesRotation;
    this.state.velocity = velocity;
    this.state.y = y;
  }

  _endGameState(){
    const lowestBirdPosition = this.state.y + BIRD.WIDTH/2;
    if(lowestBirdPosition < BACKGROUND.UPPER_HEIGHT){
      this.state.imagesRotation = Math.min(Math.PI/2, this.state.imagesRotation + 0.3);
      this.state.y += 10;
    }
  }

  hasBirdTouchedGround(){
    const lowestBirdPosition = this.state.y + BIRD.WIDTH/2;
    return lowestBirdPosition >= BACKGROUND.UPPER_HEIGHT;
  }

  _drawBirdFlapUp(){
    this._drawSprite(184);
  }

  _drawBirdFlapMid(){
    this._drawSprite(92);
  }

  _drawBirdFlapDown(){
    this._drawSprite(0);
  }

  _drawSprite(spriteX){
    const ctx = this.ctx;
    let {x, y, imagesRotation} = this.state;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(imagesRotation);
    ctx.drawImage(birdImg, spriteX, 0, 92, 64, -BIRD.WIDTH/2, -BIRD.HEIGHT/2, BIRD.WIDTH, BIRD.HEIGHT);
    ctx.restore();
  }

  jump(){
    this.state.velocity = -BIRD.JUMP_INITIAL_SPEED;
  }

  getPositions() {
    return [this.state.x, this.state.y];
  }
}

export default Bird;
