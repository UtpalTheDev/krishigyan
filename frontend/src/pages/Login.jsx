import { useLogin } from "../reducer-context/LoginContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import treebanner from "../assets/treebanner.svg";
import { Navbar } from "../components";
import { useReduce } from "../reducer-context/Reducer-context";
export function Login() {
  let { isUserLogIn, LoginWithCredentials } = useLogin();
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123456");
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
            <label className="input md">
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                className="input-text"
                required
              />
              <span className="placeholder">Email</span>
            </label>
            <label className="input md">
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                className="input-text"
                required
              />
              <span className="placeholder">Password</span>
            </label>
            <div className="sm gray centertxt">Password should contain atleast 6 characters</div>
            <div className="form-action">
              
              <button type="submit" className="secondary-button md">
                Login
              </button>
            </div>
            <hr/>
            <div className="md centertxt">
          Don't have an account? 
              <Link to="/signup" style={{color:"blue"}}> Sign Up</Link>
            </div>
          </form>
          <div style={{ color: "red",paddingBottom:"2rem" }}>{error}</div>
        </div>
      </div>
    </>
  );
}
