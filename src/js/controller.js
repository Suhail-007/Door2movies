import * as model from './model.js';
import homeView from './views/homeView.js'
import movieView from './views/movieView.js'
import paginationView from './views/paginationView.js'
import navView from './views/navView.js';
import searchView from './views/searchView.js';
import downloadView from './views/downloadView.js';

class App {
  async init() {
    const id = document.body.id;

    //load movies as soon as window load i.e home/download page.
    window.addEventListener('load', function() {
      model.getJsonData();
      model.getURL();
    });

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

        //added delay for first time loading pagination
        await paginationView.delay(1000);

        paginationView.renderData(model.data);
        break;
      case 'download-page':
        //change page title
        model.changeTitle(id)

        //common things
        this.#COMMON();

        this.#controllerDownload();
        break;
      default:
        return
    }
  }

  #COMMON() {
    //search
    this.searchController();

    //navbar
    navView.addDropdownToggle();
    navView.addNavLinkHandler(this.controlNavigation);
  }

  async controllerHome() {
    try {
      //loader 
      await movieView.loader();

      //delay
      await movieView.delay(1500);

      //Render Movies
      movieView.renderData(model.getPerPageMovie(model.data.pagination.page));
    } catch (e) {
      //render Error message
      homeView.errorMessage('Something went wrong :(');
    }
  }


  async controllerPagination() {
    try {
      const { page } = model.data.pagination;

      //render Buttons
      paginationView.renderData(model.data);

      //get returned value from model fn
      const slicedArr = model.getPerPageMovie(page);

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
      const { page } = model.data.pagination;
      const filteredMovies = await navView.addHashHandler(model.filterMovies);

      //loader
      await movieView.loader();

      //delay
      await movieView.delay(1000);

      movieView.renderData(model.getPerPageMovie(page, filteredMovies));

      //re-render the pagination button
      paginationView.renderData(model.data);

    } catch (err) {
      movieView.errorMessage(err);
    }
  }

  searchController() {
    searchView.getSearchMovies(model.data)
    searchView.findSearchMovie(model.data);
  }

  //download page
  async #controllerDownload() {
    //loader
    await downloadView.loader();

    //delay
    await downloadView.delay(1000);

    //render movie
    downloadView.renderData(model.data);
  }
}

const app = new App();

app.init();