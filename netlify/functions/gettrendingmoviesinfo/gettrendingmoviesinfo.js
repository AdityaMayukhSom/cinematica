const handler = async function () {
	console.log("process env")
	// const REQUEST_URL = "".concat(BASE_URL, "configuration?api_key=", API_KEY);

	const API_KEY = process.env.TMDB_API_KEY;

	const TRENDING_BASE_URL = "".concat("https://api.themoviedb.org/3/trending/movie/day?api_key=", API_KEY);
	try {
		const data = await fetch(TRENDING_BASE_URL);
		const jsonData = await data.json();
		return {
			statusCode: 200,
			body: JSON.stringify({ trendingMovies: jsonData }),
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
