import View from './view.js';

class Nav extends View {
  
  addDropDownHandler() {
    window.addEventListener('click', this.#toggleDropDown);
  }
  
  #toggleDropDown(e) {
    const isDropdownBtn = e.target.matches('[data-dropdownBtn]');

    //as long as user clicking inside of dropdown it won't close
    if (!isDropdownBtn && e.target.closest('[data-dropdown]') != null) return;

    const dropdownContent = document.querySelector('[data-dropdown-content]');
    
    if (isDropdownBtn) dropdownContent.classList.toggle('active');
    else dropdownContent.classList.remove('active');
  }
  
  
  addHashHandler(handler) {
    window.addEventListener('hashchange', () => {
      const category = location.hash.slice(1).toLowerCase();
      handler(category);
    })
  }
}

export default new Nav();