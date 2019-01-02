import GameManager from './GameManager';

class PageManager{
  constructor($el){
    this.$el = $el;
    this.canvas = $el.find('#canvas')[0];
    this.ctx = this.canvas.getContext('2d');
    this._game = new GameManager(this.ctx);
    this._game.newGame();
    this._initListeners();
  }

  _initListeners() {
    key( 'space', () => {
      this._game.onPressed();
    });
    this.$el.find('#canvas').on('click', ()=>{
      this._game.onPressed();
    });
  }
}

export default PageManager;
