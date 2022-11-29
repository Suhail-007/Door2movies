export default class View {
  _data

  async renderData(data) {
    this._data = await data;

    const markup = this._generateMovieMarkup();

    //remove any pre-added markup
    this._clear();

    this._parentElem.insertAdjacentHTML('beforeend', markup);
  }

  _clear() {
    this._parentElem.innerHTML = ''
  }
}