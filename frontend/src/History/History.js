import { useReduce } from "../Reducer-context";
import TimeAgo from "react-timeago";
import { getSortedData, getFilteredData } from "../App";
import Navigator from "../Navigator";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../Navbar";

export default function History() {
  useEffect(() => {
    dispatch({ type: "CLEAR_FILTER" });
  }, []);
  const { history, dispatch, sortBy, data, showCategory } = useReduce();
  console.log("history", history);

  const historydata = history.map((eachitem) => {
    let finddata = data.find((item) => item.id === eachitem.historyId);
    if (finddata) {
      return { ...finddata, lastseen: eachitem.lastseen };
    }
    return {};
  });

  let sortedData = getSortedData(historydata, sortBy);
  console.log("sorted", sortedData);
  let filteredData = getFilteredData(sortedData, { showCategory });
  console.log("filtered", filteredData);

  function History() {
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
    async function history_video_delete_call(url, payload) {
      try {
        let response = await axios.delete(url, { data: payload });
        console.log(response);
        if (response.status === 200) {
          dispatch({
            type: "REMOVE_FROM_HISTORY",
            payload: payload
          });
        }
      } catch (err) {
        console.log(err);
      }
    }

    return filteredData
      .filter((item) => item.ishistory !== false)
      .map((item) => {
        return (
          <>
            {" "}
            <div class="history-card">
              <Link to={`/${item.id}`}>
                <div class="history-card-data">
                  <img
                    src={`https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`}
                    onClick={() => {
                      history_video_add_call(
                        "https://videolib-demo.utpalpati.repl.co/history/",
                        {
                          historyId: item.id,
                          lastseen: new Date()
                        }
                      );
                    }}
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
                onClick={() => {
                  history_video_delete_call(
                    "https://videolib-demo.utpalpati.repl.co/history/",
                    { historyId: item.id }
                  );
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

      <div className="wrapper">
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
