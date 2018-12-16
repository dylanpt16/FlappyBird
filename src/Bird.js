import {
  BIRD_X,
  BIRD_Y
} from './Constants';

class Bird{
  constructor(ctx){
    this.ctx = ctx;
    this.frames = 0;
    this.state = {
      x: 150,
      y: 200,
      gravity: 0,
      velocity: -10,
      rotation: 0,
      animationSpeed: 10,
      birdFrame: 0,
      birdSequence: [0, 1, 2, 1],
      birdImg: [184, 92, 0],
    }
    this._drawBird();
  }

  updateState(){
    this.frames += 1;
    const {y} = this.state;
    this.state.y = y + Math.cos(this.frames/7);
  }

  updateCanvas(){
    this._drawBird();
  }

  _drawBird(){
    let {
      animationSpeed,
      birdSequence,
      birdImg,
      birdFrame
    } = this.state;
    birdFrame += this.frames % animationSpeed === 0 ? 1 : 0;
    birdFrame %= 4;
    this.state.birdFrame = birdFrame;
    this._bird(birdImg[birdSequence[birdFrame]]);
  }

  _bird(px){
    this.ctx.save();
    let {x, y} = this.state;
		this.ctx.translate(x, y);
		this.ctx.rotate(0);
    let bird = new Image();
    bird.src = 'assets/bird.png';
    this.ctx.drawImage(bird, px, 0, 92, 64, 0, 0, BIRD_X, BIRD_Y);
    this.ctx.restore();
  }
}

export default Bird;
