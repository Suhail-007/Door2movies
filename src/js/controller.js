import * as model from './model.js';
import paginationView from './views/paginationView.js'
import movieView from './views/movieView.js'
import navView from './views/navView.js';

class App {
  init() {
    //home
    this.#controllerHome();

    //pagination
    paginationView.addHandlerClick(this.#controllerPagination);
    paginationView.renderData(model.data);

    //navbar
    navView.addNavToggleHandler();
    navView.addNavLinkHandler(this.#controlNavigation);
  }

  async #controllerHome() {
    try {
      //loader 
      await movieView.loader();

      //delay
      await movieView.delay(1000);

      //Render Movies
      model.getData(movieView);

    } catch (e) {

      //render Error message
      homeView.errorMessage('Something went wrong :(');
    }
  }


  async #controllerPagination() {
    try {
      //render Buttons
      paginationView.renderData(model.data);

      //get returned value from model fn
      const slicedArr = model.getPerPageMovie(model.data.pagination.page);

      //loader 
      await movieView.loader();

      //delay
      await movieView.delay(300);

      //render Movies
      movieView.renderData(slicedArr);
    } catch (e) {
      movieView.errorMessage();
    }
  }


  async #controlNavigation() {
    try {
      const filteredMovies = navView.addHashHandler(model.filterMovieCat);

      //loader
      await movieView.loader();

      //delay
      await movieView.delay(1000);

      movieView.renderData(filteredMovies);
    } catch (e) {
      movieView.errorMessage();
    }
  }
}

const app = new App();

app.init();