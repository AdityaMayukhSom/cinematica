import React from "react";
import MovieInput from "./MovieInput";

const NavBar = (props) => {
  return (
    <nav className="py-3 px-0 w-full flex flex-row justify-between border-b border-b-gray-500">
      <span className="h-4">
        <h2>Cinematica By Devstream</h2>
      </span>
      <MovieInput setSearchMovieName={props.setSearchMovieName} />
    </nav>
  );
};

export default NavBar;
