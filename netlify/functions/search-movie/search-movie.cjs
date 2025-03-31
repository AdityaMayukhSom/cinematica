import axios from 'axios'

const handler = async function (event) {
	const API_KEY = process.env.TMDB_API_KEY;
	const MOVIE_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

	if(!API_KEY) {
		throw new Error("-------- TMDB API KEY NOT PRESENT --------");
	}

	try {
		const {data} = await axios.get(MOVIE_SEARCH_URL, {
			params: {
				'api_key': API_KEY,
				'query': event.queryStringParameters.moviename
			}
		});
		return {
			statusCode: 200,
			body: JSON.stringify({foundMovies: data})
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
