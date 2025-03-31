import axios from 'axios'

const handler = async function (event) {
	const API_KEY = process.env.TMDB_API_KEY;
	const movieID = event.queryStringParameters.movieID;
	const DETAIL_SEARCH_URL = `https://api.themoviedb.org/3/movie/${movieID}`;

	if(!API_KEY) {
		throw new Error("-------- TMDB API KEY NOT PRESENT --------");
	}

	try {
		const {data} = await axios.get(DETAIL_SEARCH_URL, {
			params: {
				'api_key': API_KEY,
				'language': 'en-US'
			}
		})
		return {
			statusCode: 200,
			body: JSON.stringify({movieDetails: data})
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
