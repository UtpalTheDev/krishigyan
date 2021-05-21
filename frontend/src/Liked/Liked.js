import { useReduce } from "../Reducer-context";
import { getSortedData, getFilteredData } from "../App";
import Navigator from "../Navigator";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar";
import axios from "axios";
export default function Liked() {
  useEffect(() => {
    dispatch({ type: "CLEAR_FILTER" });
  }, []);
  let { likedlist, dispatch, sortBy, showCategory } = useReduce();
  let sortedData = getSortedData(likedlist, sortBy);
  console.log("sorted", sortedData);

  let filteredData = getFilteredData(sortedData, { showCategory });
  console.log("filtered", filteredData);

  function Likedlist() {
    async function history_video_add_call(url, payload) {
      try {
        let response = await axios.post(url, payload);
        if (response.status === 200) {
          dispatch({
            type: "ADD_TO_HISTORY",
            payload: payload.historyobj
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    async function liked_video_delete_call(url, payload) {
      try {
        let response = await axios.delete(url, { data: payload });
        if (response.status === 200) {
          dispatch({
            type: "REMOVE_FROM_LIKEDLIST",
            payload: payload.likedid
          });
        }
      } catch (err) {
        console.log(err);
      }
    }

    return filteredData
      .filter((item) => item.islike !== false)
      .map((item) => {
        return (
          <>
            <div className="likedlist-card">
              <Link to={`/${item.id}`}>
                <div className="likedlist-card-data">
                  <img
                    src={`https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`}
                    onClick={() => {
                      history_video_add_call(
                        "https://videolib-demo.utpalpati.repl.co/history/",
                        {
                          historyobj: {
                            ...item,
                            ishistory: true,
                            lastseen: new Date()
                          }
                        }
                      );
                    }}
                    alt=""
                  />
                  <div className="likedlist-card-desc">{item.title}</div>
                </div>
              </Link>
              <button
                class="icon-button lg"
                onClick={() => {
                  liked_video_delete_call(
                    "https://videolib-demo.utpalpati.repl.co/liked/",
                    { likedid: item.id }
                  );
                }}
              >
                <i class="far fa-thumbs-down"></i>
              </button>
            </div>
          </>
        );
      });
  }

  //console.log(playlist);
  return (
    <>
      <Navbar />

      <Navigator value="liked" />
      <h6>Liked Videos</h6>
      <div className="wrapper">
        {Likedlist().length === 0 ? (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
          >
            You Haven't Liked Any Video
          </div>
        ) : (
          Likedlist()
        )}
      </div>
    </>
  );
}
