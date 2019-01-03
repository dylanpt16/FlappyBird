import GameManager from './GameManager';

class PageManager{
  constructor($el){
    this.$el = $el;
    this.$canvas = $el.find('#canvas');
    this.$muteSoundBtn = $el.find('#mute-toggle-checkbox');
    this.canvas = this.$canvas[0];
    this.ctx = this.canvas.getContext('2d');
    this._game = new GameManager(this.ctx);
    this._game.newGame();
    this._initListeners();
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
      if(this.$muteSoundBtn.prop('checked')){
        this._game.toggleSound(true);
      }else{
        this._game.toggleSound(false);
      };
    });
  }
}

export default PageManager;
