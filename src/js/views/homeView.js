class MovieView {
  _parentElem = document.querySelector('[data-movies-cont]');
  
  _generateMovieMarkup() {
    const html = `
      <div class="movie-card">
        <div class="movie-img">
    		  <img src="${imgPath}${img}" alt="${name}" />
    		</div>
    		<div class="movie-name-cont movie-link">
    		  <a class="movie-name" href="${imgPath}download/download.html?name=${this.#createSlug(name)}&id=${id}&start=${start}end=${end}">${name}</a>
    		</div>
    	</div>`

    this._parentElem.insertAdjacentHTML('afterbegin', html);
  }
}