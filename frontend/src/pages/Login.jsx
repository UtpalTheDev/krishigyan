import { useLogin } from "../reducer-context/LoginContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import treebanner from "../assets/treebanner.png";
import { Navbar } from "../components";
import { useReduce } from "../reducer-context/Reducer-context";
export function Login() {
  let { isUserLogIn, LoginWithCredentials } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {dispatch}=useReduce()
  let navigate = useNavigate();
  let { state } = useLocation();
  let [error, setError] = useState("");
  useEffect(() => {
    if (isUserLogIn) {
      navigate(state?.from ? state.from : "/", { replace: true });
    }
  }, [isUserLogIn]);

  async function LoginHandler() {
    dispatch({type:"LOAD",payload:true})
    let errorpassed = await LoginWithCredentials(email, password);
    setError(errorpassed);
    dispatch({type:"LOAD",payload:false})
  }
  return (
    <>
      <Navbar />
      <div className="login">
        <div className="login-sideimg">
          {" "}
          <img
            src={treebanner}
            style={{ width: "100%", height: "100%" }}
            alt="sideimg"
          />
        </div>

        <div className="form-container">
          <h3>Login</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              LoginHandler();
            }}
            className="form"
          >
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
              <span class="placeholder">Password</span>
            </label>
            <div className="form-action">
              <button class="secondary-button md">
                <Link to="/signup">Signup</Link>
              </button>
              <button type="submit" class="secondary-button md">
                Login
              </button>
            </div>
          </form>
          <div style={{ color: "red",paddingBottom:"2rem" }}>{error}</div>
        </div>
      </div>
    </>
  );
}
