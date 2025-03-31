import React from "react";
import MovieSearchBox from "./MovieSearchBox";

const NavBar = (props) => {
  return (
    <nav className="py-4 px-0 w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center border-b border-b-gray-500">
      <h2 className="font-medium">Cinematica By Devstream</h2>
      <MovieSearchBox setSearchMovieName={props.setSearchMovieName} />
    </nav>
  );
};

export default NavBar;
