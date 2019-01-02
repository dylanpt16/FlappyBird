import {
  BACKGROUND,
  BIRD,
  CANVAS,
  PIPE,
  STATE,
} from './Constants';

import {PIPE_SRC} from './Images';

const pipeCrashSound = new Audio('assets/sound/crashedPipe.wav');
const pipeImg = new Image();
pipeImg.src = PIPE_SRC;

class Pipes{
  constructor(ctx){
    this.ctx = ctx;
    this._pipeCollection = [];
    this.hasBirdCrashedPipe = this.hasBirdCrashedPipe.bind(this);
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
    const {x, y, upperPipeHeight, lowerPipeHeight, space, width} = pipe;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI);
    ctx.drawImage(pipeImg, -width, -upperPipeHeight, width, 600);
    ctx.restore();
    ctx.drawImage(pipeImg, x, upperPipeHeight + space, width, 600);
  }

  _addNewPipes(){
    const space = PIPE.SPACE_BETWEEN_PIPES;
    const lowerPipeHeight = this._getRandomInt(BACKGROUND.LOWER_HEIGHT + 50, 350);
    const upperPipeHeight = CANVAS.HEIGHT - lowerPipeHeight - space;
    const pipe = {
      upperPipeHeight: upperPipeHeight,
      x: 600,
      y: 0,
      lowerPipeHeight: lowerPipeHeight,
      space: space,
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

  hasBirdCrashedPipe(bird){
    return this._pipeCollection.some(this._hasPipeColideWithBird.bind(this, bird));
  }

  _hasPipeColideWithBird(bird, pipe){
    const [birdX, birdY] = bird.getPositions();
    const {x, y, width, upperPipeHeight, space} = pipe;
    const closestX  = Math.min(Math.max(birdX, x), x + width);
    const closestupperPipeHeight = Math.min(birdY, y + upperPipeHeight);
    const closestlowerPipeHeight  = Math.max(birdY, y + upperPipeHeight + space);

    const dX  = birdX - closestX;
    const dupperPipeHeight = birdY - closestupperPipeHeight;
    const dlowerPipeHeight = birdY - closestlowerPipeHeight;
    // vector length
    const d1 = dX*dX + dupperPipeHeight*dupperPipeHeight;
    const d2 = dX*dX + dlowerPipeHeight*dlowerPipeHeight;
    const birdRadius = (BIRD.HEIGHT/2)*(BIRD.HEIGHT/2);
    // determine intersection
    if (birdRadius > d1 || birdRadius > d2) {
      pipeCrashSound.play();
      return true;
    }
    return false;
  }
}

export default Pipes;
