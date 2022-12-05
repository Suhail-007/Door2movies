'use strict'
import { SECONDS } from './config.js'

const timeout = function(sec) {
  return new Promise(function(_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long, Timeout after ${sec} seconds`))
    }, sec * 1000);
  });
}

export const getJSON = async function(url) {
  try {

    const res = await Promise.race([fetch(url), timeout(SECONDS)]);
    
    if (!res.ok) throw new Error('could\'t fetch movies')

    const data = await res.json();

    return data;
  } catch (err) {
    throw err
  }
}