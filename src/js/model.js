'use strict'
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helper.js'
import homeView from './views/homeView.js'

export const data = {
  movies: [],
  pagination: {
    start: null,
    end: null,
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

  data.pagination.start = (page - 1) * data.pagination.resPerPage;
  data.pagination.end = page * data.pagination.resPerPage;

  updateURL()
  return data.movies.slice(data.pagination.start, data.pagination.end);
}

const updateURL = function() {
   const url = `?page=home&start=${data.pagination.start}&end=${data.pagination.end}`;
  
  const u = new URL(url, location.href);
  window.history.pushState({}, '', u);
}

export const filterMovieCat = function(hash) {
  const url = new URL(window.location);
  url.searchParams.set('page', hash);
  window.history.pushState({}, '', url);

  if (!hash) return data.movies;

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

export const getURL = function() {
  const url = new URLSearchParams();
  const urlStart = url.get('start');

  if (urlStart === undefined || urlStart === null) return
  
  if ((url !== null || url !== undefined) && +urlStart > 0) {
    
  console.log(urlStart);
  }
}