import View from './view.js';
import { RESET_PAGE, isDownloadMovie } from '../config.js';
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

  addDropdownHandler(handler, download = false) {
    const dropdown = document.querySelector('[data-dropdown-content]');

    dropdown.addEventListener('click', e => {
      if (!e.target.dataset.category) return
      if (e.target.dataset.category && e.target.closest('[data-dropdown-content]')) {
        this._category = e.target.dataset.category;
        e.preventDefault();
        //change the href value of anchor tag if user is on download page
        if (download) this._changeLocationHref();
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

    //if user is on download page do not update the url
    if (!isDownloadMovie.download) updateURL(this._category, start, end);
    //set isDownloadMovie.download to false so when user leave page using navigation history won't update
    isDownloadMovie.download = false;
    return handler.filterMovies(this._category);
  }

  _changeLocationHref() {
    location.href = `../../index.html?page=${this._category}&start=${0}&end=${1}`;
  }
}

export default new Nav();