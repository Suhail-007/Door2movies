import View from './view.js'
class MovieView extends View {
  _parentElem = document.querySelector('.movies-container');

  _generateMarkup() {

    return this._data.map(movie => `
        <div class="movie-card">
            <div class="movie-img">
            ${this._checkViewport(movie)}
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

  _checkViewport(movie) {
    if (window.matchMedia('(min-width: 64em)')) {
      return `<img src="${movie.m_img}" alt="${movie.name}" />`
    }

    if (window.matchMedia('(min-width: 37.2em)')) {
      return `<img src="${movie.img}" alt="${movie.name}" />`
    }
  }
}

export default new MovieView();