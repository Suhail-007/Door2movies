'use strict'
import { SECONDS } from './config.js'

const timeout = function(sec) {
  return new Promise(function(_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long, Timeout after ${sec} seconds. please retry`))
    }, sec * 1000);
  })
  .catch(err => {
    throw Error(err);
  });
}

export const getJSON = async function(url) {
  try {
    const res = await Promise.race([fetch(url, {
      method: 'GET',
      'Content-Type': 'application/json',
      'X-Custom-Header': 'ProcessThisImmediately',
    }), timeout(SECONDS)]);
    if (!res || !res.ok) throw new Error('could\'t fetch movies');
    
    const data = await res.json();
    
    return data
  } catch (err) {
    throw err
  }
}

export const updateURL = function(page = 'home', start, end) {
  const url = `?page=${page}&start=${start}&end=${end}`;
  const newURL = new URL(url, location.href);
  window.history.pushState({ start }, '', newURL);
}

export const PAGINATION = function(page, data) {
  const start = (page - 1) * data.pagination.resPerPage;
  const end = page * data.pagination.resPerPage;
  return { start, end }
}