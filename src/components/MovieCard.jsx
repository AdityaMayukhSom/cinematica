import React, { useRef } from "react";
import { POSTER_BASE_URL } from "../constants";

/* this function returns the shortened name of the movies upto the given specific name */
const MovieCard = (props) => {
  let movieContainer = useRef(null);
  return (
    /* This card is the one which is shown on initial pageload i.e. trending movies page */
    /* this card contains the movie poster, movie name and movie rating */
    <div
      className="trending-movies-card"
      ref={movieContainer}
      onClick={() => {
        props.setShouldDetailedCardShow(true);
        props.setDetailedMovieId(props.movieID);
      }}
    >
      <div className="movie-rating-container">
        {props.voteAverage.toFixed(1)}
      </div>
      <div className="movies-card-poster-container">
        <img
          src={"".concat(POSTER_BASE_URL, props.posterPath)}
          className="movies-card-poster"
          alt=""
        />
      </div>
      <p className="movie-card-movie-name">{props.movieTitle}</p>
    </div>
  );
};

export default MovieCard;
