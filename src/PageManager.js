import GameManager from './GameManager';

class PageManager{
  constructor($el){
    this.$el = $el;
    this.canvas = $el.find('#canvas')[0];
    this.ctx = this.canvas.getContext('2d');
    this._game = new GameManager(this.ctx);
  }
}

export default PageManager;
