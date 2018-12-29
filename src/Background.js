import {
  CANVAS_X,
  CANVAS_Y,
  BACKGROUND_HEIGHT,
  GROUND_HEIGHT,
  PREGAME,
  PLAYING,
  ENDGAME
} from './Constants';

class Background{
  constructor(ctx){
    this.ctx = ctx;
    this.state = {
      x: 600,
    }
    this.currentState = PREGAME;
  }

  updateState(currentState){
    this.currentState = currentState;
    switch(currentState){
      case ENDGAME:
        break;
      default:
        this.state.x -= 5;
        if(this.state.x < 570){
          this.state.x = 600;
        }
    }
  }

  drawUpperBg(){
    const ctx = this.ctx;
    let bg = new Image();
    bg.src = 'assets/background.png';
    ctx.drawImage(bg, 0, 0, CANVAS_X, BACKGROUND_HEIGHT);
    if(this.currentState === PREGAME){
      let logo = new Image();
      logo.src = 'assets/logo.png';
      ctx.drawImage(logo, CANVAS_X/2 - 131, CANVAS_Y/6, 262, 70);
    }
  }

  drawGround(){
    const ctx = this.ctx;
    let bg = new Image();
    bg.src = 'assets/ground.png';
    for(let i = 0; i < 18 ; i++){
      ctx.drawImage(bg, this.state.x-37*i, BACKGROUND_HEIGHT);
    }
  }
}

export default Background;
