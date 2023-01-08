import View from './view.js';
import { RESET_PAGE, isDownloadMovie } from '../config.js';
import { updateURL, PAGINATION } from '../helper.js';

class Nav extends View {
  _category;
  _navLinks = document.querySelectorAll('[data-category]');

  #toggleDropDown(e) {
    const isDropdownBtn = e.target.matches('[data-dropdownBtn]');
    const dropdownContent = document.querySelector('[data-dropdown-content]');

    if (!isDropdownBtn && e.target.closest('[data-dropdown]') != null) dropdownContent.classList.remove('active');

    if (isDropdownBtn) dropdownContent.classList.toggle('active');
    else dropdownContent.classList.remove('active');
  }

  addDropdownLinksHandler(handler, download = false) {
    const dropdown = document.querySelector('[data-dropdown-content]');

    dropdown.addEventListener('click', e => {
      if (!e.target.dataset.category) return
      if (e.target.dataset.category && e.target.closest('[data-dropdown-content]')) {
        this._category = e.target.dataset.category;
        e.preventDefault();
        
        this._navLinks.forEach(link => link.classList.remove('active'));
        
        e.target.classList.add('active');
        
        //change the href value of anchor tag if user is on download page
        if (download) this._changeLocationHref();
        handler();
      }
    })
  }

  addDropdownToggleHandler() {
    window.addEventListener('click', this.#toggleDropDown);
  }

  addNavLinksHandler(handler) {
    this._data = handler.data;
    return handler.getFilterMovies(this._category);
  }

  resetPage() {
    this._data.pagination.page = RESET_PAGE;
  }

  updateURL() {
    const { start, end } = PAGINATION(this._data.pagination.page, this._data);

    //if user is on download page do not update the url
    if (!isDownloadMovie.download) updateURL(this._category, start, end);

    //set isDownloadMovie.download to false so when user leave page using navigation history won't update
    isDownloadMovie.download = false;
  }

  _changeLocationHref() {
    location.href = `../../index.html?page=${this._category}&start=${0}&end=${1}`;
  }
}

export default new Nav();