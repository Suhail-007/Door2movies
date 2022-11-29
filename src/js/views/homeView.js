import View from './view.js'
import movieView from './movieView.js'

class HomeView extends View {
  _parentElem = document.querySelector('.movies-container')

  _generateMovieMarkup() {
    return this._data.map(movie => movieView.generateMovie(movie)).join(',').replaceAll(',', '');
  }
  
}

export default new HomeView();