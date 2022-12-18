import axios from 'axios'
const handler = async function () {
	const API_KEY = process.env.TMDB_API_KEY;
	const TRENDING_BASE_URL = "".concat("https://api.themoviedb.org/3/trending/movie/day?api_key=", API_KEY);
	try {
		const { data } = await axios.get(TRENDING_BASE_URL);
		return {
			statusCode: 200,
			body: JSON.stringify({ trendingMovies: data })
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
