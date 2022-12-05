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

  async i(data) {
    data.movies = await getJSON(API_URL);

    data.search.movies = data.movies.map(movie => {
      const card = this._template.content.cloneNode(true).children[0];

      this.fillSearch(card, movie.name, movie.img, movie.id, './');

      return {
        name: movie.name,
        img: movie.img,
        id: movie.id,
        element: card
      }
    })
  }

  fillSearch(card, name, img, id, downPath) {
    const cardImg = card.querySelector('[data-search-img]');
    //anchor Elem
    const movieName = card.querySelector('[data-search-name]');
    
    cardImg.loading = 'lazy';
    cardImg.src = `${img}`;
    movieName.textContent = name;
    //create Slug
    movieName.href = `${downPath}download.html?name=${this._createSlug(name)}&id=${id}`;
    card.classList.add('hide');
    this._resultCont.appendChild(card);
  }


}

export default new Search();

// addSearchHandler(handler) {
//   const searchInput = document.querySelector('[data-search-bar]');

//   searchInput.addEventListener('input', (e) => {

// const inputValue = e.target.value.toLowerCase();
// if (inputValue !== '') this._resultCont.classList.add('open');
// else this._resultCont.classList.remove('open');

// const data = this._data;

// if (!data) return

// // console.log(data);

// data.forEach(movie => {
//   const isIncludes = movie.name.toLowerCase().includes(inputValue);
//   movie.card.classList.toggle('hide', !isIncludes);
// })

// handler();
//   })
// }
// fillSearch(card, name, img, id, downPath) {
//   const cardImg = card.querySelector('[data-search-img]');
//   //anchor Elem
//   const movieName = card.querySelector('[data-search-name]');
//   cardImg.src = `${img}`;
//   movieName.textContent = name;
//   //create Slug
//   movieName.href = `${downPath}download.html?name=${this._createSlug(name)}&id=${id}`;
//   card.classList.add('hide');
//   this._resultCont.appendChild(card);
// }