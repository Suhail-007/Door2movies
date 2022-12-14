import View from './view.js';
import { RESET_PAGE } from '../config.js';
import { updateURL, PAGINATION } from '../helper.js';

class Nav extends View {
  _category

  #toggleDropDown(e) {
    const isDropdownBtn = e.target.matches('[data-dropdownBtn]');

    //as long as user clicking inside of dropdown it won't close
    if (!isDropdownBtn && e.target.closest('[data-dropdown]') != null) return;

    const dropdownContent = document.querySelector('[data-dropdown-content]');

    if (isDropdownBtn) dropdownContent.classList.toggle('active');
    else dropdownContent.classList.remove('active');
  }

  addDropdownHandler(handler) {
    const dropdown = document.querySelector('[data-dropdown-content]');

    dropdown.addEventListener('click', e => {

      if (!e.target.dataset.category) return
      if (e.target.dataset.category && e.target.closest('[data-dropdown-content]')) {
        e.preventDefault();
        this._category = e.target.dataset.category;
        handler();
      }
    })
  }

  addDropdownToggleHandler() {
    window.addEventListener('click', this.#toggleDropDown);
  }

  getFilterMoviesHandler(handler) {
    handler.data.pagination.page = RESET_PAGE;

    const { start, end } = PAGINATION(handler.data.pagination.page, handler.data);

    updateURL(this._category, start, end);
    return handler.filterMovies(this._category);
  }
}

export default new Nav();