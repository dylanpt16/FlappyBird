import {
  BACKGROUND,
  BIRD,
  CANVAS,
  DIFFICULTY,
  PIPE,
  STATE,
} from './Constants';

import {PIPE_SRC} from './Images';

import {pipeCrashSound} from './Sounds';

const pipeImg = new Image();
pipeImg.src = PIPE_SRC;

class Pipes{
  constructor(ctx, difficulty){
    this.ctx = ctx;
    this._difficulty = difficulty;
    this._pipeCollection = [];
    this.hasBirdPassedFirstPipe = this.hasBirdPassedFirstPipe.bind(this);
  }

  updateState(currentState){
    if(currentState === STATE.PLAYING){
      this._pipeCollection.forEach(this._movePipes.bind(this));
      const isEmpty = this._pipeCollection.length === 0;
      const rightMostPipe = this._pipeCollection[this._pipeCollection.length - 1];
      const leftMostPipe = this._pipeCollection[0];
      const shouldAddNewPipe = isEmpty || rightMostPipe.x <= 330;
      const shouldRemoveOldPipe = !isEmpty && leftMostPipe.x <= -PIPE.WIDTH;
      if(shouldAddNewPipe){
        this._addNewPipes();
      }
      if(shouldRemoveOldPipe){
        this._removeOldPipes();
      }
    }
  }

  updateCanvas(){
    this._pipeCollection.forEach(this._drawPipes.bind(this));
  }

  _movePipes(pipe){
    pipe.x -= PIPE.SPEED;
  }

  _drawPipes(pipe){
    const ctx = this.ctx;
    const {x, y, upperPipeHeight, lowerPipeHeight, spaceBtwUpAndDown, width} = pipe;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI);
    ctx.drawImage(pipeImg, -width, -upperPipeHeight, width, 600);
    ctx.restore();
    ctx.drawImage(pipeImg, x, upperPipeHeight + spaceBtwUpAndDown, width, 600);
  }

  _addNewPipes(){
    let spaceBtwUpAndDown = 0;
    switch(this._difficulty){
      case DIFFICULTY.HARD:
        spaceBtwUpAndDown = PIPE.SPACE_BETWEEN_PIPES - PIPE.DIFFICULTY_ADJUSTMENT;
        break;
      case DIFFICULTY.EASY:
        spaceBtwUpAndDown = PIPE.SPACE_BETWEEN_PIPES + PIPE.DIFFICULTY_ADJUSTMENT;
        break;
      default:
        spaceBtwUpAndDown = PIPE.SPACE_BETWEEN_PIPES;
    }
    const lowerPipeHeight = this._getRandomInt(BACKGROUND.LOWER_HEIGHT + 50, 350);
    const upperPipeHeight = CANVAS.HEIGHT - lowerPipeHeight - spaceBtwUpAndDown;
    const pipe = {
      upperPipeHeight: upperPipeHeight,
      x: 600,
      y: 0,
      lowerPipeHeight: lowerPipeHeight,
      spaceBtwUpAndDown: spaceBtwUpAndDown,
      width: PIPE.WIDTH,
    };
    this._pipeCollection.push(pipe);
  }

  _removeOldPipes(){
    this._pipeCollection.splice(0, 1);
  }

  _getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  hasBirdPassedFirstPipe(){
    const leftMostPipe = this._pipeCollection[0];
    const birdPassedFirstPipes = leftMostPipe && leftMostPipe.x + leftMostPipe.width + PIPE.SPEED*10 === BIRD.INITIAL_X_POSITION;
    return birdPassedFirstPipes;
  }

  leftMostPipe(){
    return this._pipeCollection[0] || {};
  }
}

export default Pipes;
