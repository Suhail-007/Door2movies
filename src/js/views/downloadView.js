import View from './view.js';
import { getJSON } from '../helper.js';
import { API_URL } from '../config.js';

class Download extends View {
  _parentElem = document.querySelector('[data-download]');

  _generateMarkup() {
    const movieName = this._getMovieName();

    const data = this._data.movies.filter(movie => movie.name.toLowerCase() === movieName);
    console.log(data);

    return `
      <p> Home > ${data[0].name}</p>
      <h2 data-download-movie-name>${data[0].name}</h2>
      <div class="section__download__img-grid">
      <figure>
        <img src="${data[0].img}" alt="${data[0].name}" />
      </figure>
      </div>
      <div class="section__download__movie-info">
        <p class="rating">Imbd Rating: ${data[0].imbd}</p>
        <p class="director">Director: <span>${data[0].director}</span></p>
        <p class="actor">Actors: <span>${data[0].actors}</span></p>
        <p> category : ${data[0].category} </p>
        <p class="descp">Description: <span>luptatum praesent nascetur tempus scripta ferri idque sonet omittam vitae tellus diam persius conceptam hac sed etiam semper habitasse interpretaris</span></p>
      </div>
      <section class="section__download__links">
        <a href="${data[0].link[1]}">480p</a>
        <a href="${data[0].link[2]}">720p</a>
        <a href="${data[0].link[3]}">1080p</a>
      </section>`
  }

  _getMovieName() {
    return new URL(window.location.href).searchParams.get('name');
  }
}

export default new Download();