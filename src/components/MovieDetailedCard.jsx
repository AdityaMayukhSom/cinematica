import { useState, useEffect } from "react";

const MovieDetailedCard = (props) => {
  let modifiedDateString, releaseDateString;

  const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w780";

  const [movieName, setMovieName] = useState("");
  const [movieRating, setMovieRating] = useState(0);
  const [movieReleaseDate, setMovieReleaseDate] = useState("");
  const [movieOverView, setMovieOverView] = useState("");
  const [movieVoteCount, setMovieVoteCount] = useState(0);
  const [moviePosterURL, setMoviePosterURL] = useState("");

  const getMovieDetailsForDetailedCard = (movieID) => {
    fetch(`/.netlify/functions/get-movie-details?movieID=${movieID}`)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        return result.movieDetails;
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
    getMovieDetailsForDetailedCard(props.movieID);
  }, [props.shouldDetailedCardShow, props.movieID]);

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
          <span className="modal-movie-poster-container">
            <img
              className="modal-movie-poster"
              src={moviePosterURL}
              alt="Movie Poster"
            />
          </span>
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
