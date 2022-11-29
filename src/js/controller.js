import * as model from './model.js';
import homeView from './views/homeView.js'
import movieView from './views/movieView.js'


class App {
  init() {
    this.#controllerHome()
    model.getData();
  }

  async #controllerHome() {
    //loader 
    await homeView.loader();

    //delay
    await homeView.delay(500);
  }
}

const app = new App();

app.init();