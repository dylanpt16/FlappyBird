import {
  PIPE_WIDTH,
  PIPE_SPEED,
  CANVAS_X,
  CANVAS_Y,
  PREGAME,
  PLAYING,
  ENDGAME
} from './Constants';

class Pipes{
  constructor(ctx){
    this.ctx = ctx;
    this._pipes = [];
    this.hasBirdCrashed = this.hasBirdCrashed.bind(this);
    this._draw = this._draw.bind(this);
    this._move = this._move.bind(this);
  }

  updateState(){
    this._pipes.forEach(p => this._move(p));
    if(this._pipes.length === 0){
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
    let pipe = new Image();
    pipe.src = 'assets/pipe.png';
    ctx.drawImage(pipe, p.x, 600 - 200, PIPE_WIDTH, 300);
    ctx.save();
    ctx.translate(p.x, 0);
    ctx.rotate(Math.PI);
    ctx.drawImage(pipe, -PIPE_WIDTH, -200, PIPE_WIDTH, 200);
    ctx.restore();
  }

  _addNewPipes(){
    var top = this._getRandomInt(10, 200);
    var btm = CANVAS_Y - top - 80;
    var pipe = {
      top: top,
      x: 600
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
