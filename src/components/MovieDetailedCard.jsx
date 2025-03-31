import React, {useState, useEffect} from "react";

const MovieDetailedCard = (props) => {
	/**
	* @type {ReturnType<typeof useState<{
	*   name: string;
	*   releaseDate: string;
	*   rating: string;
	*   overview: string;
	*   voteCount: number;
	*   posterUrl: string;
	* } >>}
	*/
	const [movie, setMovie] = useState();
	const [loading, setLoading] = useState(false);

	const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w780";

	const getMovieDetailsForDetailedCard = async (movieID) => {
		try {
			setLoading(true);
			const result = await fetch(`/.netlify/functions/get-movie-details?movieID=${movieID}`)
			const objectFromJson = await result.json();
			const data = objectFromJson.movieDetails;
			const releaseDateString = new Date(data.release_date).toDateString().toString();
			const modifiedDateString = releaseDateString.substring(4, 10) + ", " + releaseDateString.substring(10);

			setMovie({
				name: data.original_title,
				releaseDate: modifiedDateString,
				rating: data.vote_average.toFixed(1),
				overview: data.overview,
				voteCount: data.vote_count,
				posterUrl: "".concat(POSTER_BASE_URL, data.poster_path)
			})
		} catch(err) {
			setMovie(undefined)
			console.error("Error Occured", err);
		} finally {
			setLoading(false)
		};
	}

	useEffect(() => {
		getMovieDetailsForDetailedCard(props.movieID);
	}, [props.shouldDetailedCardShow, props.movieID]);


	return (
		<div
			className="modal-background"
			onClick={() => {
				props.setShouldDetailedCardShow(false);
			}}
		>
			{movie ? (<article
				className="modal-container"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="modal-name-and-close-container">
					<span className="modal-movie-name">{movie.name}</span>
					<img
						className="modal-close-button"
						src="./multiply.svg"
						alt="close-modal"
						onClick={() => {
							props.setShouldDetailedCardShow(false);
						}}
					/>
				</div>
				<div className="modal-movie-description">
					<span className="modal-movie-poster-container">
						<img
							className="modal-movie-poster"
							src={movie.posterUrl}
							alt="Movie Poster"
						/>
					</span>
					<div className="modal-movie-description-text">
						<p style={{marginTop: "10px", marginBottom: "10px"}}>
							<span style={{fontWeight: "bold"}}>Release Date: </span>
							<span>{movie.releaseDate}</span>
						</p>
						<p>{movie.overview}</p>
						<span>
							<span style={{fontWeight: "bold"}}>{movie.rating}</span>
							&nbsp;/&nbsp;10&nbsp;({movie.voteCount} total votes)
						</span>
					</div>
				</div>
			</article>) : loading ? (<>Loading...</>) : (<>Could not load movie details. Sorry!</>)}
		</div>
	);
};
export default MovieDetailedCard;
