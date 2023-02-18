import { getJsonData, getURL, loadFilterMovies, HistoryBackForward, copyRightYear, changeTitle, data, getPerPageMovie, getFilterMovies } from './model.js';
import movieView from './views/movieView.js'
import paginationView from './views/paginationView.js'
import navView from './views/navView.js';
import searchView from './views/searchView.js';
import downloadView from './views/downloadView.js';
import { updateURL } from './helper.js';

class App {

  async init() {

    try {
      const id = document.body.id;
      await getJsonData();
      getURL();
      loadFilterMovies();
      HistoryBackForward(this.#renderMoviesPagination.bind(this));
      copyRightYear();

      switch (id) {
        case 'home':
          //change page title
          changeTitle(id);
          //home

          await this.#controllerHome();

          //common 
          this.#COMMON();

          await paginationView.addHandlerClick(this.#controllerPagination);

          //added delay for first time loading pagination
          await paginationView.delay(1000);
          paginationView.renderData(data);
          break;
        case 'download-page':
          //change page title
          changeTitle(id);

          //common things
          this.#COMMON(true);

          this.#controllerDownload();
          break;
        default:
          return
      }
    }
    catch (err) {
      movieView.errorMessage(err);
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
      movieView.renderData(getPerPageMovie(data.pagination.page));

    } catch (err) {
      movieView.errorMessage('Something went wrong :(');
    }
  }

  async #controllerPagination() {
    try {
      const { page } = data.pagination;

      //render Button
      paginationView.renderData(data);

      //get returned value from model fn
      const slicedArr = getPerPageMovie(page);

      //loader 
      await movieView.loader();

      //delay
      await movieView.delay(1000);

      //render Movies
      movieView.renderData(slicedArr);

    } catch (err) {
      movieView.errorMessage();
    }
  }

  async controlNavigation() {
    try {
      //need to remove model
      const filteredMovies = navView.filterMoviesHandler(data, getFilterMovies);
      navView.resetPage();
      navView.updateURL();

      //loader
      await movieView.loader();

      //delay
      await movieView.delay(1000);

      movieView.renderData(getPerPageMovie(data.pagination.page, filteredMovies));

      //re-render the pagination button
      paginationView.renderData(data);
    } catch (err) {
      console.log(err);
      movieView.errorMessage("Movie doesn\'t exist");
    }
  }

  #searchController() {
    searchView.addSearchHandler(data);
    searchView.enableSearchField(data.movies);
  }

  //download page
  async #controllerDownload() {
    //loader
    await downloadView.loader();

    //delay
    await downloadView.delay(1000);

    //render movie
    downloadView.renderData(data);
  }

  async #renderMoviesPagination() {
    await this.#controllerHome();
    paginationView.renderData(data);
  }
}

const app = new App();

app.init();