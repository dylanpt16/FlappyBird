import {
  BIRD_X,
  BIRD_Y
} from './Constants';

class Bird{
  constructor(ctx){
    this.ctx = ctx;
    this._drawBird();
    this.frames = 0;
    this.state = {
      x: 150,
      y: 200
    }
  }

  updateState(){
    this.frames += 1;
  }

  updateCanvas(){
    this._drawBird();
  }

  _drawBird(){
    switch(this.frames % 20){
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
        this._bird(184);
        break;
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        this._bird(92);
        break;
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
        this._bird(0);
        break;
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
        this._bird(92);
        break;
    }
  }

  _bird(px){
    let {x, y} = this.state;
    let bird = new Image();
    bird.src = 'assets/bird.png';
    y = y + 7*Math.cos(this.frames/7);
    this.ctx.drawImage(bird, px, 0, 92, 64, x, y, BIRD_X, BIRD_Y);
  }
}

export default Bird;
