const fetch = require('node-fetch')
const handler = async function (event) {

  // const REQUEST_URL = "".concat(BASE_URL, "configuration?api_key=", API_KEY);
  const BASE_URL = process.env.TMDB_BASE_URL;
  const API_KEY = process.env.TMDB_API_KEY;

  const movieID = event.queryStringParameters.movieID;
  const DETAIL_SEARCH_URL = "".concat(BASE_URL, "movie/", movieID, "?api_key=", API_KEY, "&language=en-US");
  try {
    const data = await fetch(DETAIL_SEARCH_URL);
    const jsonData = await data.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ movieDetails: jsonData }),
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
