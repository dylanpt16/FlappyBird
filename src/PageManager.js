import GameManager from './GameManager';

class PageManager{
	constructor($el){
		this.$el = $el;
		this.updateGameScores = this.updateGameScores.bind(this);
		this._updateScoreBoard = this._updateScoreBoard.bind(this);
		this._initFindElements($el);
		this._initGame($el);
		this._initListeners();
		this._displayLatestScores();
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

	_initGame($el){
		this._difficulty = 'Normal';
		this._scores = [];

		if(this._game){
			this._game.endGame();
		}

		this._game = new GameManager(this.ctx, this._difficulty, this.updateGameScores);
		this._game.newGame();
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
				this._initGame();
			}
		})

		this.$restartBtn.click((e)=>{
			this._initGame();
		});
	}

	updateGameScores(newScore){
		const newRecord = {
			score: newScore,
			time: new Date(),
		};
		this._scores.push(newRecord);
		this._updateScoreBoard();
	}

	_updateScoreBoard(){
		const $ol = $('<ol>');

		this._scores.forEach((record)=> {
			const $li = $(`
				<li>
					${record.score}
					<span>
					  ${record.time}
					</span>
				</li>
			`);
			$ol.append($li);
		})

		this.$scoreBoard.html($ol);
	}

	_displayLatestScores(){
		const latestScores = JSON.parse(window.localStorage.getItem('latestScores'));
		const $scoreBoard = this.$scoreBoard;
		if(latestScores){
			latestScores.forEach((score)=>{
				$scoreBoard.append('<h2>'+score+'</h2>')
			});
		}
	}
}

export default PageManager;
