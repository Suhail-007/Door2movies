import * as model from './model.js';
import View from './views/movieView.js'
import movieView from './views/movieView.js'
import paginationView from './views/paginationView.js'
import navView from './views/navView.js';
import searchView from './views/searchView.js';
import downloadView from './views/downloadView.js';
import { updateURL } from './helper.js';

class App {
  async init() {
    const id = document.body.id;

    window.addEventListener('load', this.#loadData.bind(this));
    window.addEventListener('popstate', this.#HistoryBackForward.bind(this));

    switch (id) {
      case 'home':

        //change page title
        model.changeTitle(id);

        //home
        this.#controllerHome();

        //common 
        this.#COMMON();

        navView.addDropdownHandler(this.controlNavigation);

        paginationView.addHandlerClick(this.#controllerPagination);

        //added delay for first time loading pagination
        await paginationView.delay(1000);
        paginationView.renderData(model.data);

        break;
      case 'download-page':
        //change page title
        model.changeTitle(id);

        //common things
        this.#COMMON();
        navView.addDropdownHandler(this.controlNavigation, true);
        this.#controllerDownload();
        break;
      default:
        return
    }
  }

  #COMMON() {
    //search
    this.#searchController();
    //navbar
    navView.addDropdownToggleHandler();
  }

  async #controllerHome() {
    try {
      //loader 
      await movieView.loader();

      //delay
      await movieView.delay(1000);

      //Render Movies
      await movieView.renderData(model.getPerPageMovie(model.data.pagination.page));

    } catch (e) {
      movieView.errorMessage('Something went wrong :(');
    }
  }

  async #controllerPagination() {
    try {
      const { page } = model.data.pagination;

      //render Burton
      await paginationView.renderData(model.data);

      //get returned value from model fn
      const slicedArr = model.getPerPageMovie(page);

      //loader 
      await movieView.loader();

      //delay
      await movieView.delay(1000);

      //render Movies
      await movieView.renderData(slicedArr);

    } catch (err) {
      movieView.errorMessage();
    }
  }

  async controlNavigation() {
    debugger
    try {
      const { page } = model.data.pagination;
      const filteredMovies = await navView.getFilterMoviesHandler(model);

      //loader
      await movieView.loader();

      //delay
      await movieView.delay(1000);

      await movieView.renderData(model.getPerPageMovie(page, filteredMovies));

      //re-render the pagination button
      await paginationView.renderData(model.data);
    } catch (err) {
      movieView.errorMessage(err);
    }
  }

  #searchController() {
    searchView.addSearchHandler(model.data)
  }

  //download page
  async #controllerDownload() {
    //loader
    await downloadView.loader();

    //delay
    await downloadView.delay(1000);

    //render movie
    await downloadView.renderData(model.data);
  }

  async #loadData() {
    //load movies as soon as window load i.e home/download page.
    await model.getJsonData();
    await model.getURL();
    await model.overwriteMovieArr();
  }

  async #HistoryBackForward(e) {
    e.preventDefault();
    if (!e.state || !location.href.includes('page')) {
      model.data.pagination.page = 1;
      model.data.filter = false;

      //since we are assign filter movies to data.movies we need the orignal array again for trst page
      await model.getJsonData();
      await this.#controllerHome();
      paginationView.renderData(model.data);
      return
    }

    if (e.state != null) {
      model.data.pagination.page = Math.ceil((e.state.start / model.data.pagination.resPerPage) + 1);

      this.#controllerHome();
      paginationView.renderData(model.data);
      return
    }
  }
}

const app = new App();

app.init();