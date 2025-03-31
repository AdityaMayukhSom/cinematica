import React from "react";
import MovieInput from "./MovieInput";

const NavBar = (props) => {
  return (
    <nav className="navigation-bar">
      <span className="navbar-company-logo-container">
        <h3>Devstream Cinematica</h3>
      </span>
      <MovieInput setSearchMovieName={props.setSearchMovieName} />
    </nav>
  );
};

export default NavBar;
