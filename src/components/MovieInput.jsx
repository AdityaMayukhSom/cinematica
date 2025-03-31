import React from "react";

const MovieInput = (props) => {
  /** @type {React.FormEventHandler} */
  const handleSubmit = (e) => {
    e.preventDefault();
    let enteredMovieName = e.target[1].value
      .trim()
      .toLowerCase()
      .replace(/\s/g, "+");
    props.setSearchMovieName(enteredMovieName);
  };
  return (
    <form
      className="flex justify-center items-center border border-neutral-400 gap-x-4 px-3 py-2"
      id="nameInputForm"
      onSubmit={handleSubmit}
    >
      <button type="submit" className="bg-transparent cursor-pointer">
        <svg className="size-4" fill="none" stroke="gray" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      <input
        className="text-sm active:outline-none outline-none border-none"
        type="search"
        id="movieName"
        name="movieName"
        placeholder="Search Movie"
        autoComplete="off"
        required
      />
    </form>
  );
};

export default MovieInput;
