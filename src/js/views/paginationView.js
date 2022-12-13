import View from './view.js';
import movieView from './movieView.js';
import { updateURL } from '../helper.js';
// import icons from '../../icons/icons.svg'

class Pagination extends View {
  _parentElem = document.querySelector('[data-pagination-btns-container]');

  addHandlerClick(handler) {
    this._parentElem.addEventListener('click', e => {

      const btn = e.target.closest('[data-goto]');
      if (!btn) return

      const btnDataset = btn.dataset.goto;
      btnDataset === 'next' ? this._data.pagination.page++ : this._data.pagination.page--;

      //update URL on every click of pagination
      const start = (this._data.pagination.page - 1) * this._data.pagination.resPerPage;
      const end = this._data.pagination.page * this._data.pagination.resPerPage;

      //change the page value
      const page = this._data.filter ? this._data.category : 'home';
      updateURL(`${page}`, start, end);

      handler();
    })
  }

   _generateMarkup() {
    const data = this._data;
    const currPage = +data.pagination.page;
    const numPages = Math.ceil(data.movies.length / data.pagination.resPerPage);
    
    //if user are not on first page but currpage is less than total num of pages i.e currpage = 3 && numpages = 5
    if (currPage > 1 && currPage < numPages) return `${this._generatePrevBtnMarkup(currPage)} ${this._generateNextBtnMarkup(currPage)}`;

    //next btn is always going to be on webpage since there's always more than one page
    if (currPage === 1) return this._generateNextBtnMarkup(currPage);

    //if currpage and num of pages is equal render only prev button
    if (currPage === numPages) return this._generatePrevBtnMarkup(currPage)
  }

  _generateNextBtnMarkup(page) {
    return `
      <button class="pagination__btn--next btn__inline" data-goto="next">
        Page ${page + 1}
       <svg class='sm-icon'>
          <use href="#icon-chevron-right"></use>
        </svg>
      </button>`
  }

  _generatePrevBtnMarkup(page) {
    return `
      <button class="${page > 1 ? 'pagination__btn--prev' : 'hide'} btn__prev" data-goto="prev">
        <svg class='sm-icon'>
          <use href="#icon-chevron-left"></use>
        </svg>
        Page ${page - 1}
      </button>`
  }
}

export default new Pagination();