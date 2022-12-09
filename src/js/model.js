'use strict'
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON, updateURL } from './helper.js'
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
  // console.log(start);
  const end = page * data.pagination.resPerPage;

  // updateURL('home', start, end);

  // getURL()
  return data.movies.slice(start, end);
}

export const filterMovieCat = function(hash) {
  updateURL(hash, 0, RES_PER_PAGE);

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

export const getURL = async function() {
  const url = new URL(location.href);
  const urlStart = url.searchParams.get('start');


  if (urlStart === undefined || urlStart === null) return

  if ((url !== null || url !== undefined) && Number(urlStart) > 0) {
    data.pagination.page = urlStart;
  }
}