import {
  PIPE_WIDTH,
  PIPE_SPEED,
  BIRD_HEIGHT,
  CANVAS_X,
  CANVAS_Y,
  GROUND_HEIGHT,
  PREGAME,
  PLAYING,
  ENDGAME
} from './Constants';

class Pipes{
  constructor(ctx){
    this.ctx = ctx;
    this._pipes = [];
    this._frames = 0;
    this.hasBirdCrashed = this.hasBirdCrashed.bind(this);
    this.hasBirdPassed = this.hasBirdPassed.bind(this);
    this._draw = this._draw.bind(this);
    this._move = this._move.bind(this);
  }

  updateState(currentState){
    switch(currentState){
      case PREGAME:
        break;
      case PLAYING:
        this._pipes.forEach(p => this._move(p));
        this._frames += 1;
        if(!(this._frames%60)){
          this._addNewPipes();
        }
        if( this._pipes[0] && this._pipes[0].x === -PIPE_WIDTH){
          this._removeOldPipes();
        }
        break;
      case ENDGAME:
        break;
    }
  }

  updateCanvas(){
    this._pipes.forEach(p => this._draw(p));
  }

  hasBirdCrashed(bird){
    let hasCrashed = false;
    let birdX = bird.getX();
    let birdY = bird.getY();
    this._pipes.forEach(p => {
      let {
        x,
        y,
        width,
        top,
        space
      } = p;
      let closestX  = Math.min(Math.max(birdX, x), x + width);
      let closestTop = Math.min(birdY, y + top);
      let closestBtm  = Math.max(birdY, y + top + space);

      let dX  = birdX - closestX;
      let dTop = birdY - closestTop;
      let dBtm = birdY - closestBtm;
      // vector length
      let d1 = dX*dX + dTop*dTop;
      let d2 = dX*dX + dBtm*dBtm;
      let birdRadius = (BIRD_HEIGHT/2)*(BIRD_HEIGHT/2);
      // determine intersection
      if (birdRadius > d1 || birdRadius > d2) {
        hasCrashed = true;
      }
    })
    return hasCrashed;
  }

  _move(p){
    p.x -= PIPE_SPEED;
  }

  _draw(p){
    const ctx = this.ctx;
    const {x, y, top, btm, space, width} = p;
    let pipe = new Image();
    pipe.src = 'assets/pipe.png';
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI);
    ctx.drawImage(pipe, -width, -top, width, 600);
    ctx.restore();
    ctx.drawImage(pipe, x, top + space, width, 600);
  }

  _addNewPipes(){
    let space = 170;
    let btm = this._getRandomInt(GROUND_HEIGHT + 50, 400);
    let top = CANVAS_Y - btm - space;
    let pipe = {
      top: top,
      x: 600,
      y: 0,
      btm: btm,
      space: space,
      width: PIPE_WIDTH
    };
    this._pipes.push(pipe);
  }

  _removeOldPipes(){
    this._pipes.splice(0, 1);
  }

  _getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  hasBirdPassed(){
    const pipe = this._pipes[0];
    return (pipe && pipe.x + pipe.width === 130);
  }
}

export default Pipes;
