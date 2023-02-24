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
  movieCategories: ['action', 'adventure', 'anime', 'racing', 'fight', 'sci-fi', 'thriller', 'fantasy', 'crime'],
  filter: false,
  pagination: {
    resPerPage: RES_PER_PAGE,
    page: 1,
  },
}

export const getJsonData = async function() {
  try {
    data.movies = await getJSON(API_URL);
    data.movies = data.movies.reverse();
    data.search.movies = data.movies.map(m => m);
  } catch (err) {
    throw err
  }
}

//load filter movies on window load
export const loadFilterMovies = function() {
  const { page } = getURLPage();
  if (data.movieCategories.includes(page)) {
    data.filteredMovies = data.movies.filter(m => m.category.includes(page));
    //reverse the array so new movies will be at starting 
    data.filteredMovies = data.filteredMovies.reverse();
    data.filter = true;
    data.category = page;
  }
}

export const getPerPageMovie = function(page = 1, moviesArr = data.movies) {
  const { page: userPage } = getURLPage();
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
}

export const getFilterMovies = async function(category) {
  try {
    //set filter to true
    data.filter = true;
    //set category to hash value
    data.category = category;
    
    const movies = await getJSON(API_URL);
    
    data.filteredMovies = movies.filter(movie => movie.category.includes(category));

    return data.filteredMovies;
  } catch (err) {
    throw err
  }
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

export const copyRightYear = function() {
  const yearElem = document.querySelector('[data-copyright-year]');
  const year = new Date().getFullYear();
  yearElem.textContent = year;
}