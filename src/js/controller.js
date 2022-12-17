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

    await model.loadData();
    model.HistoryBackForward(this.#renderMoviesPagination.bind(this));
    switch (id) {
      case 'home':

        //change page title
        model.changeTitle(id);

        //home
        await this.#controllerHome();

        //common 
        this.#COMMON();

        await paginationView.addHandlerClick(this.#controllerPagination);

        //added delay for first time loading pagination
        await paginationView.delay(1000);
         paginationView.renderData(model.data);
        break;
      case 'download-page':
        //change page title
        model.changeTitle(id);

        //common things
        this.#COMMON(true);

        this.#controllerDownload();
        break;
      default:
        return
    }
  }

  #COMMON(downloadPage = false) {
    //search
    this.#searchController();
    //navbar
    navView.addDropdownToggleHandler();
    navView.addDropdownLinksHandler(this.controlNavigation, downloadPage);
  }

  async #controllerHome() {
    try {
      //loader 
      await movieView.loader();

      //delay
      await movieView.delay(1000);

      //Render Movies
      await movieView.renderData(model.getPerPageMovie(model.data.pagination.page));

    } catch (err) {
      movieView.errorMessage('Something went wrong :(');
    }
  }

  async #controllerPagination() {
    try {
      const { page } = model.data.pagination;

      //render Button
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
    try {
      const filteredMovies = await navView.addNavLinksHandler(model);
      navView.resetPage();
      navView.updateURL();

      //loader
      await movieView.loader();

      //delay
      await movieView.delay(1000);

      await movieView.renderData(model.getPerPageMovie(model.data.pagination.page, filteredMovies));

      //re-render the pagination button
      await paginationView.renderData(model.data);
    } catch (err) {
      movieView.errorMessage(err);
    }
  }

  #searchController() {
    searchView.addSearchHandler(model.data);
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

  async #renderMoviesPagination() {
    await this.#controllerHome();
    await paginationView.renderData(model.data);
  }
}

const app = new App();

app.init();