import View from './view.js';
import { RESET_PAGE, isDownloadMovie } from '../config.js';
import { updateURL as updateUrlHelper, PAGINATION } from '../helper.js';

class Nav extends View {
  _category;
  _navLinks;

  generateCategoriesMarkup(data) {
    this._data = data;
    const { movieCategories: categories } = this._data;
    const links = categories.map(category => {
      return `<a href="#" data-category="${category}">${category}</a>`
    });

    const dropdownMenu = document.querySelector('[data-dropdown-content]');
    dropdownMenu.insertAdjacentHTML('beforeend', links.join(''));
  }

  #toggleDropDown(e) {
    const isDropdownBtn = e.target.matches('[data-dropdownBtn]');
    const dropdownContent = document.querySelector('[data-dropdown-content]');

    if (!isDropdownBtn && e.target.closest('[data-dropdown]') != null) dropdownContent.classList.remove('active');

    if (isDropdownBtn) dropdownContent.classList.toggle('active');
    else dropdownContent.classList.remove('active');
  }

  addDropdownLinksHandler(handler, download = false) {
    const dropdown = document.querySelector('[data-dropdown-content]');
    const navLinks = document.querySelectorAll('[data-category]');

    dropdown.addEventListener('click', e => {
      if (!e.target.dataset.category) return
      if (e.target.dataset.category && e.target.closest('[data-dropdown-content]')) {
        this._category = e.target.dataset.category.toLowerCase();
        e.preventDefault();

        navLinks.forEach(link => link.classList.remove('active'));

        e.target.classList.add('active');

        //change the href value of anchor tag for categories/genre if user is on download page
        if (download) this._changeLocationHref();
        handler();
      }
    })
  }

  addDropdownToggleHandler() {
    window.addEventListener('click', this.#toggleDropDown);
  }

  filterMoviesHandler(handler) {
    return handler(this._category);
  }

  resetPage() {
    this._data.pagination.page = RESET_PAGE;
  }

  updateURL() {
    const { start, end } = PAGINATION(this._data.pagination.page, this._data);

    //if user is on download page do not update the url
    if (!isDownloadMovie.download) updateUrlHelper(this._category, start, end);

    //set isDownloadMovie.download to false so when user leave page using navigation history won't update
    isDownloadMovie.download = false;
  }

  _changeLocationHref() {
    location.href = `../../index.html?page=${this._category}&start=${0}&end=${1}`;
  }
}

export default new Nav();