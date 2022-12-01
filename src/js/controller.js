import * as model from './model.js';
import homeView from './views/homeView.js'
import paginationView from './views/paginationView.js'
import movieView from './views/movieView.js'


class App {
  init() {
    this.#controllerHome();
    paginationView.addHandlerClick(this.#controllerPagination());
  }

  async #controllerHome() {
    try {
      //loader 
      // await homeView.loader();

      //delay
      // await homeView.delay(1000);
      
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
}

const app = new App();

app.init();