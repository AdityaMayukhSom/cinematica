import React from "react";
import { POSTER_BASE_URL } from "../constants/index";

/* this function returns the shortened name of the movies upto the given specific name */
const MovieCard = (props) => {
  return (
    /* This card is the one which is shown on initial pageload i.e. trending movies page */
    /* this card contains the movie poster, movie name and movie rating */
    <div
      className="relative overflow-hidden grid cursor-pointer border border-gray-400"
      onClick={() => {
        props.setShouldDetailedCardShow(true);
        props.setDetailedMovieId(props.movieID);
      }}
    >
      <div className="absolute z-10 top-3 left-3 aspect-square text-sm rounded-full p-2 flex justify-center items-center font-semibold border border-gray-700 bg-white">
        {props.voteAverage.toFixed(1)}
      </div>
      <div className="w-full h-[440px]">
        <img
          src={"".concat(POSTER_BASE_URL, props.posterPath)}
          className="object-cover w-full"
          alt={`${props.movieTitle} movie poster`}
        />
      </div>
      <div className="m-0 p-0 absolute bottom-0 w-full">
        <p className="text-center w-full bg-white word-break px-3 min-h-14 flex justify-center items-center">
          {props.movieTitle}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
