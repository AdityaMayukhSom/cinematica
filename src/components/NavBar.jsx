import React from "react";
import MovieInput from "./MovieInput";

const NavBar = (props) => {
  return (
    <nav className="py-4 px-0 w-full flex flex-row justify-between items-center border-b border-b-gray-500">
      <h2 className="font-medium">Cinematica By Devstream</h2>
      <MovieInput setSearchMovieName={props.setSearchMovieName} />
    </nav>
  );
};

export default NavBar;
