const MovieInput = (props) => {
  function handleSubmit(e) {
    e.preventDefault();
    let enteredMovieName = e.target[1].value
      .trim()
      .toLowerCase()
      .replace(/\s/g, "+");
    props.setSearchMovieName(enteredMovieName);
  }
  return (
    <form
      className="search-box-container"
      id="nameInputForm"
      onSubmit={(e) => handleSubmit(e)}
    >
      <button type="submit" className="search-box-submit-button">
        <svg
          className="search-box-icon"
          fill="none"
          stroke="gray"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      <input
        className="movie-search-input"
        type="search"
        id="movieName"
        name="movieName"
        placeholder="Search for a movie"
        autoComplete="off"
        required
      />
    </form>
  );
};

export default MovieInput;
