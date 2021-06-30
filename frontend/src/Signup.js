import { useLogin } from "./LoginContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import treebanner from "./assets/treebanner.png";
import { Navbar } from "./Navbar";
export default function Signup() {
  let { isUserLogIn } = useLogin();
  let [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  let { state } = useLocation();
  console.log("form", state);

  useEffect(() => {
    if (isUserLogIn) {
      navigate(state?.from ? state.from : "/", { replace: true });
    }
  }, [isUserLogIn]);

  async function signupHandler() {
    try {
      let response = await axios.post(
        "https://videolib-demo-1.utpalpati.repl.co/signup",
        { user: { userName, email, password } }
      );
      if (response.status === 200) {
        setError("");
        navigate("/login");
      }
    } catch (error) {
      setError(error.response.data.message);

      console.log("signuphandler error");
    }
  }
  return (
    <>
      <Navbar />
      <div className="signup">
        <div className="signup-sideimg">
          {" "}
          <img
            src={treebanner}
            style={{ width: "100%", height: "100%" }}
            alt="sideimg"
          />
        </div>

        <div className="form-container">
          <h3>Signup</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              signupHandler();
            }}
            className="form"
          >
            <label class="input md">
              <input
                type="text"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                class="input-text"
                required
              />
              <span class="placeholder">Name</span>
            </label>
            <label class="input md">
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                class="input-text"
                required
              />
              <span class="placeholder">Email</span>
            </label>
            <label class="input md">
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                class="input-text"
                required
              />
              <span class="placeholder">password</span>
            </label>
            <div className="form-action">
              <button class="secondary-button md">
                <Link to="/login">Login</Link>
              </button>
              <button type="submit" class="secondary-button md">
                Signup
              </button>
            </div>
          </form>
          <div style={{ color: "red" }}>{error}</div>
        </div>
      </div>
    </>
  );
}
