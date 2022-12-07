import * as model from './model.js';
import homeView from './views/homeView.js'
import movieView from './views/movieView.js'
import paginationView from './views/paginationView.js'
import navView from './views/navView.js';
import searchView from './views/searchView.js';

class App {
  init() {
    const id = document.body.id;

    //load movies as soon as window load
    window.addEventListener('load', model.getJsonData);
    
    //get url of the page
    model.getURL();

    switch (id) {
      case 'home':
        //change page title
        model.changeTitle(id);

        //home
        this.controllerHome();

        //common 
        this.#COMMON();

        //pagination
        paginationView.addHandlerClick(this.controllerPagination);
        paginationView.renderData(model.data);


        break;
      case 'download-page':
        //change page title
        model.changeTitle(id)

        //common things
        this.#COMMON()
        break;
      default:
        return
    }
  }

  #COMMON() {
    //search
    this.searchController();

    //navbar
    navView.addNavToggleHandler();
    navView.addNavLinkHandler(this.controlNavigation);

  }

  async controllerHome() {
    try {
      //loader 
      await movieView.loader();

      //delay
      await movieView.delay(1500);

      //Render Movies
      movieView.renderData(model.getPerPageMovie());

    } catch (e) {
      //render Error message
      homeView.errorMessage('Something went wrong :(');
    }
  }


  async controllerPagination() {
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


  async controlNavigation() {
    try {
      //loader
      await movieView.loader();

      //delay
      await movieView.delay(1000);

      movieView.renderData(navView.addHashHandler(model.filterMovieCat));

    } catch (e) {
      movieView.errorMessage();
    }
  }

  searchController() {
    searchView.getSearchMovies(model.data)

    searchView.findSearchMovie(model.data);
  }
}

const app = new App();

app.init();