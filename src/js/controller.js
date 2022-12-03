import * as model from './model.js';
import paginationView from './views/paginationView.js'
import movieView from './views/movieView.js'
import navView from './views/navView.js';

class App {
  init() {
    this.#controllerHome();
    paginationView.addHandlerClick(this.#controllerPagination());
    this.#controlNavigation()
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


   #controllerPagination() {
    //render Buttons
    paginationView.renderData(model.data);

    return model
  }
  
  
  #controlNavigation() {
    
    navView.addDropDownHandler();
    
    navView.addHashHandler(model.filterMovieCat);
  }
}

const app = new App();

app.init();