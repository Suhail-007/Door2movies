import * as model from './model.js';
import homeView from './views/homeView.js'
import movieView from './views/movieView.js'


class App {
  init() {
    model.getData();
    this.#controllerHome()
  }

  #controllerHome() {
    // console.log(homeView);
    homeView.renderData(model.fetchMovies());
  }
}

const app = new App();

app.init();