import { useEffect, useRef, useState } from "react";

/* this function returns the shortened name of the movies upto the given specific name */
const MovieCard = (props) => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3/";
  const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w780";

  const [movieName, setMovieName] = useState("");
  const [movieRating, setMovieRating] = useState(0);
  const [moviePosterURL, setMoviePosterURL] = useState("");

  function getMovieDetails(movieID) {
    const detailRequestURL = "".concat(
      BASE_URL,
      "movie/",
      movieID,
      "?api_key=",
      API_KEY,
      "&language=en-US"
    );
    fetch(detailRequestURL)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setMovieName(data.original_title);
        setMovieRating(data.vote_average.toFixed(1));
        setMoviePosterURL("".concat(POSTER_BASE_URL, data.poster_path));
      })
      .catch((err) => {
        console.log("Error Occured");
        console.log(err);
      });
  }

  let movieContainer = useRef();

  useEffect(() => {
    getMovieDetails(props.movieID);
  }, []);

  return (
    /* This card is the one which is shown on initial pageload i.e. trending movies page */
    /* this card contains the movie poster, movie name and movie rating */
    <div
      className="trending-movies-card"
      ref={movieContainer}
      onClick={() => {
        props.setShouldDetailedCardShow(true);
        props.setDetailedMovieId(props.movieID);
        // getMovieDetailsForDetailedCard.current();
      }}
    >
      <div className="movie-rating-container">{movieRating}</div>
      <div className="movies-card-poster-container">
        <img src={moviePosterURL} className="movies-card-poster" alt="" />
      </div>
      <p className="movie-card-movie-name">{movieName}</p>
    </div>
  );
};

export default MovieCard;
