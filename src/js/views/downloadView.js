import View from './view.js';
import { getJSON } from '../helper.js';
import { API_URL, isDownloadMovie } from '../config.js';

class Download extends View {
  _parentElem = document.querySelector('[data-download]');

  _generateMarkup() {
    const movieName = this._getMovieName();
    const data = this._data.movies.filter(movie => movie.name.toLowerCase() === movieName);

    isDownloadMovie.download = true;

    return `
    <p> Home > ${data[0].name}</p>
    <h2 data-download-movie-name>${data[0].name}</h2>
      <div class="section__download__img-grid">
        <figure>
          <img src="${this._responsiveImg(data[0])}" alt="${data[0].name}" />
        </figure>
      </div>
      <div class="section__download__movie-info">
        <p class="rating">IMBD rating: ${data[0].imbd}</p>
        <p class="year">Year: ${data[0].year}</p>
        <p class="director">Director: <span>${data[0].director}</span></p>
        <p class="cast">Cast: <span>${this._addWhiteSpace(data[0].cast)}</span></p>
        <p> category : ${this._addWhiteSpace(data[0].category)} </p>
        <p class="desc">Description: <span>${data[0].description}  luptatum praesent nascetur tempus scripta ferri idque sonet omittam vitae tellus diam persius conceptam hac sed etiam semper habitasse interpretaris</span></p>
      </div>
      <p class="links-heading">Download Links </p>
      <section class="section__download__links">
        <a href="${data[0].link[1]}">480p</a>
        <a href="${data[0].link[2]}">720p</a>
        <a href="${data[0].link[3]}">1080p</a>
      </section>`
  }

  _getMovieName() {
    return new URL(window.location.href).searchParams.get('name');
  }

  //takes an array add white space after the comma
  _addWhiteSpace(arr) {
    return arr.toString().replaceAll(',', ', ')
  }
}

export default new Download();