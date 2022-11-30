import View from './view.js';
import { data } from '../model.js'

class Pagination extends View {
  _parentElem = document.querySelector('[data-pagination-btns-container]')
  
  generateNextBtnMarkup() {
    const html = `
    <button data-goto="${data.page + 1}">
      Page ${data.page + 1}
      <svg class="next__btn">
        <use href="./src/icons.svg#icon-chevron-right"></use>
      </svg>
    </button>`
  }

  generatePrevBtnMarkup() {
    const html = `
    <button data-goto="${data.page - 1}">
      Page ${data.page - 1}
      <svg class="next__btn">
        <use href="./src/icons.svg#icon-chevron-left"></use>
      </svg>
    </button>`
  }
}

export default new Pagination();