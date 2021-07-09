import { useReduce } from "../reducer-context/Reducer-context";
import { getSortedData, getFilteredData } from "../App";
import { Navigator, Navbar } from "../components";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  history_video_add_call,
  liked_video_delete_call
} from "../api/serverRequests";

export function Liked() {
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
  let filteredData = getFilteredData(sortedData, { showCategory });

  function Likedlist() {
    return filteredData.map((item) => {
      return (
        <>
          <div className="likedlist-card">
            <Link to={`/video/${item.id}`}>
              <div
                className="likedlist-card-data"
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
                <img
                  src={`https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`}
                  alt=""
                />
                <div className="likedlist-card-desc">{item.title}</div>
              </div>
            </Link>
            <button
              class="icon-button lg"
              onClick={async () => {
                let likedlistmsg = await liked_video_delete_call(
                  "https://videolib-demo-1.utpalpati.repl.co/liked/",
                  { likedId: item.id },
                  dispatch
                );
                const notify = () => toast.dark(likedlistmsg);
                notify();
              }}
            >
              <i class="far fa-thumbs-down"></i>
            </button>
          </div>
        </>
      );
    });
  }

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
