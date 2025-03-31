import axios from 'axios'

const handler = async function () {
	const API_KEY = process.env.TMDB_API_KEY;
	const TRENDING_BASE_URL = "https://api.themoviedb.org/3/trending/movie/day";

	if(!API_KEY) {
		throw new Error("-------- TMDB API KEY NOT PRESENT --------");
	}

	try {
		const {data} = await axios.get(TRENDING_BASE_URL, {
			params: {'api_key': API_KEY}
		});
		return {
			statusCode: 200,
			body: JSON.stringify({trendingMovies: data})
		}
	} catch(error) {
		console.error(error)
		return {
			statusCode: 500,
			body: JSON.stringify({msg: error.message}),
		}
	}
}

module.exports = {handler}
