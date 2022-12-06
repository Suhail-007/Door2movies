'use strict'
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helper.js'
import homeView from './views/homeView.js'

export const data = {
  movies: [],
  pagination: {
    resPerPage: RES_PER_PAGE,
    page: 1,
  },
  search: {
    movies: [],
  }
}

export async function getJsonData() {
  try {
     data.movies = await getJSON(API_URL);
     data.movies = data.movies.reverse();
  } catch (err) {
    throw err
  }
}

export const getPerPageMovie = function(page = 1) {
  data.pagination.page = page;
  const start = (page - 1) * data.pagination.resPerPage;
  const end = page * data.pagination.resPerPage;

  const url = new URL(window.location);
  url.searchParams.set('page', 'home');
  url.searchParams.set('start', start);
  url.searchParams.set('end', end);

  window.history.pushState({}, '', url);
  
  return data.movies.slice(start, end);
}

export const filterMovieCat = function(hash) {
  const url = new URL(window.location);
  url.searchParams.set('page', hash);
  window.history.pushState({}, '', url);

  const filteredMovies = data.movies.filter(movie => movie.category.includes(hash));
  return filteredMovies
}

export const changeTitle = function (id) {
  if(id === 'home') document.title = 'DOOR2MOVIES';
  
  if(id === 'download-page') {
    const url = location.href;
    const searchParam = new URLSearchParams(url);
    // console.log(url);
    const title = searchParam.get('name');
    console.log(title);
    
  }
}