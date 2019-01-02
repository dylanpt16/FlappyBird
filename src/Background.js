import {
  CANVAS_X,
  CANVAS_Y,
  BACKGROUND_HEIGHT,
  GROUND_HEIGHT,
  GROUND_SPEED,
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
    this.img = {
      'bg': 'assets/img/background.png',
      'ground': 'assets/img/ground.png',
      'logo': 'assets/img/logo.png',
      'spaceBar': 'assets/img/spacebar.png',
      'finger': 'assets/img/finger.jpg'
    }
  }

  updateState(currentState){
    this.currentState = currentState;
    switch(currentState){
      case PLAYING:
        this.state.x -= GROUND_SPEED;
        if(this.state.x < 563){
          this.state.x = 600;
        }
      default:
        break;
    }
  }

  drawUpperBg(){
    const ctx = this.ctx;
    let bg = new Image();
    bg.src = this.img['bg'];
    ctx.drawImage(bg, 0, 0, CANVAS_X, BACKGROUND_HEIGHT);
    if(this.currentState === PREGAME){
      this._drawInstructions();
    }
  }

  _drawInstructions(){
    const ctx = this.ctx;
    let logo = new Image();
    logo.src = this.img['logo'];
    ctx.drawImage(logo, CANVAS_X/2 - 131, CANVAS_Y/6, 262, 70);
    let spaceBar = new Image();
    spaceBar.src = this.img['spaceBar'];
    ctx.drawImage(spaceBar, CANVAS_X/2 - 60, CANVAS_Y/2.8, 120, 100)
    let finger = new Image();
    finger.src = this.img['finger'];
    ctx.drawImage(finger, CANVAS_X/2 - 50, CANVAS_Y/2, 100, 80)
  }

  drawGround(){
    const ctx = this.ctx;
    let ground = new Image();
    ground.src = this.img['ground'];
    for(let i = 0; i < 18 ; i++){
      ctx.drawImage(ground, this.state.x-37*i, BACKGROUND_HEIGHT);
    }
  }
}

export default Background;
