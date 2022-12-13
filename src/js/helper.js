'use strict'
import { SECONDS } from './config.js'

const timeout = function(sec) {
  return new Promise(function(_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long, Timeout after ${sec} seconds. please retry`))
    }, sec * 1000);
  });
}

export const getJSON = async function(url) {
  try {

    const res = await Promise.race([fetch(url), timeout(SECONDS)]);
    if (!res.ok) throw new Error('could\'t fetch movies');

    const data = await res.json();

    return data;
  } catch (err) {
    throw err
  }
}

export const updateURL = function(page = 'home', start, end) {
  const url = `?page=${page}&start=${start}&end=${end}`;
  const newURL = new URL(url, location.href);
  console.log(start);
  window.history.pushState({ start }, '', newURL);
}