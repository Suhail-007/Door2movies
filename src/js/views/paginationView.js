import View from './view.js';
import { data } from '../model.js'

class Pagination extends View {
  _parentElem = document.querySelector('[data-pagination-btns-container]')
  
  generateNextBtnMarkup() {
    const html = `
    <button data-goto="${data.page + 1}"> Next </button>`
  }

  generatePrevBtnMarkup() {
    const html = `
    <button data-goto="${data.page - 1}"> Next </button>`
  }
}