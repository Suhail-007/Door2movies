class MovieView {

  generateMovie(data, dpPath='src/pages/') {
    return `
    <div class="movie-card">
      <div class="movie-img">
    		<img src="${data.img}" alt="${data.name}" />
    	</div>
    	<div class="movie-name-cont movie-link">
    		<a class="movie-name" href="${dpPath}download.html?name=${this._createSlug(data.name)}&id=${data.id}">${data.name}</a>
    	</div>
    </div>`;
  }

  _createSlug(name) {
    return name.toLowerCase();
  }
}

export default new MovieView();