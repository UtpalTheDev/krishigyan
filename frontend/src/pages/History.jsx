import { useReduce } from "../reducer-context/Reducer-context";
import TimeAgo from "react-timeago";
import { getSortedData, getFilteredData } from "../App";
import { Navigator, Navbar } from "../components";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  history_video_add_call,
  history_video_delete_call
} from "../api/serverRequests";

export function History() {
  useEffect(() => {
    dispatch({ type: "CLEAR_FILTER" });
  }, []);

  const { history, dispatch, sortBy, data, showCategory } = useReduce();

  const historydata = history.map((eachitem) => {
    let finddata = data.find((item) => item.id === eachitem.historyId);
    if (finddata) {
      return { ...finddata, lastseen: eachitem.lastseen };
    }
    return {};
  });

  let sortedData = getSortedData(historydata, sortBy);
  let filteredData = getFilteredData(sortedData, { showCategory });

  function History() {
    return filteredData
      .filter((item) => item.ishistory !== false)
      .map((item) => {
        return (
          <>
            {" "}
            <div class="history-card">
              <Link to={`/video/${item.id}`}>
                <div
                  class="history-card-data"
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
                  <div className="history-card-desc">{item.title}</div>
                  <div className="watchedbefore sm">
                    {`Watched `}
                    <TimeAgo date={item.lastseen} />
                  </div>
                </div>
              </Link>
              <button
                class="icon-button lg"
                onClick={async () => {
                  let historymsg = await history_video_delete_call(
                    "https://videolib-demo-1.utpalpati.repl.co/history/",
                    { historyId: item.id },
                    dispatch
                  );
                  const notify = () => toast.dark(historymsg);
                  notify();
                }}
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </>
        );
      });
  }

  return (
    <>
      <Navbar />
      <Navigator value="history" />

      <div className="wrapper historywrapper">
        <h6>History</h6>
        {History().length === 0 ? (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
          >
            You Haven't Watched Any Video
          </div>
        ) : (
          History()
        )}
      </div>
    </>
  );
}
