import * as model from './model.js';
import homeView from './views/homeView.js'
import movieView from './views/movieView.js'


class App {
  init() {
    this.#controllerHome()
    // model.getData();
  }

  async #controllerHome() {
    //loader 
    await homeView.loader();

    //delay
    await homeView.delay(500);
    
    model.getData(homeView.renderData);
    
    //render Error message
    homeView.errorMessage('Something went wrong :(');
  }
}

const app = new App();

app.init();