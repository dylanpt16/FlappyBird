import {
  BACKGROUND,
  BIRD,
  CANVAS,
  PIPE,
  STATE,
} from './Constants';
import {BACKGROUND_SRC} from './Images';

const upperBackgroundImg = new Image();
upperBackgroundImg.src = BACKGROUND_SRC.UPPER;
const lowerBackgroundImg = new Image();
lowerBackgroundImg.src = BACKGROUND_SRC.LOWER;
const fingerImg = new Image();
fingerImg.src = BACKGROUND_SRC.FINGER;
const logoImg = new Image();
logoImg.src = BACKGROUND_SRC.LOGO;
const spacebarImg = new Image();
spacebarImg.src = BACKGROUND_SRC.SPACEBAR;

class Background{
  constructor(ctx){
    this.ctx = ctx;
    this.state = {
      x: 600,
    }
  }

  updateState(currentState){
    this.currentState = currentState;
    if(currentState === STATE.PLAYING || currentState === STATE.PREGAME){
      this.state.x -= BACKGROUND.SPEED;
      if(this.state.x <= 564){
        this.state.x = 600;
      }
    }
  }

  drawUpperBackground(){
    const ctx = this.ctx;
    ctx.drawImage(upperBackgroundImg, 0, 0, CANVAS.WIDTH, BACKGROUND.UPPER_HEIGHT);
    if(this.currentState === STATE.PREGAME){
      this._drawInstructions();
    }
  }

  _drawInstructions(){
    const ctx = this.ctx;
    ctx.drawImage(logoImg, CANVAS.WIDTH/2 - 131, CANVAS.HEIGHT/6, 262, 70);
    ctx.drawImage(spacebarImg, CANVAS.WIDTH/2 - 60, CANVAS.HEIGHT/2.8, 120, 100)
    ctx.drawImage(fingerImg, CANVAS.WIDTH/2 - 50, CANVAS.HEIGHT/2, 100, 80)
  }

  drawLowerBackground(){
    const ctx = this.ctx;
    for(let i = 0; i < 18; i++){
      ctx.drawImage(lowerBackgroundImg, this.state.x-36*i, BACKGROUND.UPPER_HEIGHT);
    }
  }
}

export default Background;
