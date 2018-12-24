import {
  PIPE_WIDTH,
  PIPE_SPEED,
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
    this._draw = this._draw.bind(this);
    this._move = this._move.bind(this);
  }

  updateState(){
    this._pipes.forEach(p => this._move(p));
    this._frames += 1;
    if(!(this._frames%60)){
      this._addNewPipes();
    }
  }

  updateCanvas(){
    this._pipes.forEach(p => this._draw(p));
  }

  _drawPipes(){
    //    const ctx = this.ctx;
    //    let pipe = new Image();
    //    pipe.src = 'assets/pipe.png';
    //    ctx.drawImage(pipe, x, 600 - 200, PIPE_WIDTH, 300);
    //    ctx.save();
    //    ctx.translate(x, 0);
    //    ctx.rotate(Math.PI);
    //    ctx.drawImage(pipe, -PIPE_WIDTH, -200, PIPE_WIDTH, 200);
    //    ctx.restore();
  }

  hasBirdCrashed(){
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
    var space = 170;
    var btm = this._getRandomInt(GROUND_HEIGHT + 50, 400);
    var top = CANVAS_Y - btm - space;
    var pipe = {
      top: top,
      x: 600,
      y: 0,
      btm: btm,
      space: space,
      width: PIPE_WIDTH
    };
    this._pipes.push(pipe);
  }

  _getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export default Pipes;
