/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var BACKGROUND = exports.BACKGROUND = {
  LOWER_HEIGHT: 85,
  SPEED: 3,
  UPPER_HEIGHT: 515
};

var BIRD = exports.BIRD = {
  ANIMATION_SPEED: 10,
  GRAVITY: 0.5,
  HEIGHT: 44,
  INITIAL_VELOCITY: -2,
  INITIAL_X_POSITION: 100,
  INITIAL_Y_POSITION: 250,
  JUMP_INITIAL_SPEED: 10,
  WIDTH: 62
};

var CANVAS = exports.CANVAS = {
  HEIGHT: 600,
  WIDTH: 500
};

var DIFFICULTY = exports.DIFFICULTY = {
  EASY: 'Easy',
  HARD: 'Hard',
  NORMAL: 'Normal'
};

var PIPE = exports.PIPE = {
  DIFFICULTY_ADJUSTMENT: 50,
  SPACE_BETWEEN_PIPES: 200,
  SPEED: 3,
  WIDTH: 100
};

var STATE = exports.STATE = {
  BIRDCRASHED: 'BIRDCRASHED',
  ENDGAME: 'ENDGAME',
  PLAYING: 'PLAYING',
  PREGAME: 'PREGAME'
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var BACKGROUND_SRC = exports.BACKGROUND_SRC = {
  FINGER: 'assets/img/finger.jpg',
  LOGO: 'assets/img/logo.png',
  LOWER: 'assets/img/ground.png',
  SPACEBAR: 'assets/img/spacebar.png',
  UPPER: 'assets/img/background.png'
};

var BIRD_SRC = exports.BIRD_SRC = 'assets/img/bird.png';

var GAMEOVER_SRC = exports.GAMEOVER_SRC = 'assets/img/gameover.png';

var PIPE_SRC = exports.PIPE_SRC = 'assets/img/pipe.png';

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var birdJumpSound = exports.birdJumpSound = new Audio('assets/sound/keyPressed.wav');

var pipeCrashSound = exports.pipeCrashSound = new Audio('assets/sound/crashedPipe.wav');

var earnPointSound = exports.earnPointSound = new Audio('assets/sound/earnPoint.wav');

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _PageManager = __webpack_require__(4);

var _PageManager2 = _interopRequireDefault(_PageManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var $el = $('#flappy');
  window.page = new _PageManager2.default($el);
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameManager = __webpack_require__(5);

var _GameManager2 = _interopRequireDefault(_GameManager);

var _Constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SCORES = 'SCORES';

var PageManager = function () {
  function PageManager($el) {
    _classCallCheck(this, PageManager);

    this.$el = $el;
    this.updateGameScores = this.updateGameScores.bind(this);
    this._updateScoreBoard = this._updateScoreBoard.bind(this);
    this._initFindElements($el);
    this._initListeners();
    this._initGame();
    this._updateScoreBoard();
  }

  _createClass(PageManager, [{
    key: '_initFindElements',
    value: function _initFindElements($el) {
      this.$canvas = $el.find('#canvas');
      this.$difficultyBtn = $el.find('.difficulty');
      this.$muteSoundBtn = $el.find('#mute-toggle-checkbox');
      this.$restartBtn = $el.find('.restart');
      this.$scoreBoard = $el.find('#scoreBoard');
      this.canvas = this.$canvas[0];
      this.ctx = this.canvas.getContext('2d');
    }
  }, {
    key: '_initGame',
    value: function _initGame() {
      this._initScores();
      this._game = new _GameManager2.default(this.ctx, this._difficulty || _Constants.DIFFICULTY.NORMAL, this.updateGameScores);
      this._game.newGame();
    }
  }, {
    key: '_reInitGame',
    value: function _reInitGame(waitTime) {
      var _this = this;

      this._game.endGame();
      if (waitTime) {
        this._timeOut = setTimeout(function () {
          delete _this._game;
          _this._initGame();
        }, waitTime);
      } else {
        clearTimeout(this._timeOut);
        delete this._game;
        this._initGame();
      }
    }
  }, {
    key: '_initScores',
    value: function _initScores() {
      var scores = void 0;
      scores = JSON.parse(window.localStorage.getItem(SCORES));
      this._scores = Array.isArray(scores) ? scores : [];
    }
  }, {
    key: '_initListeners',
    value: function _initListeners() {
      var _this2 = this;

      key('space', function (e) {
        _this2._game.onPressed();
      });

      this.$canvas.click(function (e) {
        e.preventDefault();
        _this2._game.onPressed();
      });

      this.$canvas.dblclick(function (e) {
        e.preventDefault();
        _this2._game.onPressed();
      });

      this.$muteSoundBtn.click(function (e) {
        e.preventDefault();
        var isMuted = true;
        if (_this2.$muteSoundBtn.prop('checked')) {
          _this2._game.toggleSound(isMuted);
        } else {
          _this2._game.toggleSound(!isMuted);
        };
      });

      this.$difficultyBtn.click(function (e) {
        e.preventDefault();
        var newDifficulty = e.target.innerText;
        _this2._difficulty = newDifficulty;
        _this2._reInitGame();
      });

      this.$restartBtn.click(function (e) {
        e.preventDefault();
        _this2._reInitGame();
      });
    }
  }, {
    key: 'updateGameScores',
    value: function updateGameScores(newScore) {
      var newRecord = {
        difficulty: this._difficulty || _Constants.DIFFICULTY.NORMAL,
        score: newScore,
        time: new moment()
      };
      this._scores.push(newRecord);
      this._scores = this._scores.sort(function (i, j) {
        return j.score - i.score;
      }).slice(0, 3);;

      window.localStorage.setItem(SCORES, JSON.stringify(this._scores));

      this._updateScoreBoard();
      this._reInitGame(1000);
    }
  }, {
    key: '_updateScoreBoard',
    value: function _updateScoreBoard() {
      var $ol = $('<ol>');

      this._scores.forEach(function (record) {
        var $li = $('\n        <li class=\'scores\'>\n          <span>\n          ' + record.score + '\n          </span>\n          <span>\n            ' + moment(record.time).format('MM-DD-YYYY') + '\n          </span>\n          <span>\n            ' + record.difficulty + '\n          </span>\n        </li>\n      ');
        $ol.append($li);
      });

      this.$scoreBoard.html($ol);
    }
  }]);

  return PageManager;
}();

exports.default = PageManager;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Constants = __webpack_require__(0);

var _Background = __webpack_require__(6);

var _Background2 = _interopRequireDefault(_Background);

var _Bird = __webpack_require__(7);

var _Bird2 = _interopRequireDefault(_Bird);

var _Pipes = __webpack_require__(8);

var _Pipes2 = _interopRequireDefault(_Pipes);

var _Sounds = __webpack_require__(2);

var _Images = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gameOverImg = new Image();
gameOverImg.src = _Images.GAMEOVER_SRC;

var GameManager = function () {
  function GameManager(ctx, difficulty, updateGameScores) {
    _classCallCheck(this, GameManager);

    this.ctx = ctx;
    this.updateGameScores = updateGameScores;
    this._difficulty = difficulty;
    this.state = {
      backGround: new _Background2.default(this.ctx),
      bird: new _Bird2.default(this.ctx),
      currentGameState: _Constants.STATE.PREGAME,
      flashOpacity: 0,
      pipes: new _Pipes2.default(this.ctx, this._difficulty),
      score: 0
    };
    this.updateState = this.updateState.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this._run = this._run.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  _createClass(GameManager, [{
    key: '_run',
    value: function _run() {
      this.updateState();
      this.updateCanvas();
      if (this.state.currentGameState != _Constants.STATE.ENDGAME) {
        this.requestId = requestAnimationFrame(this._run);
      }
    }
  }, {
    key: 'newGame',
    value: function newGame() {
      this._run();
    }
  }, {
    key: 'endGame',
    value: function endGame() {
      if (this.requestId) {
        cancelAnimationFrame(this.requestId);
      }
    }
  }, {
    key: 'updateState',
    value: function updateState() {
      var frames = this.requestId;
      var _state = this.state,
          backGround = _state.backGround,
          bird = _state.bird,
          pipes = _state.pipes;


      if (this.state.currentGameState != _Constants.STATE.BIRDCRASHED && this.hasBirdCrashedPipe(bird, pipes)) {
        this.state.currentGameState = _Constants.STATE.BIRDCRASHED;
        this.state.flashOpacity = 30;
      }

      if (bird.hasBirdTouchedGround() && !this.state.flashOpacity) {
        this.state.currentGameState = _Constants.STATE.ENDGAME;
        this.updateGameScores(this.state.score);
      }

      this.state.flashOpacity -= this.state.flashOpacity > 0 ? 1 : 0;

      if (pipes.hasBirdPassedFirstPipe()) {
        this.state.score += 1;
        _Sounds.earnPointSound.play();
      }

      backGround.updateState(this.state.currentGameState);
      pipes.updateState(this.state.currentGameState);
      bird.updateState(this.state.currentGameState, frames);
    }
  }, {
    key: 'updateCanvas',
    value: function updateCanvas() {
      var _state2 = this.state,
          backGround = _state2.backGround,
          bird = _state2.bird,
          currentGameState = _state2.currentGameState,
          flashOpacity = _state2.flashOpacity,
          pipes = _state2.pipes;


      var ctx = this.ctx;

      ctx.clearRect(0, 0, _Constants.CANVAS.WIDTH, _Constants.CANVAS.HEIGHT);
      backGround.drawUpperBackground();
      pipes.updateCanvas();
      bird.updateCanvas();
      backGround.drawLowerBackground();

      if (flashOpacity > 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, ' + flashOpacity / 30 + ')';
        ctx.fillRect(0, 0, _Constants.CANVAS.WIDTH, _Constants.CANVAS.HEIGHT);
      }

      if (currentGameState === _Constants.STATE.ENDGAME) {
        this._drawGameOver();
      } else {
        this._drawScore();
      }
    }
  }, {
    key: '_drawScore',
    value: function _drawScore() {
      var ctx = this.ctx;
      ctx.font = '46px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(this.state.score, _Constants.CANVAS.WIDTH / 2 - 23, 50);
    }
  }, {
    key: '_drawGameOver',
    value: function _drawGameOver() {
      var ctx = this.ctx;
      ctx.drawImage(gameOverImg, _Constants.CANVAS.WIDTH / 2 - 200, _Constants.CANVAS.HEIGHT / 10, 400, 200);
      ctx.font = "100px Arial";
      ctx.fillText(this.state.score, _Constants.CANVAS.WIDTH / 2 - 40, _Constants.CANVAS.HEIGHT / 2 + 50);
    }
  }, {
    key: 'onPressed',
    value: function onPressed() {
      var bird = this.state.bird;


      switch (this.state.currentGameState) {
        case _Constants.STATE.PREGAME:
          this.state.currentGameState = _Constants.STATE.PLAYING;
          bird.jump();
          _Sounds.birdJumpSound.play();
          break;
        case _Constants.STATE.PLAYING:
          bird.jump();
          _Sounds.birdJumpSound.play();
          break;
      }
    }
  }, {
    key: 'hasBirdCrashedPipe',
    value: function hasBirdCrashedPipe(bird, pipes) {
      var _bird$getPositions = bird.getPositions(),
          _bird$getPositions2 = _slicedToArray(_bird$getPositions, 2),
          birdX = _bird$getPositions2[0],
          birdY = _bird$getPositions2[1];

      var _pipes$leftMostPipe = pipes.leftMostPipe(),
          x = _pipes$leftMostPipe.x,
          y = _pipes$leftMostPipe.y,
          width = _pipes$leftMostPipe.width,
          upperPipeHeight = _pipes$leftMostPipe.upperPipeHeight,
          spaceBtwUpAndDown = _pipes$leftMostPipe.spaceBtwUpAndDown;

      var closestX = Math.min(Math.max(birdX, x), x + width);
      var closestUpperPipeHeight = Math.min(birdY, y + upperPipeHeight);
      var closestLowerPipeHeight = Math.max(birdY, y + upperPipeHeight + spaceBtwUpAndDown);

      var dX = birdX - closestX;
      var dUpperPipeHeight = birdY - closestUpperPipeHeight;
      var dLowerPipeHeight = birdY - closestLowerPipeHeight;
      // vector length
      var d1 = dX * dX + dUpperPipeHeight * dUpperPipeHeight;
      var d2 = dX * dX + dLowerPipeHeight * dLowerPipeHeight;
      var birdRadius = _Constants.BIRD.HEIGHT / 2 * (_Constants.BIRD.HEIGHT / 2);
      // determine intersection
      if (birdRadius > d1 || birdRadius > d2) {
        _Sounds.pipeCrashSound.play();
        return true;
      }
      return false;
    }
  }, {
    key: 'toggleSound',
    value: function toggleSound(isMuted) {
      _Sounds.birdJumpSound.muted = isMuted;
      _Sounds.pipeCrashSound.muted = isMuted;
      _Sounds.earnPointSound.muted = isMuted;
    }
  }]);

  return GameManager;
}();

exports.default = GameManager;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Constants = __webpack_require__(0);

var _Images = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var upperBackgroundImg = new Image();
upperBackgroundImg.src = _Images.BACKGROUND_SRC.UPPER;
var lowerBackgroundImg = new Image();
lowerBackgroundImg.src = _Images.BACKGROUND_SRC.LOWER;
var fingerImg = new Image();
fingerImg.src = _Images.BACKGROUND_SRC.FINGER;
var logoImg = new Image();
logoImg.src = _Images.BACKGROUND_SRC.LOGO;
var spacebarImg = new Image();
spacebarImg.src = _Images.BACKGROUND_SRC.SPACEBAR;

var Background = function () {
  function Background(ctx) {
    _classCallCheck(this, Background);

    this.ctx = ctx;
    this.state = {
      x: 600
    };
  }

  _createClass(Background, [{
    key: 'updateState',
    value: function updateState(currentState) {
      this.currentState = currentState;
      if (currentState === _Constants.STATE.PLAYING || currentState === _Constants.STATE.PREGAME) {
        this.state.x -= _Constants.BACKGROUND.SPEED;
        if (this.state.x <= 564) {
          this.state.x = 600;
        }
      }
    }
  }, {
    key: 'drawUpperBackground',
    value: function drawUpperBackground() {
      var ctx = this.ctx;
      ctx.drawImage(upperBackgroundImg, 0, 0, _Constants.CANVAS.WIDTH, _Constants.BACKGROUND.UPPER_HEIGHT);
      if (this.currentState === _Constants.STATE.PREGAME) {
        this._drawInstructions();
      }
    }
  }, {
    key: '_drawInstructions',
    value: function _drawInstructions() {
      var ctx = this.ctx;
      ctx.drawImage(logoImg, _Constants.CANVAS.WIDTH / 2 - 131, _Constants.CANVAS.HEIGHT / 6, 262, 70);
      ctx.drawImage(spacebarImg, _Constants.CANVAS.WIDTH / 2 - 60, _Constants.CANVAS.HEIGHT / 2.8, 120, 100);
      ctx.drawImage(fingerImg, _Constants.CANVAS.WIDTH / 2 - 50, _Constants.CANVAS.HEIGHT / 2, 100, 80);
    }
  }, {
    key: 'drawLowerBackground',
    value: function drawLowerBackground() {
      var ctx = this.ctx;
      for (var i = 0; i < 18; i++) {
        ctx.drawImage(lowerBackgroundImg, this.state.x - 36 * i, _Constants.BACKGROUND.UPPER_HEIGHT);
      }
    }
  }]);

  return Background;
}();

exports.default = Background;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Constants = __webpack_require__(0);

var _Images = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ANIMATION_SPEED = _Constants.BIRD.ANIMATION_SPEED;
var birdImg = new Image();
birdImg.src = _Images.BIRD_SRC;
var FLAPPING_BIRD_IMG_INDEXES = [184, 92, 0];
var birdGravity = _Constants.BIRD.GRAVITY;

var Bird = function () {
  function Bird(ctx) {
    var _this = this;

    _classCallCheck(this, Bird);

    this.ctx = ctx;
    this.frames = 0;
    this.state = {
      currentState: _Constants.STATE.PREGAME,
      images: FLAPPING_BIRD_IMG_INDEXES,
      imagesIdx: 0,
      imagesRotation: 0,
      velocity: _Constants.BIRD.INITIAL_VELOCITY,
      x: _Constants.BIRD.INITIAL_X_POSITION,
      y: _Constants.BIRD.INITIAL_Y_POSITION
    };
    this._drawBirdIndexes = [function () {
      return _this._drawBirdFlapUp();
    }, function () {
      return _this._drawBirdFlapMid();
    }, function () {
      return _this._drawBirdFlapDown();
    }, function () {
      return _this._drawBirdFlapMid();
    }];
    this.hasBirdTouchedGround = this.hasBirdTouchedGround.bind(this);
    this._drawSprite = this._drawSprite.bind(this);
  }

  _createClass(Bird, [{
    key: 'updateState',
    value: function updateState(currentState) {
      this.frames += 1;
      this.state.currentState = currentState;
      switch (currentState) {
        case _Constants.STATE.PREGAME:
          this.state.y = this.state.y + Math.cos(this.frames / 7);
          break;
        case _Constants.STATE.PLAYING:
          this._playingState();
          break;
        default:
          this._endGameState();
          break;
      }
    }
  }, {
    key: 'updateCanvas',
    value: function updateCanvas() {
      var idx = 0;
      idx = Math.floor(this.frames / 10) % 4;

      switch (this.state.currentState) {
        case _Constants.STATE.PLAYING:
        case _Constants.STATE.PREGAME:
          this._drawBirdIndexes[idx]();
          break;
        default:
          this._drawBirdFlapMid();
          break;
      }
    }
  }, {
    key: '_playingState',
    value: function _playingState() {
      var _state = this.state,
          imagesRotation = _state.imagesRotation,
          velocity = _state.velocity,
          y = _state.y;

      var hasBirdTouchedCeiling = y <= _Constants.BIRD.HEIGHT / 2;
      velocity = hasBirdTouchedCeiling ? 1 : velocity + birdGravity;
      y += velocity;
      if (velocity >= _Constants.BIRD.JUMP_INITIAL_SPEED) {
        imagesRotation = Math.min(Math.PI / 2, imagesRotation + 0.3);
      } else {
        imagesRotation = -0.3;
      }
      this.state.imagesRotation = imagesRotation;
      this.state.velocity = velocity;
      this.state.y = y;
    }
  }, {
    key: '_endGameState',
    value: function _endGameState() {
      var lowestBirdPosition = this.state.y + _Constants.BIRD.WIDTH / 2;
      if (lowestBirdPosition < _Constants.BACKGROUND.UPPER_HEIGHT) {
        this.state.imagesRotation = Math.min(Math.PI / 2, this.state.imagesRotation + 0.3);
        this.state.y += 10;
      }
    }
  }, {
    key: 'hasBirdTouchedGround',
    value: function hasBirdTouchedGround() {
      var lowestBirdPosition = this.state.y + _Constants.BIRD.WIDTH / 2;
      return lowestBirdPosition >= _Constants.BACKGROUND.UPPER_HEIGHT;
    }
  }, {
    key: '_drawBirdFlapUp',
    value: function _drawBirdFlapUp() {
      this._drawSprite(184);
    }
  }, {
    key: '_drawBirdFlapMid',
    value: function _drawBirdFlapMid() {
      this._drawSprite(92);
    }
  }, {
    key: '_drawBirdFlapDown',
    value: function _drawBirdFlapDown() {
      this._drawSprite(0);
    }
  }, {
    key: '_drawSprite',
    value: function _drawSprite(spriteX) {
      var ctx = this.ctx;
      var _state2 = this.state,
          x = _state2.x,
          y = _state2.y,
          imagesRotation = _state2.imagesRotation;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(imagesRotation);
      ctx.drawImage(birdImg, spriteX, 0, 92, 64, -_Constants.BIRD.WIDTH / 2, -_Constants.BIRD.HEIGHT / 2, _Constants.BIRD.WIDTH, _Constants.BIRD.HEIGHT);
      ctx.restore();
    }
  }, {
    key: 'jump',
    value: function jump() {
      this.state.velocity = -_Constants.BIRD.JUMP_INITIAL_SPEED;
    }
  }, {
    key: 'getPositions',
    value: function getPositions() {
      return [this.state.x, this.state.y];
    }
  }]);

  return Bird;
}();

exports.default = Bird;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Constants = __webpack_require__(0);

var _Images = __webpack_require__(1);

var _Sounds = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pipeImg = new Image();
pipeImg.src = _Images.PIPE_SRC;

var Pipes = function () {
  function Pipes(ctx, difficulty) {
    _classCallCheck(this, Pipes);

    this.ctx = ctx;
    this._difficulty = difficulty;
    this._pipeCollection = [];
    this.hasBirdPassedFirstPipe = this.hasBirdPassedFirstPipe.bind(this);
  }

  _createClass(Pipes, [{
    key: 'updateState',
    value: function updateState(currentState) {
      if (currentState === _Constants.STATE.PLAYING) {
        this._pipeCollection.forEach(this._movePipes.bind(this));
        var isEmpty = this._pipeCollection.length === 0;
        var rightMostPipe = this._pipeCollection[this._pipeCollection.length - 1];
        var leftMostPipe = this._pipeCollection[0];
        var shouldAddNewPipe = isEmpty || rightMostPipe.x <= 330;
        var shouldRemoveOldPipe = !isEmpty && leftMostPipe.x <= -_Constants.PIPE.WIDTH;
        if (shouldAddNewPipe) {
          this._addNewPipes();
        }
        if (shouldRemoveOldPipe) {
          this._removeOldPipes();
        }
      }
    }
  }, {
    key: 'updateCanvas',
    value: function updateCanvas() {
      this._pipeCollection.forEach(this._drawPipes.bind(this));
    }
  }, {
    key: '_movePipes',
    value: function _movePipes(pipe) {
      pipe.x -= _Constants.PIPE.SPEED;
    }
  }, {
    key: '_drawPipes',
    value: function _drawPipes(pipe) {
      var ctx = this.ctx;
      var x = pipe.x,
          y = pipe.y,
          upperPipeHeight = pipe.upperPipeHeight,
          lowerPipeHeight = pipe.lowerPipeHeight,
          spaceBtwUpAndDown = pipe.spaceBtwUpAndDown,
          width = pipe.width;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.PI);
      ctx.drawImage(pipeImg, -width, -upperPipeHeight, width, 600);
      ctx.restore();
      ctx.drawImage(pipeImg, x, upperPipeHeight + spaceBtwUpAndDown, width, 600);
    }
  }, {
    key: '_addNewPipes',
    value: function _addNewPipes() {
      var spaceBtwUpAndDown = 0;
      switch (this._difficulty) {
        case _Constants.DIFFICULTY.HARD:
          spaceBtwUpAndDown = _Constants.PIPE.SPACE_BETWEEN_PIPES - _Constants.PIPE.DIFFICULTY_ADJUSTMENT;
          break;
        case _Constants.DIFFICULTY.EASY:
          spaceBtwUpAndDown = _Constants.PIPE.SPACE_BETWEEN_PIPES + _Constants.PIPE.DIFFICULTY_ADJUSTMENT;
          break;
        default:
          spaceBtwUpAndDown = _Constants.PIPE.SPACE_BETWEEN_PIPES;
      }
      var lowerPipeHeight = this._getRandomInt(_Constants.BACKGROUND.LOWER_HEIGHT + 50, 350);
      var upperPipeHeight = _Constants.CANVAS.HEIGHT - lowerPipeHeight - spaceBtwUpAndDown;
      var pipe = {
        upperPipeHeight: upperPipeHeight,
        x: 600,
        y: 0,
        lowerPipeHeight: lowerPipeHeight,
        spaceBtwUpAndDown: spaceBtwUpAndDown,
        width: _Constants.PIPE.WIDTH
      };
      this._pipeCollection.push(pipe);
    }
  }, {
    key: '_removeOldPipes',
    value: function _removeOldPipes() {
      this._pipeCollection.splice(0, 1);
    }
  }, {
    key: '_getRandomInt',
    value: function _getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }, {
    key: 'hasBirdPassedFirstPipe',
    value: function hasBirdPassedFirstPipe() {
      var leftMostPipe = this._pipeCollection[0];
      var birdPassedFirstPipes = leftMostPipe && leftMostPipe.x + leftMostPipe.width + _Constants.PIPE.SPEED * 10 === _Constants.BIRD.INITIAL_X_POSITION;
      return birdPassedFirstPipes;
    }
  }, {
    key: 'leftMostPipe',
    value: function leftMostPipe() {
      return this._pipeCollection[0] || {};
    }
  }]);

  return Pipes;
}();

exports.default = Pipes;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map