import axios from 'axios'

const API_ENDPOINT = 'https://www.omdbapi.com/?apikey=f77ca997';

export const fetchMovies = async (movieName) => axios.get(`${API_ENDPOINT}&s=${movieName}`)

// We wanted to fetch movie using redux-saga, when some action is dispatched.
// This is normal function of GET request to the server using axios to fetch movie.

// This function for fetching from API will be called by generator function