'use strict'
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON, updateURL } from './helper.js'

export const data = {
  movies: [],
  category: '',
  filter: false,
  pagination: {
    resPerPage: RES_PER_PAGE,
    page: 1,
  },
  search: {
    movies: [],
  },
}

export async function getJsonData() {
  try {
    const movies = await getJSON(API_URL);
    data.movies = await movies.reverse();
  } catch (err) {
    throw err
  }
}

export const overwriteMovieArr = function() {
  const url = new URL(location.href);
  const hash = url.searchParams.get('page');
  if (hash != null && hash !== 'home') {
    //overwrite the movies arr if page is not home
    data.movies = data.movies.filter(movie => movie.category.includes(hash));
    console.log(data.movies);
  } else return
}

export const getPerPageMovie = async function(page = 1, moviesArr = data.movies) {
  try {
    const url = new URL(location.href);
    const hash = url.searchParams.get('page');

    const start = (page - 1) * data.pagination.resPerPage;
    const end = page * data.pagination.resPerPage;

    if (hash != null && hash !== 'home') {
      const movies = await filterMovies(hash);
      return movies.slice(start, end);
    }

    if (hash == null || hash === 'home') {
      return moviesArr.slice(start, end);
    }
  } catch (err) {
    throw err
  }
}

export const filterMovies = async function(hash) {
  const start = (data.pagination.page - 1) * data.pagination.resPerPage;
  const end = data.pagination.page * data.pagination.resPerPage;

  updateURL(hash, start, end);
  //set filter to true
  data.filter = true;
  //set category to hash value
  data.category = hash;

  const movies = await getJSON(API_URL);
  const filteredmovies = movies.filter(movie => movie.category.includes(hash));
  data.movies = await filteredmovies;
  return data.movies;
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
  const page = url.searchParams.get('page');
  const urlStart = url.searchParams.get('start');

  if (!url || !page) return

  if (url && Number(urlStart) > 0) {
    data.pagination.page = Math.ceil((urlStart / data.pagination.resPerPage) + 1);
  }
}