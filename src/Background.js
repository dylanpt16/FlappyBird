import {
  CANVAS_X,
  CANVAS_Y,
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

  _upperBg(){
    let bg = new Image();
    bg.src = 'assets/background.png';
    this.ctx.drawImage(bg, 0, 0, CANVAS_X, 5*CANVAS_Y/6);
  }

  _ground(){
    let bg = new Image();
    bg.src = 'assets/ground.png';
    for(let i = 0; i < 18 ; i++){
      this.ctx.drawImage(bg, this.state.x-37*i, 5*CANVAS_Y/6, 37, CANVAS_Y/6);
    }
  }
}

export default Background;
