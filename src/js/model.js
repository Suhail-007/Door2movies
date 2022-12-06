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

const url = `${window.location.href}?page=home & start=${start} & end=${end}`

  const newUrl = new URL(url);

  window.history.pushState({}, '', newUrl);

  return data.movies.slice(start, end);
}

export const filterMovieCat = function(hash) {
  const url = new URL(window.location);
  url.searchParams.set('page', hash);
  window.history.pushState({}, '', url);
  
  
  if(!hash) return data.movies;

  const filteredMovies = data.movies.filter(movie => movie.category.includes(hash));
  return filteredMovies
}

export const changeTitle = function(id) {
  let title;
  if (id === 'home') title = 'Home || Door2Movies';

  if (id === 'download-page') {
    const url = new URL(location.href);
    const movieTitle = url.searchParams.get('name');
    title = `Download ${movieTitle.toUpperCase()} || Door2Movies`;
  }
  
  document.title = title
}