const fetch = require('node-fetch')
const handler = async function (event) {
  // const REQUEST_URL = "".concat(BASE_URL, "configuration?api_key=", API_KEY);
  const BASE_URL = process.env.TMDB_BASE_URL;
  const API_KEY = process.env.TMDB_API_KEY;
  const MOVIE_SEARCH_URL = "".concat(BASE_URL, "search/movie?api_key=", API_KEY, "&query=", event.queryStringParameters.moviename);
  console.log(MOVIE_SEARCH_URL);
  try {
    const data = await fetch(MOVIE_SEARCH_URL);
    const jsonData = await data.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ foundMovies: jsonData }),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    }
  }
}
module.exports = { handler }
