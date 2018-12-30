import {
  BIRD_X,
  BIRD_WIDTH,
  BIRD_HEIGHT,
  CANVAS_Y,
  BACKGROUND_HEIGHT,
  PREGAME,
  PLAYING,
  ENDGAME
} from './Constants';

class Bird{
  constructor(ctx){
    this.ctx = ctx;
    this.frames = 0;
    this.state = {
      x: BIRD_X,
      y: 250,
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
    if(this.state.y <= BIRD_HEIGHT/2){
      this.state.velocity = 1;
    }
    this.state.y += this.state.velocity;
    if(this.state.velocity >= 10){
      this.state.rotation = Math.min(Math.PI/2, this.state.rotation + 0.3);
    }else{
      this.state.rotation = -0.3
    }
  }

  _endGameState(){
    this.state.img = [92, 92, 92];
    if(this.state.y <= BACKGROUND_HEIGHT - BIRD_WIDTH/2){
      this.state.rotation = Math.min(Math.PI/2, this.state.rotation + 0.3);
      this.state.y += 10;
    }
  }

  hasBirdTouchedGround(){
    return this.state.y >= BACKGROUND_HEIGHT - BIRD_WIDTH/2;
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
    ctx.drawImage(bird, px, 0, 92, 64, -BIRD_WIDTH/2, -BIRD_HEIGHT/2, BIRD_WIDTH, BIRD_HEIGHT);
    ctx.restore();
  }

  jump(){
    this.state.velocity = -10;
  }

  getX(){
    return this.state.x;
  }

  getY(){
    return this.state.y;
  }
}

export default Bird;
