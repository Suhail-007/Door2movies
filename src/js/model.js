'use strict'
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helper.js'
import homeView from './views/homeView.js'

export const data = {
  movies: [],
  resPerPage = RES_PER_PAGE,
  page = 1,
}

export const getData = async function() {
  try {
    data.movies = await getJSON(API_URL);

    //reverse the array so newly added movies will always be visible
    data.movies = data.movies.reverse();

    const id = document.body.id;
    switch (id) {
      case 'home':
        homeView.renderData(data.movies);
        break;
      default:
        return
    }
  } catch (err) {
    console.log(err);
  }
}