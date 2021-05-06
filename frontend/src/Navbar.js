import logo from "./assets/logo.svg";
export function Navbar() {
  return (
    <>
      <div className="videonavbar">
        <div className="videonavbar-logo">
          <img src={logo} alt="logo" />
          <span>K</span>rishiGyan
        </div>
        <div className="videonavbar-search">
          <input type="text" placeholder="Search.."></input>
          <span class="material-icons">search</span>
        </div>
        <div className="videonavbar-others">
          <span class="material-icons">notifications</span>
        </div>
      </div>
    </>
  );
}
