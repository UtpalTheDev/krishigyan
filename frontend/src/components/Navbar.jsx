import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <>
      <div className="videonavbar">
        <Link to="/" className="videonavbar-logo">
          <img src={logo} alt="logo" />
          <span>K</span>rishiGyan
        </Link>
        <div className="videonavbar-others">
          <Link to="/user">
            <span className="material-icons">person</span>
          </Link>
        </div>
      </div>
    </>
  );
}
