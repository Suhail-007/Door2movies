import * as model from './model.js';
import homeView from './views/homeView.js'
import paginationView from './views/paginationView.js'


class App {
  init() {
    this.#controllerHome();
    this.#controllerPagination();
  }

  async #controllerHome() {
    try {
      //loader 
      // await homeView.loader();

      //delay
      // await homeView.delay(1000);

      model.getData(homeView);

    } catch (e) {

      //render Error message
      homeView.errorMessage('Something went wrong :(');
    }
  }


  async #controllerPagination() {
    paginationView.renderData(model.data);
    
    paginationView.addHandlerClick(model);
  }
}

const app = new App();

app.init();