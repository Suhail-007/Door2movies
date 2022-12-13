'use strict'
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON, updateURL } from './helper.js'

export const data = {
  movies: [],
  category: '',
  movieCategories: ['action', 'adventure'],
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
    data.movies = await movies;
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
  } else return
}

export const getPerPageMovie = async function(page = 1, moviesArr = data.movies) {
  try {

    const url = new URL(location.href);
    const userPage = url.searchParams.get('page');

    const start = (page - 1) * data.pagination.resPerPage;
    const end = page * data.pagination.resPerPage;

    if (userPage != null && data.movieCategories.includes(userPage)) {
      const movies = await filterMovies(userPage);
      return movies.slice(start, end);
    }

    if (!userPage || userPage === 'home') {
      moviesArr = moviesArr.reverse();
      return moviesArr.slice(start, end);
    }
  } catch (err) {
    throw err
  }
}

export const filterMovies = async function(category) {
  //set filter to true
  data.filter = true;
  //set category to hash value
  data.category = category;

  const movies = await getJSON(API_URL);
  const filteredMovies = movies.filter(movie => movie.category.includes(category));
  data.movies = await filteredMovies;
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