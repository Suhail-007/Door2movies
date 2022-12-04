import View from './view.js';
import movieView from './movieView.js';

class Pagination extends View {
  _parentElem = document.querySelector('[data-pagination-btns-container]');

  addHandlerClick(handler) {
    this._parentElem.addEventListener('click', e => {

      const btn = e.target.closest('.btn__inline');

      if (!btn) return
      
      //change to num
      const page = +btn.dataset.goto;
      
      //get returned value from model fn
      const slicedArr = handler.getPerPageMovie(page);
      movieView.renderData(slicedArr);
      this.renderData(this._data);
      
    })
  }

  _generateMarkup() {
    const data = this._data;

    const currPage = data.pagination.page;
    const numPages = Math.ceil(data.movies.length / data.pagination.resPerPage);

    //if user are not on first page but currpage is less than total num of pages i.e currpage = 3 && numpages = 5
    if (currPage > 1 && currPage < numPages) {
      return `${this._generatePrevBtnMarkup(currPage)} ${this._generateNextBtnMarkup(currPage)}`;
    }

    //next btn is always going to be on webpage since there's always more than page
    if (currPage === 1) {
      return this._generateNextBtnMarkup(currPage);
    }

    //if currpage and num of pagws is equal render only prev button
    if (currPage === numPages) return this._generatePrevBtnMarkup(currPage)
  }

  _generateNextBtnMarkup(page) {
    return `
      <button class="pagination__btn--next btn__inline" data-goto="${page + 1}">
        Page ${page + 1}
        <svg class='sm-icon'>
          <use href="./src/icons/icons.svg#icon-chevron-right"></use>
        </svg>
      </button>`
  }

  _generatePrevBtnMarkup(page) {
    return `
      <button class="${page > 1 ? 'pagination__btn--prev' : 'hide'} btn__inline" data-goto="${page - 1}">
        <svg class='sm-icon'>
          <use href="./src/icons/icons.svg#icon-chevron-left"></use>
        </svg>
        Page ${page - 1}
      </button>`
  }
}

export default new Pagination();