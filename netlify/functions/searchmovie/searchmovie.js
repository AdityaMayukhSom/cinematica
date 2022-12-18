import axios from 'axios'
const handler = async function (event) {
	const BASE_URL = process.env.TMDB_BASE_URL;
	const API_KEY = process.env.TMDB_API_KEY;
	const MOVIE_SEARCH_URL = "".concat(BASE_URL, "search/movie?api_key=", API_KEY, "&query=", event.queryStringParameters.moviename);
	try {
		const { data } = await axios.get(MOVIE_SEARCH_URL);
		return {
			statusCode: 200,
			body: JSON.stringify({ foundMovies: data })
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
