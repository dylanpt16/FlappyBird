import GameManager from './GameManager';
import {DIFFICULTY} from './Constants';
import moment from 'moment';

const SCORES = 'SCORES'

class PageManager{
  constructor($el){
    this.$el = $el;
    this.updateGameScores = this.updateGameScores.bind(this);
    this._updateScoreBoard = this._updateScoreBoard.bind(this);
    this._initFindElements($el);
    this._initListeners();
    this._initGame();
    this._updateScoreBoard();
  }

  _initFindElements($el){
    this.$canvas = $el.find('#canvas');
    this.$difficultyBtn = $el.find('.difficulty');
    this.$muteSoundBtn = $el.find('#mute-toggle-checkbox');
    this.$restartBtn = $el.find('.restart');
    this.$scoreBoard = $el.find('#scoreBoard');
    this.canvas = this.$canvas[0];
    this.ctx = this.canvas.getContext('2d');
  }

  _initGame(){
    this._initScores();
    this._game = new GameManager(this.ctx, this._difficulty || DIFFICULTY.NORMAL, this.updateGameScores);
    this._game.newGame();
  }

  _reInitGame(waitTime){
    this._game.endGame();
    if(waitTime){
      this._timeOut = setTimeout(()=> {
        delete this._game;
        this._initGame();
      }, waitTime);
    }else {
      clearTimeout(this._timeOut);
      delete this._game;
      this._initGame();
    }
  }

  _initScores(){
    let scores;
    scores = JSON.parse(window.localStorage.getItem(SCORES));
    this._scores = Array.isArray(scores) ? scores : [];
  }

  _initListeners(){
    key( 'space', (e) => {
      this._game.onPressed();
    });

    this.$canvas.click((e)=>{
      e.preventDefault();
      this._game.onPressed();
    });

    this.$canvas.dblclick((e)=>{
      e.preventDefault();
      this._game.onPressed();
    });

    this.$muteSoundBtn.click((e)=>{
      e.preventDefault();
      const isMuted = true;
      if(this.$muteSoundBtn.prop('checked')){
        this._game.toggleSound(isMuted);
      }else{
        this._game.toggleSound(!isMuted);
      };
    });

    this.$difficultyBtn.click((e)=>{
      e.preventDefault();
      const newDifficulty = e.target.innerText;
      this._difficulty = newDifficulty;
      this._reInitGame();
    })

    this.$restartBtn.click((e)=>{
      e.preventDefault();
      this._reInitGame();
    });
  }

  updateGameScores(newScore){
    const newRecord = {
      difficulty: (this._difficulty || DIFFICULTY.NORMAL),
      score: newScore,
      time: new moment(),
    };
    this._scores.push(newRecord);
    this._scores = this._scores.sort((i,j)=> j.score - i.score).slice(0,3);;

    window.localStorage.setItem(SCORES, JSON.stringify(this._scores));

    this._updateScoreBoard();
    this._reInitGame(1000);
  }

  _displayTopScores($ol){
    const $h3 = $(`
        <li class='scores header'>
          <b>
          Scores
          </b>
          <b>
          Time
          </b>
          <b>
          Difficulty
          </b>
        </li>
      `);
    $ol.append($h3);
    this._scores.forEach((record)=> {
      const $li = $(`
        <li class='scores'>
          <span>
          ${record.score}
          </span>
          <span>
            ${moment(record.time).format('MMM-DD-YYYY')}
          </span>
          <span>
            ${record.difficulty}
          </span>
        </li>
      `);
      $ol.append($li);
    })
  }

  _displayScoreInto($ol){
    const $h3 = $(`
      <h3>Welcome! Play the game to see your scores!</h3>
      `);
    $ol.append($h3);
  }

  _updateScoreBoard(){
    const $ol = $('<ol>');

    if(this._scores.length) {
      this._displayTopScores($ol);
    }else {
      this._displayScoreInto($ol);
    }
    this.$scoreBoard.html($ol);
  }
}

export default PageManager;
