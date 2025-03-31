import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import MovieDetailedCard from "./MovieDetailedCard";

function TrendingMovies(props) {
  /**
   * @type {ReturnType<typeof useState<Array<{
   *   id: string;
   *   original_title: string;
   *   poster_path: string;
   *   vote_average: string;
   * }>>>}
   */
  const [movies, setMovies] = useState();
  const [detailedMovieId, setDetailedMovieId] = useState(76600);
  const [shouldDetailedCardShow, setShouldDetailedCardShow] = useState(false);
  const [titleText, setTitleText] = useState(`Most Recent Movies`);

  async function getTrendingMovieInfo() {
    try {
      const result = await fetch(
        `/.netlify/functions/get-trending-movies-info`
      );
      const jsonData = await result.json();
      const movies = jsonData?.trendingMovies?.results ?? [];
      setMovies(movies);
    } catch (err) {
      console.error("Error Occured", err);
    }
  }

  async function searchMovie(enteredMovieName) {
    try {
      const result = await fetch(
        `/.netlify/functions/search-movie?moviename=${enteredMovieName}`
      );
      const jsonData = await result.json();
      const movies = jsonData?.foundMovies?.results ?? [];
      setMovies(movies);
    } catch (err) {
      console.error("Error Occured", err);
    }
  }

  useEffect(() => {
    if (props.searchMovieName !== "") {
      setTitleText(`Results for ${props.searchMovieName.replace("+", " ")}...`);
      searchMovie(props.searchMovieName);
    }
  }, [props.searchMovieName]);

  useEffect(() => {
    getTrendingMovieInfo();
  }, []);

  return (
    <main className="flex w-full justify-center flex-col">
      <h2 className="py-8 text-2xl">{titleText}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-32">
        {movies ? (
          movies
            .filter((movie) => movie.poster_path)
            .map((movie) => {
              return (
                <MovieCard
                  setShouldDetailedCardShow={setShouldDetailedCardShow}
                  setDetailedMovieId={setDetailedMovieId}
                  key={movie.id}
                  posterPath={movie.poster_path}
                  movieTitle={movie.original_title}
                  voteAverage={movie.vote_average}
                  movieID={movie.id}
                />
              );
            })
        ) : (
          <>No Movies Available.</>
        )}
      </div>
      {shouldDetailedCardShow && (
        <MovieDetailedCard
          shouldDetailedCardShow={shouldDetailedCardShow}
          setShouldDetailedCardShow={setShouldDetailedCardShow}
          movieID={detailedMovieId}
        />
      )}
    </main>
  );
}
export default TrendingMovies;
