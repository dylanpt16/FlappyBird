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
  }

  updateState(currentState){
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

  updateCanvas(){
    this._upperBg();
    this._ground();
  }

  upperBg(){
    let bg = new Image();
    bg.src = 'assets/background.png';
    this.ctx.drawImage(bg, 0, 0, CANVAS_X, BACKGROUND_HEIGHT);
  }

  ground(){
    let bg = new Image();
    bg.src = 'assets/ground.png';
    for(let i = 0; i < 18 ; i++){
      this.ctx.drawImage(bg, this.state.x-37*i, BACKGROUND_HEIGHT);
    }
  }
}

export default Background;
