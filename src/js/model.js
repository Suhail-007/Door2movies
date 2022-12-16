'use strict'
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON, updateURL, PAGINATION } from './helper.js'

export const data = {
  movies: [],
  filteredMovies: [],
  search: {
    movies: [],
  },
  category: '',
  movieCategories: ['action', 'adventure'],
  filter: false,
  pagination: {
    resPerPage: RES_PER_PAGE,
    page: 1,
  },
}

export const getJsonData = async function() {
  try {
    const movies = await getJSON(API_URL);
    data.movies = await movies;
    data.movies = data.movies.reverse();
    data.search.movies = await data.movies.map(m => m);
  } catch (err) {
    throw err
  }
}

//load filter movies on window load
export const loadFilterMovies = async function() {
  const { page } = getURLPage();
  if (data.movieCategories.includes(page)) {
    data.filteredMovies = await data.movies.filter(m => m.category.includes(page));
    //reverse the array to how it was
    data.filteredMovies = data.filteredMovies.reverse();
    data.filter = true;
    data.category = page;
  }
}

//when user refresh the page(category) getJsonData fn get triggered which overwrites the data.movie array that causes the pagination to render more pages than needed so we're overwriting in for categories
export const overwriteMovieArr = function() {
  const { url, page, urlStart } = getURLPage();

  if (page != null && page !== 'home') {
    //overwrite the movies arr if page is not home
    data.movies = data.movies.filter(m => m.category.includes(page));
  } else return
}

export const getPerPageMovie = async function(page = 1, moviesArr = data.movies) {
  try {
    const { url, page: userPage, urlStart } = getURLPage();
    const { start, end } = PAGINATION(page, data);

    if (userPage != null && data.movieCategories.includes(userPage)) {
      moviesArr = data.filteredMovies;
      console.log(moviesArr);
      return moviesArr.slice(start, end);
    }

    if (!userPage || userPage === 'home') {
      //set filter to true
      data.filter = false;
      return moviesArr.slice(start, end);
    }
  } catch (err) {
    throw err
  }
}

export const getFilterMovies = async function(category) {
  //set filter to true
  data.filter = true;
  //set category to hash value
  data.category = category;

  const movies = await getJSON(API_URL);
  data.filteredMovies = await movies.filter(movie => movie.category.includes(category));
  return await data.filteredMovies;
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
  const { url, page, urlStart } = getURLPage();

  if (!url || !page) return

  if (url && Number(urlStart) > 0) {
    data.pagination.page = Math.ceil((urlStart / data.pagination.resPerPage) + 1);
  }
}

export const getURLPage = function() {
  const url = new URL(location.href);
  const page = url.searchParams.get('page');
  const urlStart = url.searchParams.get('start');

  return { url, page, urlStart }
}