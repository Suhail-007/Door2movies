'use strict'
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helper.js'
import homeView from './views/homeView.js'

export const data = {
  movies: [],
  pagination: {
    resPerPage: RES_PER_PAGE,
    page: 1,
  }
}

export const getData = async function(callBackFn) {
  try {
    data.movies = await getJSON(API_URL);

    //reverse the array so newly added movies will always be visible
    data.movies = data.movies.reverse();

    const id = document.body.id;
    switch (id) {
      case 'home':
        callBackFn.renderData(getPerPageMovie());
        break;
      default:
        return
    }
  } catch (err) {
    throw err
  }
}

export const getPerPageMovie = function(page = 1) {
  data.pagination.page = page;
  const start = (page - 1) * data.pagination.resPerPage;
  const end = page * data.pagination.resPerPage;

  return data.movies.slice(start, end);
}

export const filterMovieCat = function(hash) {
  return data.movies.filter(movie => movie.category.includes(hash))
}