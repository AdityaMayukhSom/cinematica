import { useState, useEffect } from "react";

const MovieDetailedCard = (props) => {
  let movieID = props.movieID;
  let modifiedDateString, releaseDateString;
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3/";
  const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w780";

  const [movieName, setMovieName] = useState("");
  const [movieRating, setMovieRating] = useState(0);
  const [movieReleaseDate, setMovieReleaseDate] = useState("");
  const [movieOverView, setMovieOverView] = useState("");
  const [movieVoteCount, setMovieVoteCount] = useState(0);
  const [moviePosterURL, setMoviePosterURL] = useState("");

  function getMovieDetailsForDetailedCard(movieID) {
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
        releaseDateString = new Date(data.release_date)
          .toDateString()
          .toString();
        modifiedDateString =
          releaseDateString.substring(4, 10) +
          ", " +
          releaseDateString.substring(10);
        setMovieReleaseDate(modifiedDateString);
        setMovieRating(data.vote_average.toFixed(1));

        setMovieOverView(data.overview);
        setMovieVoteCount(data.vote_count);
        setMoviePosterURL("".concat(POSTER_BASE_URL, data.poster_path));
      })
      .catch((err) => {
        console.log(err);
        console.log("Error Occured");
      });
  }

  useEffect(() => {
    movieID = props.movieID;
    getMovieDetailsForDetailedCard(movieID);
  }, [props.shouldDetailedCardShow]);

  return (
    <div
      className="modal-background"
      onClick={() => {
        props.setShouldDetailedCardShow(false);
      }}
    >
      <article
        className="modal-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal-name-and-close-container">
          <span className="modal-movie-name">{movieName}</span>
          <img
            className="modal-close-button"
            src="./multiply.svg"
            alt=""
            onClick={() => {
              props.setShouldDetailedCardShow(false);
            }}
          />
        </div>
        <div className="modal-movie-description">
          <img
            className="modal-movie-poster"
            src={moviePosterURL}
            alt="Cover Image"
          />
          <div className="modal-movie-description-text">
            <p style={{ marginTop: "10px", marginBottom: "10px" }}>
              <span style={{ fontWeight: "bold" }}>Release Date: </span>
              <span>{movieReleaseDate}</span>
            </p>
            <p>{movieOverView}</p>
            <span>
              <span style={{ fontWeight: "bold" }}>{movieRating}</span>
              &nbsp;/&nbsp;10&nbsp;({movieVoteCount} total votes)
            </span>
          </div>
        </div>
      </article>
    </div>
  );
};
export default MovieDetailedCard;
