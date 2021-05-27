import { useReduce } from "../Reducer-context";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "../Navbar";
import axios from "axios";
import { getSortedData, getFilteredData } from "../App";
import Navigator from "../Navigator";

export default function Home() {
  const { data, dispatch, sortBy, showCategory } = useReduce();

  useEffect(() => {
    dispatch({ type: "CLEAR_FILTER" });
  }, []);

  let sortedData = getSortedData(data, sortBy);
  let filteredData = getFilteredData(sortedData, { showCategory });

  async function history_video_add_call(url, payload) {
    try {
      let response = await axios.post(url, payload);
      if (response.status === 200) {
        dispatch({
          type: "ADD_TO_HISTORY",
          payload: payload
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Navigator value="home" />
      <Navbar />
      <div className="videos">
        {filteredData.map((item) => {
          return (
            <>
              <Link to={`${item.id}`}>
                <div
                  onClick={() => {
                    history_video_add_call(
                      "https://videolib-demo.utpalpati.repl.co/history/",
                      {
                        historyId: item.id,
                        lastseen: new Date()
                      }
                    );
                  }}
                >
                  <div className="image-wrapper">
                    <img
                      src={`https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`}
                      alt="f"
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
            </>
          );
        })}
      </div>
    </>
  );
}
