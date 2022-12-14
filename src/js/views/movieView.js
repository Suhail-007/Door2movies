import View from './view.js'
class MovieView extends View {
  _parentElem = document.querySelector('.movies-container');

  _generateMarkup() {

    return this._data.map(movie => `
      <div class="movie-card">
        <div class="movie-img">
         <img src="${this._responsiveImg(movie)}" alt="${movie.name}" />
        </div>
        <div class="movie-name-cont movie-link">
        	<a class="movie-name" href="src/pages/download.html?name=${this._createSlug(movie.name)}&id=${movie.id}">
        	  ${movie.name}
        	</a>
        </div>
      </div>`)
      .join(',')
      .replaceAll(',', '');
  }

  _createSlug(name) {
    return name.toLowerCase();
  }
}

export default new MovieView();