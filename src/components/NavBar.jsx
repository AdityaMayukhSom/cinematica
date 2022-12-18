import MovieInput from "./MovieInput";

const NavBar = (props) => {
  return (
    <nav className="navigation-bar">
      <span className="navbar-company-logo-container">
        <img className="navbar-company-logo" src="./logo.png" alt="InSynk Logo" />
      </span>
      <MovieInput setSearchMovieName={props.setSearchMovieName} />
    </nav>
  );
};

export default NavBar;
