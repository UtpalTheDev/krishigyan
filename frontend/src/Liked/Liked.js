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
  let { likedlist, dispatch, sortBy, showCategory, data } = useReduce();

  const likeddata = likedlist.map((eachitem) => {
    let finddata = data.find((item) => item.id === eachitem);
    if (finddata) {
      return finddata;
    }
    return {};
  });

  let sortedData = getSortedData(likeddata, sortBy);
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
            payload: payload
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
            payload: payload.likedId
          });
        }
      } catch (err) {
        console.log(err);
      }
    }

    return filteredData.map((item) => {
      return (
        <>
          <div className="likedlist-card">
            <Link to={`/${item.id}`}>
              <div
                className="likedlist-card-data"
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
                <img
                  src={`https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`}
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
                  { likedId: item.id }
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

      <div className="wrapper likedwrapper">
        <h6>Liked Videos</h6>
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
