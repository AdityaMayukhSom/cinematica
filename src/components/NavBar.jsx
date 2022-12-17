import MovieInput from "./MovieInput";

const NavBar = (props) => {
  return (
    <nav className="navigation-bar">
      <img className="navbar-company-logo" src="./logo.png" alt="InSynk Logo" />
      <MovieInput setSearchMovieName={props.setSearchMovieName} />
    </nav>
  );
};

export default NavBar;
