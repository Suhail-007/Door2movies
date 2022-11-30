import View from './view.js';
import { data } from '../model.js';
import movieView from './movieView.js';

class Pagination extends View {
  _parentElem = document.querySelector('[data-pagination-btns-container]');


  addHandlerClick(handler) {
    this._parentElem.addEventListener('click', e => {
      const btn = e.target.id ? e.target.id : e.target.parentElement.id;
      if (btn === 'nextBtn') {
         this._data.pagination.page += 1;
         
         handler.getPerPageMovie(this._data.pagination.page)
         console.log(handler.getPerPageMovie(this._data.pagination.page));
      }
    })
  }

  _generateMarkup() {
    const data = this._data;
    const currPage = data.pagination.page;
    const numPages = Math.ceil(9 / data.pagination.resPerPage);

    if (currPage > 1) {
      return `${this._generateNextBtnMarkup(currPage)} ${this._generatePrevBtnMarkup(currPage)}`;
    }

    if (currPage === 1) {
      return this._generateNextBtnMarkup(currPage);
    }
  }

  _generateNextBtnMarkup(page) {
    console.log(page);
    return `
      <button class="pagination__btn--next" id='nextBtn' data-goto="${page + 1}">
        Page ${page + 1}
        <svg class='sm-icon'>
          <use href="./src/icons/icons.svg#icon-chevron-right"></use>
        </svg>
      </button>`
  }

  _generatePrevBtnMarkup(page) {
    return `
      <button class="${page > 1 ? 'pagination__btn--prev' : 'hide'}" id='prevBtn' data.pagination-goto="${page - 1}">
        <svg class='sm-icon'>
          <use href="./src/icons/icons.svg#icon-chevron-left"></use>
        </svg>
        Page ${page - 1}
      </button>`
  }



}

export default new Pagination();