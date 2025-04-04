import React, { useState, useEffect } from "react";
import { POSTER_BASE_URL } from "../constants/index";

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

  // TODO: Split into two functions, this function is doing too much, violaiting SRP
  // this function should only fetch data from backend, setting the data or rendering
  // should be done inside a separate function
  const getMovieDetailsForDetailedCard = async (movieID) => {
    try {
      setLoading(true);
      const result = await fetch(
        `/.netlify/functions/get-movie-details?movieID=${movieID}`
      );
      const objectFromJson = await result.json();
      const data = objectFromJson.movieDetails;
      const releaseDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(new Date(data.release_date));

      setMovie({
        name: data.original_title,
        releaseDate: releaseDate,
        rating: data.vote_average.toFixed(1),
        overview: data.overview,
        voteCount: data.vote_count,
        posterUrl: "".concat(POSTER_BASE_URL, data.poster_path),
      });
    } catch (err) {
      console.error("Error Occured", err);
      setMovie(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieDetailsForDetailedCard(props.movieID);
  }, [props.movieID]);

  return (
    <div
      className="fixed z-20 left-0 top-0 w-full h-full overflow-none bg-black/70 flex justify-center items-center"
      onClick={() => props.setShouldDetailedCardShow(false)}
    >
      {movie ? (
        <article
          className="modal-container"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex justify-between items-center flex-row pb-3">
            <span className="pb-2 font-semibold text-2xl pr-16 text-black">
              {movie.name}
            </span>
            <img
              className="cursor-pointer size-7"
              src="./multiply.svg"
              alt="close-modal"
              onClick={() => props.setShouldDetailedCardShow(false)}
            />
          </div>
          <div className="grid grid-cols-[auto_1fr]">
            <span className="w-full flex justify-center items-center">
              <img
                className="modal-movie-poster w-full max-w-full h-80 md:h-[480px]"
                src={movie.posterUrl}
                alt="Movie Poster"
              />
            </span>
            <div className="px-2 md:px-8">
              <div className="py-4">
                <span className="font-bold">Release Date: </span>
                <span>{movie.releaseDate}</span>
              </div>
              <p className="px-0">{movie.overview}</p>
              <div className="mt-4">
                <span className="font-bold">{movie.rating}</span>
                &nbsp;/&nbsp;10&nbsp;({movie.voteCount} total votes)
              </div>
            </div>
          </div>
        </article>
      ) : loading ? (
        <div className="modal-container flex items-center justify-center">
          <p>Getting Movie Details For You...</p>
        </div>
      ) : (
        <div>Could not load movie details. Sorry!</div>
      )}
    </div>
  );
};
export default MovieDetailedCard;
