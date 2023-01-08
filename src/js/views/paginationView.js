import View from './view.js';
import movieView from './movieView.js';
import { updateURL, PAGINATION } from '../helper.js';
// import icons from '../../icons/icons.svg'

class Pagination extends View {
  _parentElem = document.querySelector('[data-pagination-btns-container]');

  addHandlerClick(handler) {
    this._parentElem.addEventListener('click', e => {

      const btn = e.target.closest('[data-goto]');
      if (!btn) return

      const btnDataset = btn.dataset.goto;
      btnDataset === 'next' ? this._data.pagination.page++ : this._data.pagination.page--;

      const { start, end } = PAGINATION(this._data.pagination.page, this._data);

      //change the page value
      const page = this._data.filter ? this._data.category : 'home';
      updateURL(`${page}`, start, end);
      handler();
    })
  }

  _generateMarkup() {
    const currPage = +this._data.pagination.page;
    const moviesLength = this._data.filter ? this._data.filteredMovies.length : this._data.movies.length;
    const numPages = Math.ceil(moviesLength / this._data.pagination.resPerPage);
    //if user are not on first page but currpage is less than total num of pages i.e currpage = 3 && numpages = 5
    if (currPage > 0 && currPage < numPages) return `${this._generatePrevBtnMarkup(currPage)} ${this._generateNextBtnMarkup(currPage)}`;

    //if currpage and num of pages is equal render only prev button
    if (currPage === numPages) return this._generatePrevBtnMarkup(currPage);
  }

  _generateNextBtnMarkup(page) {
    return `
      <button class="pagination__btn--next btn__inline" data-goto="next">
        Page ${page + 1}
       <svg class='sm-icon'>
          <use href="./src/icons/icons.svg#icon-chevron-right"></use>
        </svg>
      </button>`
  }

  _generatePrevBtnMarkup(page) {
    return `
      <button class="${page > 1 ? 'pagination__btn--prev' : 'hide'} btn__prev" data-goto="prev">
        <svg class='sm-icon'>
          <use href="./src/icons/icons.svg#icon-chevron-left"></use>
        </svg>
        Page ${page - 1}
      </button>`
  }
}

export default new Pagination();