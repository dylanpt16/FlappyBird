import GameManager from './GameManager';

class PageManager{
  constructor($el){
    this.$el = $el;
    this.$canvas = $el.find('#canvas');
    this.$muteSoundBtn = $el.find('#mute-toggle-checkbox');
    this.$difficultyBtn = $el.find('.difficulty');
    this.canvas = this.$canvas[0];
    this.ctx = this.canvas.getContext('2d');
    this._difficulty = 'Normal';
    this._game = new GameManager(this.ctx, this._difficulty);
    this._game.newGame();
    this._initListeners();
    this.gameMode = 250;
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
      const isMuted = true;
      if(this.$muteSoundBtn.prop('checked')){
        this._game.toggleSound(isMuted);
      }else{
        this._game.toggleSound(!isMuted);
      };
    });

    this.$difficultyBtn.click((e)=>{
      const newDifficulty = e.target.innerText;
      if(newDifficulty != this._difficulty){
        this._difficulty = newDifficulty;
        this._game = new GameManager(this.ctx, this._difficulty);
        this._game.newGame();
      }
    })
  }
}

export default PageManager;
