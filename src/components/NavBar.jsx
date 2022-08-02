import { Link } from "react-router-dom";
import "./NavBar.scss";
const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <span>MNGE</span>
        <span>Share</span>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/collaborate">Collab</Link>
      </div>
    </div>
  );
};

export default NavBar;
