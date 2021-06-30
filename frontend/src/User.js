import axios from "axios";
import { useEffect } from "react";
import { useLogin } from "./LoginContext";
import { useReduce } from "./Reducer-context";
import { Navbar } from "./Navbar";

export default function User() {
  const { logout, isUserLogIn } = useLogin();
  const { dispatch, user } = useReduce();

  useEffect(() => {
    (async function () {
      try {
        dispatch({ type: "LOAD", payload: true });
        let response = await axios.get(
          "https://videolib-demo-1.utpalpati.repl.co/user"
        );
        dispatch({ type: "USER", payload: response.data });
        dispatch({ type: "LOAD", payload: false });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <Navbar />
      <div className="user">
        <div className="user-data">
          <div>Name: {user.name}</div>
          <div>EmailId: {user.email}</div>
        </div>

        <button
          className="user-logout primary-button"
          onClick={() => {
            logout();
            dispatch({ type: "RESET" });
          }}
        >
          logout
        </button>
      </div>
    </>
  );
}
