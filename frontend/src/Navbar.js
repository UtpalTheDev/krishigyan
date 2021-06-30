import logo from "./assets/logo.svg";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <>
      <div className="videonavbar">
        <Link to="/" className="videonavbar-logo">
          <img src={logo} alt="logo" />
          <span>K</span>rishiGyan
        </Link>
        <div className="videonavbar-search">
          <input type="text" placeholder="Search.."></input>
          <span class="material-icons">search</span>
        </div>
        <div className="videonavbar-others">
          <Link to="/user">
            <span class="material-icons">person</span>
          </Link>
        </div>
      </div>
    </>
  );
}
