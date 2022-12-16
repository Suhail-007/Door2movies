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

export const loadData = function() {
  window.addEventListener('load', async () => {
    try {
      //load movies as soon as window load i.e home/download page.
      await getJsonData();
      await getURL();
      await loadFilterMovies();
    } catch (e) {
      location.reload();
    }
  });
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

export const getPerPageMovie = async function(page = 1, moviesArr = data.movies) {
  try {
    const { url, page: userPage, urlStart } = getURLPage();
    const { start, end } = PAGINATION(page, data);

    if (userPage != null && data.movieCategories.includes(userPage)) {
      moviesArr = data.filteredMovies;
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

export const HistoryBackForward = function(handler) {
  window.addEventListener('popstate', async e => {
    try {
      const { page } = getURLPage();

      e.preventDefault();

      if (!e.state || !location.href.includes('page')) {
        data.pagination.page = 1;
        data.filter = false;

        //since we are assign filter movies to data.movies we need the orignal array again for trst page
        await getJsonData();
        await handler()
        return
      }

      if (e.state != null && page === 'home') {
        data.pagination.page = Math.ceil((e.state.start / data.pagination.resPerPage) + 1);
        data.filter = false;
        await handler()
        return
      }

      if (e.state != null) {
        data.pagination.page = Math.ceil((e.state.start / data.pagination.resPerPage) + 1);

        const isCategory = data.filteredMovies.every(m => m.category.includes(page));

        if (!isCategory) getFilterMovies(page);

        await handler()
        return
      }
    } catch (err) {
      console.log(err);
    }
  })
}