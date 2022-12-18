import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import MovieDetailedCard from "./MovieDetailedCard";

function TrendingMovies(props) {
  const [searchResults, setSearchResults] = useState();
  const [detailedMovieId, setDetailedMovieId] = useState(76600);
  const [shouldDetailedCardShow, setShouldDetailedCardShow] = useState(false);
  const [titleText, setTitleText] = useState(`Most Recent Movies`);

  function getTrendingMovieInfo() {
    fetch(`/.netlify/functions/gettrendingmoviesinfo`)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        return result.trendingMovies;
      })
      .then((data) => {
        setSearchResults(
          data.results.map((_, index) => {
            if (data.results[index].poster_path) {
              return (
                <MovieCard
                  setShouldDetailedCardShow={setShouldDetailedCardShow}
                  setDetailedMovieId={setDetailedMovieId}
                  key={data.results[index].id}
                  posterPath={data.results[index].poster_path}
                  movieTitle={data.results[index].title}
                  voteAverage={data.results[index].vote_average}
                  movieID={data.results[index].id}
                />
              );
            } else {
              return null;
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function searchMovie(enteredMovieName) {
    console.log("search movies called");
    fetch(`/.netlify/functions/searchmovie?moviename=${enteredMovieName}`)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        return result.foundMovies;
      })
      .then((data) => {
        console.log(data);
        setSearchResults(
          data.results.map((_, index) => {
            if (data.results[index].poster_path) {
              return (
                <MovieCard
                  setShouldDetailedCardShow={setShouldDetailedCardShow}
                  setDetailedMovieId={setDetailedMovieId}
                  key={data.results[index].id}
                  posterPath={data.results[index].poster_path}
                  movieTitle={data.results[index].original_title}
                  voteAverage={data.results[index].vote_average}
                  movieID={data.results[index].id}
                />
              );
            } else {
              return null;
            }
          })
        );
      })
      .catch((err) => {
        console.log("Error Occured");
        console.log(err);
      });
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
    <main className="effective-page-body">
      <h2 className="most-recent-movies-title">{titleText}</h2>
      <div className="search-results-container">{searchResults}</div>
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
