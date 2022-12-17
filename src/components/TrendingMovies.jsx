import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import MovieDetailedCard from "./MovieDetailedCard";

function TrendingMovies(props) {
  const [searchResults, setSearchResults] = useState();
  const [detailedMovieId, setDetailedMovieId] = useState(76600);
  const [shouldDetailedCardShow, setShouldDetailedCardShow] = useState(false);
  const [titleText, setTitleText] = useState(`Most Recent Movies`);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3/";
  const TRENDING_BASE_URL = "".concat(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=",
    API_KEY
  );

  function getTrendingMovieInfo() {
    let requestURL = "".concat(BASE_URL, "configuration?api_key=", API_KEY);

    fetch(requestURL)
      .then((result) => {
        return result.json();
      })
      .then(() => {
        fetch(TRENDING_BASE_URL)
          .then((result) => {
            return result.json();
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
                      movieID={data.results[index].id}
                    />
                  );
                } else {
                  return;
                }
              })
            );
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function searchMovie(enteredMovieName) {
    let requestURL = "".concat(BASE_URL, "configuration?api_key=", API_KEY);
    fetch(requestURL)
      .then((result) => {
        return result.json();
      })
      .then(() => {
        let movieSearchURL = "".concat(
          BASE_URL,
          "search/movie?api_key=",
          API_KEY,
          "&query=",
          enteredMovieName
        );
        fetch(movieSearchURL)
          .then((result) => {
            return result.json();
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
                      movieID={data.results[index].id}
                    />
                  );
                }
              })
            );
          })
          .catch((err) => {
            console.log("Error Occured");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Error Occured");
        console.log(err);
      });
  }

  useEffect(() => {
    if (props.searchMovieName !== "") {
        setTitleText(`Results for ${props.searchMovieName.replace('+',' ')}...`)
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
