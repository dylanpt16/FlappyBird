import {
  BIRD_X,
  BIRD_Y,
  CANVAS_Y,
  PREGAME,
  PLAYING,
  ENDGAME
} from './Constants';

class Bird{
  constructor(ctx){
    this.ctx = ctx;
    this.frames = 0;
    this.state = {
      x: 150,
      y: 200,
      gravity: 0.5,
      velocity: -2,
      rotation: 0,
      animationSpeed: 10,
      idx: 0,
      img: [184, 92, 0],
    }
    this._drawBird();
    this.hasBirdTouchedGround = this.hasBirdTouchedGround.bind(this);
  }

  updateState(currentState, frames){
    this.frames = frames;
    const {y} = this.state;
    switch(currentState){
      case PREGAME:
        this.state.y = y + Math.cos(this.frames/7);
        break;
      case PLAYING:
        this._playingState();
        break;
      case ENDGAME:
        this._endGameState();
        break;
    }
  }

  _playingState(){
    this.state.velocity += this.state.gravity;
    this.state.y += this.state.velocity;
    if(this.state.velocity >= 10){
      this.state.rotation = Math.min(Math.PI/2, this.state.rotation + 0.3);
    }else{
      this.state.rotation = -0.3
    }
  }

  _endGameState(){
    this.state.img = [92, 92, 92];
    if( this.state.y <= (5*CANVAS_Y/6 - 30) ){
      this.state.rotation = Math.min(Math.PI/2, this.state.rotation + 0.3);
      this.state.y += 10;
    }
  }

  hasBirdTouchedGround(){
    return this.state.y >= (5*CANVAS_Y/6 - 30);
  }

  updateCanvas(){
    this._drawBird();
  }

  _drawBird(){
    let {
      img,
      idx
    } = this.state;
    idx = Math.floor(this.frames / 10) % 4;
    idx = idx === 3 ? 1 : idx;
    this.state.idx = idx;
    this._bird(img[idx]);
  }

  _bird(px){
    const ctx = this.ctx;
    let {x, y, rotation} = this.state;
    let bird = new Image();
    bird.src = 'assets/bird.png';
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.drawImage(bird, px, 0, 92, 64, -BIRD_X/2, -BIRD_Y/2, BIRD_X, BIRD_Y);
    ctx.restore();
  }

  jump(){
    this.state.velocity = -10;
  }
}

export default Bird;
