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
  const [fetchingMovies, setFetchingMovies] = useState(true);
  const [detailedMovieId, setDetailedMovieId] = useState(76600);
  const [shouldDetailedCardShow, setShouldDetailedCardShow] = useState(false);
  const [titleText, setTitleText] = useState(`Currently Trending Movies`);

  async function getTrendingMovieInfo() {
    try {
      setFetchingMovies(true);
      const result = await fetch(
        `/.netlify/functions/get-trending-movies-info`
      );
      const jsonData = await result.json();
      const movies = jsonData?.trendingMovies?.results ?? [];
      setMovies(movies);
    } catch (err) {
      console.error("Error Occured", err);
    } finally {
      setFetchingMovies(false);
    }
  }

  async function searchMovie(enteredMovieName) {
    const movieNameParam = enteredMovieName
      .trim()
      .toLowerCase()
      .replace(/\s/g, "+");

    try {
      setTitleText(`Searching For ${enteredMovieName}...`);
      setMovies([]);

      const result = await fetch(
        `/.netlify/functions/search-movie?moviename=${movieNameParam}`
      );
      const jsonData = await result.json();
      const movies = jsonData?.foundMovies?.results ?? [];

      setTitleText(`Search Results For ${enteredMovieName}...`);
      setMovies(movies);
    } catch (err) {
      console.error("Error Occured", err);
      setTitleText(`Error occurred while searching for ${enteredMovieName}!`);
    }
  }

  useEffect(() => {
    if (props.searchMovieName !== "") {
      searchMovie(props.searchMovieName);
    }
  }, [props.searchMovieName]);

  useEffect(() => {
    getTrendingMovieInfo();
  }, []);

  return (
    <main className="flex w-full justify-center flex-col">
      <h2 className="py-8 text-2xl">{titleText}</h2>
      {fetchingMovies ? (
        <>Fetching Latest Trending Movies...</>
      ) : (
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
      )}
      {shouldDetailedCardShow && (
        <MovieDetailedCard
          setShouldDetailedCardShow={setShouldDetailedCardShow}
          movieID={detailedMovieId}
        />
      )}
    </main>
  );
}
export default TrendingMovies;
