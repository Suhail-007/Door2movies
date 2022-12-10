export default class View {
  _data

  async renderData(data, value='home') {
    this._data = await data;

    if (!this._data) throw new Error('could not able to load data');
    
    const markup = this._generateMarkup();

    //remove any pre-added markup
    this._clear();

    this._parentElem.insertAdjacentHTML('beforeend', markup);
  }

  _clear() {
    this._parentElem.innerHTML = ''
  }

  _createSlug(name) {
    return name.toLowerCase();
  }

  loader() {
    const html = `
      <div class="loader">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z"/>
          </g>
        </svg>
      </div>`

    this._clear();
    this._parentElem.insertAdjacentHTML('beforeend', html);

    return Promise.resolve()
  }

  delay(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms)
    })
  }

  errorMessage(message = 'check your internet connection') {
    const html = `
      <div class="error-message">
        <p class="message">
          ${message}
        </p>
      </div>`

    this._clear();
    this._parentElem.insertAdjacentHTML('beforeend', html);
  }
}