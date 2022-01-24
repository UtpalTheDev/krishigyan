import { useReduce } from "../reducer-context/Reducer-context";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar,Navigator } from "../components";
import { getSortedData, getFilteredData } from "../App";

import { useLogin } from "../reducer-context/LoginContext";
import { history_video_add_call } from "../api/serverRequests";

export function Home() {
  const { data, dispatch, sortBy, showCategory } = useReduce();
  const { isUserLogIn } = useLogin();
  useEffect(() => {
    dispatch({ type: "CLEAR_FILTER" });
  }, []);

  let sortedData = getSortedData(data, sortBy);
  let filteredData = getFilteredData(sortedData, { showCategory });

  return (
    <>
      <Navigator value="home" />
      <Navbar />
      <div className="videos">
        {filteredData.map((item) => {
          return (
            
              <Link key={item.id} to={`/video/${item.id}`}>
                <div
                  onClick={() => {
                    history_video_add_call(
                      "https://videolib-demo-1.utpalpati.repl.co/history/",
                      {
                        historyId: item.id,
                        lastseen: new Date()
                      },
                      dispatch
                    );
                  }}
                >
                  <div className="image-wrapper">
                    <img
                      src={`https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`}
                      alt="videoimg"
                    />
                    <div className="videos-duration md">
                      {item.duration.toFixed(2)}
                    </div>
                  </div>
                  <div className="videos-desc">
                    <div className="videos-title">{item.title}</div>
                  </div>
                </div>
              </Link>
            
          );
        })}
      </div>
    </>
  );
}
