import View from './view.js';

class Nav extends View {
  #toggleDropDown(e) {
    const isDropdownBtn = e.target.matches('[data-dropdownBtn]');

    //as long as user clicking inside of dropdown it won't close
    if (!isDropdownBtn && e.target.closest('[data-dropdown]') != null) return;

    const dropdownContent = document.querySelector('[data-dropdown-content]');

    if (isDropdownBtn) dropdownContent.classList.toggle('active');
    else dropdownContent.classList.remove('active');
  }
  
  addNavLinkHandler(handler) {
    window.addEventListener('hashchange', handler)
  }

  addDropdownToggle() {
    window.addEventListener('click', this.#toggleDropDown);
  }

  addHashHandler(handler) {
    const category = location.hash.slice(1).toLowerCase();
    return handler(category);
  }
}

export default new Nav();