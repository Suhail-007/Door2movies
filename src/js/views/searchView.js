import View from './view.js';
import { getJSON } from '../helper.js';
import { API_URL } from '../config.js';

class Search extends View {
  _parentElem = document.querySelector('[data-search-cont]');
  _template = document.querySelector('[data-search-movie-template]');
  _resultCont = document.querySelector('[data-search-results]');


  findSearchMovie(data) {
    const searchInput = document.querySelector('[data-search-bar]');

    searchInput.addEventListener('input', (e) => {

      const inputValue = e.target.value.toLowerCase();

      if (inputValue !== '') this._resultCont.classList.add('open');
      else this._resultCont.classList.remove('open');

      data.search.movies.forEach(movie => {
        const isIncludes = movie.name.toLowerCase().includes(inputValue);
        movie.element.classList.toggle('hide', !isIncludes);
      })
    })
  }

  async getSearchMovies(data) {
    //explicit delay so browser don't have to make two fetch request
    await this.delay(2000);

    data.search.movies = data.movies.map(movie => {
      const card = this._template.content.cloneNode(true).children[0];

      if (document.body.id === 'home') this.fillSearch(card, movie.name, movie.imgs, movie.id, 'src/pages/');

      //change the download page path if user is already on download page
      if (document.body.id === 'download-page') this.fillSearch(card, movie.name, movie.imgs, movie.id, './');

      return {
        name: movie.name,
        element: card
      }
    })
  }

  fillSearch(card, name, imgs, id, downPath) {
    const cardImg = card.querySelector('[data-search-img]');
    //anchor Elem
    const movieName = card.querySelector('[data-search-name]');

    cardImg.loading = 'lazy';
    this._checkViewport(cardImg, imgs);
    movieName.textContent = name;

    //create Slug
    movieName.href = `${downPath}download.html?name=${this._createSlug(name)}&id=${id}`;

    card.classList.add('hide');
    this._resultCont.appendChild(card);
  }
  
  _checkViewport(card, img) {
    if (window.matchMedia('(min-width: 64em)')) card.src = img.d_img;
  
    if (window.matchMedia('(min-width: 37.2em)')) card.src = img.m_img;
  }
}

export default new Search();