import View from './view.js';
import { data } from '../model.js'

class Pagination extends View {
  _parentElem = document.querySelector('[data-pagination-btns-container]');


  renderBtns() {
    this._parentElem.insertAdjacentHTML('beforeend', this._generatePrevBtnMarkup());
    this._parentElem.insertAdjacentHTML('beforeend', this._generateNextBtnMarkup());

  }

  _generateNextBtnMarkup() {
    return `
      <button class="pagination__btn--next" data-goto="${data.page + 1}">
        Page ${data.page + 1}
        <svg class='sm-icon'>
          <use href="./src/icons/icons.svg#icon-chevron-right"></use>
        </svg>
      </button>`
  }

  _generatePrevBtnMarkup() {
    return `
      <button class="${data.page > 1 ? 'pagination__btn--prev' : 'hide'}" data-goto="${data.page - 1}">
        <svg class='sm-icon'>
          <use href="./src/icons/icons.svg#icon-chevron-left"></use>
        </svg>
        Page ${data.page - 1}
      </button>`
  }
}

export default new Pagination();