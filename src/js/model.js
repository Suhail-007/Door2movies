'use strict'
import { fetchAPI } from './config.js';

export const data = {
  movies: {},
}

export const fetchMovies = async function() {
  const res = await fetch(fetchAPI);
  const data = await res.json();
  return data;
}

export const getData = async function() {
  data.movies = await fetchMovies();
  
  let id = document.body.id;
  switch (id) {
    case 'home':

      break;
    default:
      return
  }
}